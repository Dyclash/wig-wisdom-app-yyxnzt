
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import { PageControls } from "@/components/PageControls";

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [showPauseInfo, setShowPauseInfo] = useState(false);

  // Mock data - in a real app, this would come from state management or backend
  const [userStats] = useState({
    name: "Wig Enthusiast",
    totalQuizzes: 12,
    bestScore: 38,
    averageScore: 32,
    currentRank: "Wig Enthusiast",
    totalCorrect: 384,
    totalQuestions: 576,
    achievements: [
      { id: 1, name: "First Quiz", emoji: "🎯", unlocked: true },
      { id: 2, name: "Perfect Score", emoji: "💯", unlocked: false },
      { id: 3, name: "10 Quizzes", emoji: "🔟", unlocked: true },
      { id: 4, name: "Lace Master", emoji: "👑", unlocked: false },
      { id: 5, name: "Speed Demon", emoji: "⚡", unlocked: true },
      { id: 6, name: "Dedicated Learner", emoji: "📚", unlocked: true },
    ],
    recentScores: [
      { date: "Today", score: 38, total: 48, rank: "Lace Master" },
      { date: "Yesterday", score: 32, total: 48, rank: "Wig Enthusiast" },
      { date: "2 days ago", score: 29, total: 48, rank: "Wig Enthusiast" },
    ],
  });

  const overallPercentage = Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100);

  const handleStartQuiz = () => {
    console.log('Starting quiz from profile...');
    router.push('/quiz');
  };

  const handlePause = () => {
    console.log('Pause info shown on profile page');
    setShowPauseInfo(true);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.dark ? '#1a1a1a' : theme.colors.background }]} edges={['top']}>
      <PageControls onPause={handlePause} showPause={true} />
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <LinearGradient
            colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
            style={styles.avatarContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol 
              ios_icon_name="sparkles" 
              android_material_icon_name="auto-awesome" 
              size={48} 
              color={colors.accent}
            />
          </LinearGradient>
          <Text style={[styles.name, { color: theme.dark ? '#ffffff' : colors.text }]}>
            {userStats.name}
          </Text>
          <View style={[styles.rankBadge, { backgroundColor: theme.dark ? '#3a3a3a' : colors.highlight }]}>
            <Text style={[styles.rankText, { color: theme.dark ? colors.secondary : colors.primary }]}>
              {userStats.currentRank}
            </Text>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={[styles.statsCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Quiz Statistics
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.dark ? ['#4a148c', '#7b1fa2'] : [colors.primary, colors.secondary]}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="list.bullet.clipboard" 
                  android_material_icon_name="assignment" 
                  size={24} 
                  color="#FFFFFF"
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: theme.dark ? '#ffffff' : colors.text }]}>
                {userStats.totalQuizzes}
              </Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Total Quizzes
              </Text>
            </View>

            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.dark ? ['#ffd700', '#ffed4e'] : [colors.accent, '#FFE55C']}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="star.fill" 
                  android_material_icon_name="star" 
                  size={24} 
                  color={theme.dark ? '#7b1fa2' : colors.primary}
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: theme.dark ? '#ffffff' : colors.text }]}>
                {userStats.bestScore}/48
              </Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Best Score
              </Text>
            </View>

            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.dark ? ['#9c27b0', '#ba68c8'] : [colors.secondary, '#E1BEE7']}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="chart.bar.fill" 
                  android_material_icon_name="bar-chart" 
                  size={24} 
                  color="#FFFFFF"
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: theme.dark ? '#ffffff' : colors.text }]}>
                {userStats.averageScore}/48
              </Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Average Score
              </Text>
            </View>
          </View>

          {/* Overall Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Overall Accuracy
              </Text>
              <Text style={[styles.progressPercentage, { color: theme.dark ? colors.secondary : colors.primary }]}>
                {overallPercentage}%
              </Text>
            </View>
            <View style={[styles.progressBarContainer, { backgroundColor: theme.dark ? '#3a3a3a' : colors.highlight }]}>
              <LinearGradient
                colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
                style={[styles.progressBar, { width: `${overallPercentage}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.dark ? '#999999' : colors.textSecondary }]}>
              {userStats.totalCorrect} correct out of {userStats.totalQuestions} questions
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.achievementsCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Achievements
          </Text>
          <View style={styles.achievementsGrid}>
            {userStats.achievements.map((achievement, index) => (
              <View 
                key={index}
                style={[
                  styles.achievementItem,
                  { 
                    backgroundColor: achievement.unlocked 
                      ? (theme.dark ? '#3a3a3a' : colors.highlight)
                      : (theme.dark ? '#252525' : '#F0F0F0'),
                    opacity: achievement.unlocked ? 1 : 0.5
                  }
                ]}
              >
                <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                <Text style={[
                  styles.achievementName, 
                  { color: theme.dark ? '#cccccc' : colors.textSecondary }
                ]}>
                  {achievement.name}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.checkmarkContainer}>
                    <IconSymbol 
                      ios_icon_name="checkmark.circle.fill" 
                      android_material_icon_name="check-circle" 
                      size={16} 
                      color="#4CAF50"
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Scores */}
        <View style={[styles.recentCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Recent Quizzes
          </Text>
          {userStats.recentScores.map((quiz, index) => (
            <View 
              key={index}
              style={[
                styles.recentItem,
                { borderBottomColor: theme.dark ? '#3a3a3a' : colors.highlight }
              ]}
            >
              <View style={styles.recentLeft}>
                <Text style={[styles.recentDate, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                  {quiz.date}
                </Text>
                <Text style={[styles.recentRank, { color: theme.dark ? colors.secondary : colors.primary }]}>
                  {quiz.rank}
                </Text>
              </View>
              <View style={styles.recentRight}>
                <Text style={[styles.recentScore, { color: theme.dark ? '#ffffff' : colors.text }]}>
                  {quiz.score}/{quiz.total}
                </Text>
                <Text style={[styles.recentPercentage, { color: theme.dark ? '#999999' : colors.textSecondary }]}>
                  {Math.round((quiz.score / quiz.total) * 100)}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Take Quiz Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.quizButton,
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={handleStartQuiz}
        >
          <LinearGradient
            colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <IconSymbol 
              ios_icon_name="play.fill" 
              android_material_icon_name="play-arrow" 
              size={24} 
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>Take Another Quiz</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>

      {/* Info Modal */}
      <Modal
        visible={showPauseInfo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPauseInfo(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.infoModal, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
            <IconSymbol 
              ios_icon_name="info.circle.fill" 
              android_material_icon_name="info" 
              size={64} 
              color={theme.dark ? colors.secondary : colors.primary}
            />
            <Text style={[styles.infoTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
              Profile Page
            </Text>
            <Text style={[styles.infoText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
              View your quiz statistics, achievements, and recent scores. Start a new quiz to improve your ranking!
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.infoButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => setShowPauseInfo(false)}
            >
              <LinearGradient
                colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
                style={styles.infoButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.infoButtonText}>Got it!</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 100,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  rankBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '800',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  recentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recentLeft: {
    flex: 1,
  },
  recentDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  recentRank: {
    fontSize: 16,
    fontWeight: '700',
  },
  recentRight: {
    alignItems: 'flex-end',
  },
  recentScore: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  recentPercentage: {
    fontSize: 12,
  },
  quizButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoModal: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  infoTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  infoButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
  },
  infoButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
