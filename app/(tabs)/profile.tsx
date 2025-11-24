
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Modal, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, glassStyles, gradients, shadows, typography } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import { PageControls } from "@/components/PageControls";

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [showPauseInfo, setShowPauseInfo] = useState(false);

  const bgColor = theme.dark ? colors.backgroundDark : colors.background;
  const textColor = theme.dark ? colors.textLight : colors.text;
  const secondaryTextColor = theme.dark ? '#D4B5D4' : colors.textSecondary;

  const initialStats = {
    name: "Wig Enthusiast",
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
    currentRank: "Wig Rookie",
    totalCorrect: 0,
    totalQuestions: 0,
    achievements: [
      { id: 1, name: "First Quiz", emoji: "🎯", unlocked: false },
      { id: 2, name: "Perfect Score", emoji: "💯", unlocked: false },
      { id: 3, name: "10 Quizzes", emoji: "🔟", unlocked: false },
      { id: 4, name: "Lace Master", emoji: "👑", unlocked: false },
      { id: 5, name: "Speed Demon", emoji: "⚡", unlocked: false },
      { id: 6, name: "Dedicated Learner", emoji: "📚", unlocked: false },
    ],
    recentScores: [],
  };

  const [userStats, setUserStats] = useState({
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

  const overallPercentage = userStats.totalQuestions > 0 
    ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100) 
    : 0;

  const handleStartQuiz = () => {
    console.log('Starting quiz from profile...');
    router.push('/quiz');
  };

  const handlePause = () => {
    console.log('Pause info shown on profile page');
    setShowPauseInfo(true);
  };

  const handleResetStats = () => {
    console.log('Reset stats button pressed');
    Alert.alert(
      "Reset Statistics",
      "Are you sure you want to reset all your quiz statistics and achievements? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log('Reset cancelled')
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            console.log('Resetting all statistics and achievements...');
            setUserStats(initialStats);
            Alert.alert(
              "Reset Complete",
              "Your quiz statistics and achievements have been reset successfully!",
              [{ text: "OK", onPress: () => console.log('Reset confirmed') }]
            );
          }
        }
      ]
    );
  };

  const handleContactPress = (type: string, value: string) => {
    console.log(`Contact pressed: ${type} - ${value}`);
    let url = '';
    
    switch (type) {
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'website':
        url = value.startsWith('http') ? value : `https://${value}`;
        break;
      case 'instagram':
        url = `https://instagram.com/${value.replace('@', '')}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${value.replace('@', '')}`;
        break;
      default:
        console.log('Unknown contact type');
        return;
    }

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Cannot open URL: ${url}`);
      }
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <LinearGradient
        colors={theme.dark 
          ? ['rgba(42, 26, 46, 0.9)', 'rgba(154, 78, 136, 0.2)', 'rgba(42, 26, 46, 0.9)']
          : ['rgba(255, 243, 236, 1)', 'rgba(247, 198, 208, 0.3)', 'rgba(200, 162, 200, 0.2)']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <PageControls onPause={handlePause} showPause={true} />
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[styles.profileHeader, glassStyles.glassPinkCard]}>
          <LinearGradient
            colors={gradients.plumRose}
            style={styles.avatarContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol 
              ios_icon_name="sparkles" 
              android_material_icon_name="auto-awesome" 
              size={52} 
              color={colors.cream}
            />
          </LinearGradient>
          <Text style={[styles.name, { color: textColor }]}>
            {userStats.name}
          </Text>
          <View style={[styles.rankBadge, glassStyles.glassButton]}>
            <Text style={[styles.rankText, { color: colors.softPlum }]}>
              {userStats.currentRank}
            </Text>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={[styles.statsCard, glassStyles.glassLavenderCard]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Quiz Statistics
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={gradients.plumRose}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="list.bullet.clipboard" 
                  android_material_icon_name="assignment" 
                  size={26} 
                  color={colors.cream}
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: textColor }]}>
                {userStats.totalQuizzes}
              </Text>
              <Text style={[styles.statLabel, { color: secondaryTextColor }]}>
                Total Quizzes
              </Text>
            </View>

            <View style={styles.statItem}>
              <LinearGradient
                colors={gradients.roseGoldShimmer}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol 
                  ios_icon_name="star.fill" 
                  android_material_icon_name="star" 
                  size={26} 
                  color={colors.cream}
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: textColor }]}>
                {userStats.bestScore}/48
              </Text>
              <Text style={[styles.statLabel, { color: secondaryTextColor }]}>
                Best Score
              </Text>
            </View>

            <View style={styles.statItem}>
              <LinearGradient
                colors={gradients.lavenderPink}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="chart.bar.fill" 
                  android_material_icon_name="bar-chart" 
                  size={26} 
                  color={colors.cream}
                />
              </LinearGradient>
              <Text style={[styles.statValue, { color: textColor }]}>
                {userStats.averageScore}/48
              </Text>
              <Text style={[styles.statLabel, { color: secondaryTextColor }]}>
                Average Score
              </Text>
            </View>
          </View>

          {/* Overall Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: secondaryTextColor }]}>
                Overall Accuracy
              </Text>
              <Text style={[styles.progressPercentage, { color: colors.softPlum }]}>
                {overallPercentage}%
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={gradients.plumRose}
                style={[styles.progressBar, { width: `${overallPercentage}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={[styles.progressText, { color: secondaryTextColor }]}>
              {userStats.totalCorrect} correct out of {userStats.totalQuestions} questions
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.achievementsCard, glassStyles.glassCard]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Achievements
          </Text>
          <View style={styles.achievementsGrid}>
            {userStats.achievements.map((achievement) => (
              <View 
                key={`achievement-${achievement.id}`}
                style={[
                  styles.achievementItem,
                  glassStyles.glassButton,
                  { opacity: achievement.unlocked ? 1 : 0.4 }
                ]}
              >
                <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                <Text style={[
                  styles.achievementName, 
                  { color: textColor }
                ]}>
                  {achievement.name}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.checkmarkContainer}>
                    <IconSymbol 
                      ios_icon_name="checkmark.circle.fill" 
                      android_material_icon_name="check-circle" 
                      size={18} 
                      color={colors.success}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent Scores */}
        {userStats.recentScores.length > 0 && (
          <View style={[styles.recentCard, glassStyles.glassPinkCard]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Recent Quizzes
            </Text>
            {userStats.recentScores.map((quiz, index) => (
              <View 
                key={`recent-quiz-${index}-${quiz.date}`}
                style={[
                  styles.recentItem,
                  { borderBottomColor: 'rgba(200, 162, 200, 0.3)' }
                ]}
              >
                <View style={styles.recentLeft}>
                  <Text style={[styles.recentDate, { color: secondaryTextColor }]}>
                    {quiz.date}
                  </Text>
                  <Text style={[styles.recentRank, { color: colors.softPlum }]}>
                    {quiz.rank}
                  </Text>
                </View>
                <View style={styles.recentRight}>
                  <Text style={[styles.recentScore, { color: textColor }]}>
                    {quiz.score}/{quiz.total}
                  </Text>
                  <Text style={[styles.recentPercentage, { color: secondaryTextColor }]}>
                    {Math.round((quiz.score / quiz.total) * 100)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Reset Statistics Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.resetButton,
            glassStyles.glassButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={handleResetStats}
        >
          <IconSymbol 
            ios_icon_name="arrow.counterclockwise.circle.fill" 
            android_material_icon_name="restore" 
            size={24} 
            color={theme.dark ? '#ff6b6b' : '#d32f2f'}
          />
          <Text style={[styles.resetButtonText, { color: theme.dark ? '#ff6b6b' : '#d32f2f' }]}>
            Reset Quiz Statistics & Achievements
          </Text>
        </Pressable>

        {/* Contact Us Section */}
        <View style={[styles.contactCard, glassStyles.glassLavenderCard]}>
          <View style={styles.contactHeader}>
            <LinearGradient
              colors={gradients.plumRose}
              style={styles.contactIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="envelope.fill" 
                android_material_icon_name="mail" 
                size={32} 
                color={colors.cream}
              />
            </LinearGradient>
            <Text style={[styles.sectionTitle, { color: textColor, marginBottom: 8 }]}>
              Contact Us
            </Text>
            <Text style={[styles.contactSubtitle, { color: secondaryTextColor }]}>
              Have questions? We&apos;re here to help!
            </Text>
          </View>

          <View style={styles.contactList}>
            <Pressable 
              style={({ pressed }) => [
                styles.contactItem,
                glassStyles.glassButton,
                { opacity: pressed ? 0.7 : 1 }
              ]}
              onPress={() => handleContactPress('email', 'support@wigwisdom.com')}
            >
              <View style={styles.contactIconWrapper}>
                <IconSymbol 
                  ios_icon_name="envelope.fill" 
                  android_material_icon_name="mail" 
                  size={22} 
                  color={colors.softPlum}
                />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactLabel, { color: secondaryTextColor }]}>
                  Email
                </Text>
                <Text style={[styles.contactValue, { color: textColor }]}>
                  support@wigwisdom.com
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="chevron-right" 
                size={20} 
                color={secondaryTextColor}
              />
            </Pressable>

            <Pressable 
              style={({ pressed }) => [
                styles.contactItem,
                glassStyles.glassButton,
                { opacity: pressed ? 0.7 : 1 }
              ]}
              onPress={() => handleContactPress('website', 'www.wigwisdom.com')}
            >
              <View style={styles.contactIconWrapper}>
                <IconSymbol 
                  ios_icon_name="globe" 
                  android_material_icon_name="language" 
                  size={22} 
                  color={colors.softPlum}
                />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactLabel, { color: secondaryTextColor }]}>
                  Website
                </Text>
                <Text style={[styles.contactValue, { color: textColor }]}>
                  www.wigwisdom.com
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="chevron-right" 
                size={20} 
                color={secondaryTextColor}
              />
            </Pressable>
          </View>

          <View style={styles.socialSection}>
            <Text style={[styles.socialTitle, { color: secondaryTextColor }]}>
              Follow Us
            </Text>
            <View style={styles.socialButtons}>
              <Pressable 
                style={({ pressed }) => [
                  styles.socialButton,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={() => handleContactPress('instagram', '@wigwisdom')}
              >
                <LinearGradient
                  colors={['#833AB4', '#FD1D1D', '#FCAF45']}
                  style={styles.socialButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol 
                    ios_icon_name="camera.fill" 
                    android_material_icon_name="photo-camera" 
                    size={24} 
                    color={colors.cream}
                  />
                </LinearGradient>
              </Pressable>

              <Pressable 
                style={({ pressed }) => [
                  styles.socialButton,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={() => handleContactPress('twitter', '@wigwisdom')}
              >
                <LinearGradient
                  colors={['#1DA1F2', '#0E71C8']}
                  style={styles.socialButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol 
                    ios_icon_name="bird.fill" 
                    android_material_icon_name="flutter-dash" 
                    size={24} 
                    color={colors.cream}
                  />
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Take Quiz Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.quizButton,
            { opacity: pressed ? 0.85 : 1 }
          ]}
          onPress={handleStartQuiz}
        >
          <LinearGradient
            colors={gradients.plumRose}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <IconSymbol 
              ios_icon_name="play.fill" 
              android_material_icon_name="play-arrow" 
              size={24} 
              color={colors.cream}
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
          <View style={[styles.infoModal, glassStyles.glassCard]}>
            <LinearGradient
              colors={gradients.lavenderPink}
              style={styles.infoIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="info.circle.fill" 
                android_material_icon_name="info" 
                size={64} 
                color={colors.cream}
              />
            </LinearGradient>
            <Text style={[styles.infoTitle, { color: textColor }]}>
              Profile Page
            </Text>
            <Text style={[styles.infoText, { color: secondaryTextColor }]}>
              View your quiz statistics, achievements, and recent scores. Start a new quiz to improve your ranking!
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.infoButton,
                { opacity: pressed ? 0.85 : 1 }
              ]}
              onPress={() => setShowPauseInfo(false)}
            >
              <LinearGradient
                colors={gradients.plumRose}
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 100,
  },
  contentContainerWithTabBar: {
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 28,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...shadows.glow,
  },
  name: {
    ...typography.heading1,
    fontSize: 28,
    marginBottom: 12,
  },
  rankBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rankText: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '700',
  },
  statsCard: {
    padding: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.heading2,
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...shadows.soft,
  },
  statValue: {
    ...typography.heading3,
    fontSize: 22,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
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
    marginBottom: 10,
  },
  progressLabel: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '600',
  },
  progressPercentage: {
    ...typography.heading3,
    fontSize: 18,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    ...typography.caption,
    fontSize: 13,
    textAlign: 'center',
  },
  achievementsCard: {
    padding: 24,
    marginBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  achievementItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  achievementEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  achievementName: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  recentCard: {
    padding: 24,
    marginBottom: 20,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  recentLeft: {
    flex: 1,
  },
  recentDate: {
    ...typography.caption,
    fontSize: 14,
    marginBottom: 6,
  },
  recentRank: {
    ...typography.heading3,
    fontSize: 18,
  },
  recentRight: {
    alignItems: 'flex-end',
  },
  recentScore: {
    ...typography.heading2,
    fontSize: 22,
    marginBottom: 2,
  },
  recentPercentage: {
    ...typography.caption,
    fontSize: 13,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginBottom: 20,
    gap: 10,
    borderWidth: 2,
    borderColor: 'rgba(211, 47, 47, 0.3)',
  },
  resetButtonText: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '700',
  },
  contactCard: {
    padding: 24,
    marginBottom: 20,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...shadows.soft,
  },
  contactSubtitle: {
    ...typography.body,
    fontSize: 15,
    textAlign: 'center',
  },
  contactList: {
    gap: 12,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  contactIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(200, 162, 200, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    ...typography.caption,
    fontSize: 12,
    marginBottom: 4,
  },
  contactValue: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '600',
  },
  socialSection: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 162, 200, 0.3)',
  },
  socialTitle: {
    ...typography.body,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.soft,
  },
  socialButtonGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizButton: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.glow,
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
  },
  buttonText: {
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(74, 44, 74, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoModal: {
    padding: 36,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  infoIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  infoTitle: {
    ...typography.heading1,
    fontSize: 32,
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 26,
  },
  infoButton: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.glow,
  },
  infoButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  infoButtonText: {
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
  },
});
