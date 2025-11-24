
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { quizQuestions } from '@/data/quizQuestions';
import { LinearGradient } from 'expo-linear-gradient';

interface ShuffledQuestion {
  options: string[];
  correctAnswerIndex: number;
}

export default function QuizScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [shuffledQuestion, setShuffledQuestion] = useState<ShuffledQuestion | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  // Shuffle answers when question changes
  useEffect(() => {
    console.log(`Loading question ${currentQuestionIndex + 1}`);
    const shuffled = shuffleAnswers(currentQuestion.options, currentQuestion.correctAnswer);
    setShuffledQuestion(shuffled);
  }, [currentQuestionIndex]);

  const shuffleAnswers = (options: string[], correctAnswerIndex: number): ShuffledQuestion => {
    // Create array of indices
    const indices = options.map((_, index) => index);
    
    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Map shuffled indices to options
    const shuffledOptions = indices.map(index => options[index]);
    
    // Find new position of correct answer
    const newCorrectIndex = indices.indexOf(correctAnswerIndex);
    
    console.log(`Shuffled answers for question ${currentQuestionIndex + 1}. Correct answer now at index ${newCorrectIndex}`);
    
    return {
      options: shuffledOptions,
      correctAnswerIndex: newCorrectIndex
    };
  };

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
      console.log('Incorrect answer');
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
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
            total: quizQuestions.length 
          }
        });
      }
    }, 1500);
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

  // Don't render until shuffled question is ready
  if (!shuffledQuestion) {
    return (
      <View style={[styles.container, { backgroundColor: theme.dark ? '#1a1a1a' : colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? '#1a1a1a' : colors.background }]}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.dark ? '#333333' : colors.highlight }]}>
            <LinearGradient
              colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
              style={[styles.progressFill, { width: `${progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
          <View style={[styles.questionCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
            <View style={styles.questionHeader}>
              <IconSymbol 
                ios_icon_name="questionmark.circle.fill" 
                android_material_icon_name="help" 
                size={32} 
                color={theme.dark ? colors.secondary : colors.primary}
              />
            </View>
            <Text style={[styles.questionText, { color: theme.dark ? '#ffffff' : colors.text }]}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {shuffledQuestion.options.map((option, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  getAnswerStyle(index),
                  { 
                    backgroundColor: theme.dark ? '#2a2a2a' : colors.card,
                    opacity: pressed && !showFeedback ? 0.7 : 1 
                  }
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionCircle,
                    { 
                      borderColor: theme.dark ? '#555555' : colors.highlight,
                      backgroundColor: selectedAnswer === index && showFeedback
                        ? (index === shuffledQuestion.correctAnswerIndex 
                            ? '#4CAF50' 
                            : '#F44336')
                        : 'transparent'
                    }
                  ]}>
                    {selectedAnswer === index && showFeedback && (
                      <IconSymbol 
                        ios_icon_name={index === shuffledQuestion.correctAnswerIndex ? "checkmark" : "xmark"}
                        android_material_icon_name={index === shuffledQuestion.correctAnswerIndex ? "check" : "close"}
                        size={16} 
                        color="#FFFFFF"
                      />
                    )}
                  </View>
                  <Text style={[
                    styles.optionText,
                    { color: theme.dark ? '#ffffff' : colors.text }
                  ]}>
                    {option}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {showFeedback && currentQuestion.explanation && (
            <View style={[
              styles.feedbackCard,
              { 
                backgroundColor: selectedAnswer === shuffledQuestion.correctAnswerIndex
                  ? (theme.dark ? '#1b5e20' : '#E8F5E9')
                  : (theme.dark ? '#b71c1c' : '#FFEBEE')
              }
            ]}>
              <View style={styles.feedbackHeader}>
                <IconSymbol 
                  ios_icon_name={selectedAnswer === shuffledQuestion.correctAnswerIndex ? "checkmark.circle.fill" : "xmark.circle.fill"}
                  android_material_icon_name={selectedAnswer === shuffledQuestion.correctAnswerIndex ? "check-circle" : "cancel"}
                  size={24} 
                  color={selectedAnswer === shuffledQuestion.correctAnswerIndex ? '#4CAF50' : '#F44336'}
                />
                <Text style={[
                  styles.feedbackTitle,
                  { 
                    color: selectedAnswer === shuffledQuestion.correctAnswerIndex
                      ? '#4CAF50'
                      : '#F44336'
                  }
                ]}>
                  {selectedAnswer === shuffledQuestion.correctAnswerIndex ? 'Correct!' : 'Not quite!'}
                </Text>
              </View>
              <Text style={[
                styles.feedbackText,
                { color: theme.dark ? '#ffffff' : colors.text }
              ]}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  questionContainer: {
    width: '100%',
  },
  questionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  questionHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  optionButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  correctAnswer: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  wrongAnswer: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  disabledAnswer: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    lineHeight: 22,
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  feedbackText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
