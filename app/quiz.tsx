
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { colors, glassStyles, gradients, shadows, typography } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { quizQuestions } from '@/data/quizQuestions';
import { LinearGradient } from 'expo-linear-gradient';
import { PageControls } from '@/components/PageControls';
import { Question } from '@/types/quiz';
import { shuffleQuestions, shuffleAnswers } from '@/utils/quizHelpers';

interface ShuffledQuestion {
  options: string[];
  correctAnswerIndex: number;
}

export default function QuizScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [shuffledQuestion, setShuffledQuestion] = useState<ShuffledQuestion | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const bgColor = theme.dark ? colors.backgroundDark : colors.background;
  const textColor = theme.dark ? colors.textLight : colors.text;
  const secondaryTextColor = theme.dark ? '#D4B5D4' : colors.textSecondary;

  useEffect(() => {
    console.log(`Loading question ${currentQuestionIndex + 1}`);
    const shuffled = shuffleAnswers(currentQuestion.options, currentQuestion.correctAnswer);
    setShuffledQuestion(shuffled);
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !shuffledQuestion) return;

    console.log(`Answer selected: ${answerIndex}`);
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === shuffledQuestion.correctAnswerIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      console.log(`Correct! Score: ${score + 1}`);
    } else {
      const newIncorrectCount = incorrectCount + 1;
      setIncorrectCount(newIncorrectCount);
      console.log(`Incorrect answer. Total incorrect: ${newIncorrectCount}`);
      
      if (newIncorrectCount === 10) {
        console.log('User failed 10 questions - showing Try Again modal');
        setTimeout(() => {
          setShowTryAgainModal(true);
        }, 1500);
        return;
      }
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      } else {
        console.log(`Quiz complete! Final score: ${score + (isCorrect ? 1 : 0)}`);
        router.push({
          pathname: '/results',
          params: { 
            score: score + (isCorrect ? 1 : 0),
            total: questions.length 
          }
        });
      }
    }, 1500);
  };

  const handlePause = () => {
    console.log('Quiz paused');
    setIsPaused(true);
  };

  const handleResume = () => {
    console.log('Quiz resumed');
    setIsPaused(false);
  };

  const handleGoHome = () => {
    console.log('Going home - randomizing questions');
    const shuffled = shuffleQuestions(quizQuestions);
    setQuestions(shuffled);
    router.replace('/(tabs)/(home)/');
  };

  const handleTryAgainAfterFail = () => {
    console.log('Try Again pressed - randomizing questions and restarting');
    const shuffled = shuffleQuestions(quizQuestions);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrectCount(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowTryAgainModal(false);
    fadeAnim.setValue(1);
  };

  const getAnswerStyle = (index: number) => {
    if (!showFeedback || !shuffledQuestion) {
      return styles.optionButton;
    }

    if (index === shuffledQuestion.correctAnswerIndex) {
      return [styles.optionButton, styles.correctAnswer];
    }

    if (index === selectedAnswer && index !== shuffledQuestion.correctAnswerIndex) {
      return [styles.optionButton, styles.wrongAnswer];
    }

    return [styles.optionButton, styles.disabledAnswer];
  };

  if (!shuffledQuestion) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <LinearGradient
          colors={theme.dark 
            ? ['rgba(42, 26, 46, 0.9)', 'rgba(154, 78, 136, 0.2)']
            : ['rgba(255, 243, 236, 1)', 'rgba(247, 198, 208, 0.3)']}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient
        colors={theme.dark 
          ? ['rgba(42, 26, 46, 0.9)', 'rgba(154, 78, 136, 0.2)', 'rgba(42, 26, 46, 0.9)']
          : ['rgba(255, 243, 236, 1)', 'rgba(247, 198, 208, 0.3)', 'rgba(200, 162, 200, 0.2)']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <PageControls onPause={handlePause} onGoHome={handleGoHome} showPause={true} />

      <View style={styles.header}>
        <View style={[styles.progressCard, glassStyles.glassCard]}>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={gradients.plumRose}
              style={[styles.progressFill, { width: `${progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={[styles.progressText, { color: secondaryTextColor }]}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
          <View style={[styles.questionCard, glassStyles.glassPinkCard]}>
            <View style={styles.questionIconContainer}>
              <LinearGradient
                colors={gradients.lavenderPink}
                style={styles.questionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="sparkles" 
                  android_material_icon_name="auto-awesome" 
                  size={28} 
                  color={colors.softPlum}
                />
              </LinearGradient>
            </View>
            <Text style={[styles.questionText, { color: textColor }]}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {shuffledQuestion.options.map((option, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  getAnswerStyle(index),
                  glassStyles.glassButton,
                  { opacity: pressed && !showFeedback ? 0.7 : 1 }
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionCircle,
                    { 
                      borderColor: colors.lavender,
                      backgroundColor: selectedAnswer === index && showFeedback
                        ? (index === shuffledQuestion.correctAnswerIndex 
                            ? colors.success 
                            : colors.error)
                        : 'transparent'
                    }
                  ]}>
                    {selectedAnswer === index && showFeedback && (
                      <IconSymbol 
                        ios_icon_name={index === shuffledQuestion.correctAnswerIndex ? "checkmark" : "xmark"}
                        android_material_icon_name={index === shuffledQuestion.correctAnswerIndex ? "check" : "close"}
                        size={18} 
                        color={colors.textLight}
                      />
                    )}
                  </View>
                  <Text style={[styles.optionText, { color: textColor }]}>
                    {option}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {showFeedback && currentQuestion.explanation && (
            <View style={[
              styles.feedbackCard,
              glassStyles.glassLavenderCard,
              { 
                borderColor: selectedAnswer === shuffledQuestion.correctAnswerIndex
                  ? colors.success
                  : colors.error,
                borderWidth: 2,
              }
            ]}>
              <View style={styles.feedbackHeader}>
                <LinearGradient
                  colors={selectedAnswer === shuffledQuestion.correctAnswerIndex
                    ? [colors.success, '#C8E6C9']
                    : [colors.error, '#FFCDD2']}
                  style={styles.feedbackIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol 
                    ios_icon_name={selectedAnswer === shuffledQuestion.correctAnswerIndex ? "checkmark.circle.fill" : "xmark.circle.fill"}
                    android_material_icon_name={selectedAnswer === shuffledQuestion.correctAnswerIndex ? "check-circle" : "cancel"}
                    size={28} 
                    color={colors.textLight}
                  />
                </LinearGradient>
                <Text style={[
                  styles.feedbackTitle,
                  { 
                    color: selectedAnswer === shuffledQuestion.correctAnswerIndex
                      ? colors.success
                      : colors.error
                  }
                ]}>
                  {selectedAnswer === shuffledQuestion.correctAnswerIndex ? 'Perfect!' : 'Not quite!'}
                </Text>
              </View>
              <Text style={[styles.feedbackText, { color: textColor }]}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <Modal
        visible={isPaused}
        transparent={true}
        animationType="fade"
        onRequestClose={handleResume}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.pauseModal, glassStyles.glassCard]}>
            <LinearGradient
              colors={gradients.lavenderPink}
              style={styles.pauseIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="pause.circle.fill" 
                android_material_icon_name="pause-circle" 
                size={64} 
                color={colors.cream}
              />
            </LinearGradient>
            <Text style={[styles.pauseTitle, { color: textColor }]}>
              Quiz Paused
            </Text>
            <Text style={[styles.pauseText, { color: secondaryTextColor }]}>
              Take your time! Your progress is saved.
            </Text>
            <Text style={[styles.pauseProgress, { color: colors.softPlum }]}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={[styles.pauseScore, { color: textColor }]}>
              Current Score: {score}
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.resumeButton,
                { opacity: pressed ? 0.85 : 1 }
              ]}
              onPress={handleResume}
            >
              <LinearGradient
                colors={gradients.plumRose}
                style={styles.resumeButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol 
                  ios_icon_name="play.fill" 
                  android_material_icon_name="play-arrow" 
                  size={24} 
                  color={colors.cream}
                />
                <Text style={styles.resumeButtonText}>Resume Quiz</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showTryAgainModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTryAgainModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.tryAgainModal, glassStyles.glassCard]}>
            <LinearGradient
              colors={[colors.error, '#FFCDD2']}
              style={styles.tryAgainIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="arrow.clockwise.circle.fill" 
                android_material_icon_name="refresh" 
                size={64} 
                color={colors.cream}
              />
            </LinearGradient>
            <Text style={[styles.tryAgainTitle, { color: textColor }]}>
              Try Again
            </Text>
            <Text style={[styles.tryAgainText, { color: secondaryTextColor }]}>
              You&apos;ve missed 10 questions. Don&apos;t worry - practice makes perfect! The questions will be shuffled for a fresh start.
            </Text>
            <Text style={[styles.tryAgainScore, { color: colors.softPlum }]}>
              Current Score: {score} / {currentQuestionIndex + 1}
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.tryAgainButton,
                { opacity: pressed ? 0.85 : 1 }
              ]}
              onPress={handleTryAgainAfterFail}
            >
              <LinearGradient
                colors={gradients.plumRose}
                style={styles.tryAgainButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol 
                  ios_icon_name="arrow.clockwise" 
                  android_material_icon_name="refresh" 
                  size={24} 
                  color={colors.cream}
                />
                <Text style={styles.tryAgainButtonText}>Start Fresh</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressCard: {
    padding: 16,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    ...typography.caption,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  questionContainer: {
    width: '100%',
  },
  questionCard: {
    padding: 28,
    marginBottom: 24,
  },
  questionIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  questionText: {
    ...typography.heading3,
    fontSize: 21,
    lineHeight: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 16,
    gap: 14,
  },
  optionButton: {
    borderRadius: 20,
    padding: 18,
  },
  correctAnswer: {
    borderColor: colors.success,
    borderWidth: 2,
    backgroundColor: 'rgba(168, 213, 186, 0.2)',
  },
  wrongAnswer: {
    borderColor: colors.error,
    borderWidth: 2,
    backgroundColor: 'rgba(232, 160, 160, 0.2)',
  },
  disabledAnswer: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    lineHeight: 24,
  },
  feedbackCard: {
    padding: 20,
    marginTop: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feedbackTitle: {
    ...typography.heading3,
    fontSize: 20,
  },
  feedbackText: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(74, 44, 74, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  pauseModal: {
    padding: 36,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  pauseIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  pauseTitle: {
    ...typography.heading1,
    fontSize: 32,
    marginBottom: 12,
  },
  pauseText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 20,
  },
  pauseProgress: {
    ...typography.heading3,
    fontSize: 19,
    marginBottom: 10,
  },
  pauseScore: {
    ...typography.heading2,
    fontSize: 24,
    marginBottom: 28,
  },
  resumeButton: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.glow,
  },
  resumeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
  },
  resumeButtonText: {
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
  },
  tryAgainModal: {
    padding: 36,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  tryAgainIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  tryAgainTitle: {
    ...typography.heading1,
    fontSize: 36,
    marginBottom: 12,
  },
  tryAgainText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  tryAgainScore: {
    ...typography.heading3,
    fontSize: 19,
    marginBottom: 28,
  },
  tryAgainButton: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.glow,
  },
  tryAgainButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
  },
  tryAgainButtonText: {
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
  },
});
