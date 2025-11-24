
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, glassStyles, gradients, shadows, typography } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { RankType } from '@/types/quiz';
import { PageControls } from '@/components/PageControls';

export default function ResultsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPauseInfo, setShowPauseInfo] = useState(false);
  
  const score = parseInt(params.score as string) || 0;
  const total = parseInt(params.total as string) || 48;
  const percentage = Math.round((score / total) * 100);

  const bgColor = theme.dark ? colors.backgroundDark : colors.background;
  const textColor = theme.dark ? colors.textLight : colors.text;
  const secondaryTextColor = theme.dark ? '#D4B5D4' : colors.textSecondary;

  const getRank = (): { rank: RankType; emoji: string; message: string; gradient: string[] } => {
    if (score <= 16) {
      return {
        rank: 'Wig Rookie',
        emoji: '🌱',
        message: 'You\'re just beginning your wig journey! Keep learning and you\'ll blossom into an expert.',
        gradient: gradients.lavenderPink
      };
    } else if (score <= 32) {
      return {
        rank: 'Wig Enthusiast',
        emoji: '💜',
        message: 'Wonderful! You have a solid grasp of wig care and styling. You\'re well on your way!',
        gradient: gradients.plumRose
      };
    } else {
      return {
        rank: 'Lace Master',
        emoji: '👑',
        message: 'Absolutely stunning! You\'re a true wig connoisseur. Your expertise is exceptional!',
        gradient: gradients.roseGoldShimmer
      };
    }
  };

  const { rank, emoji, message, gradient } = getRank();

  const handleTryAgain = () => {
    console.log('Restarting quiz...');
    router.replace('/quiz');
  };

  const handleGoHome = () => {
    console.log('Going home...');
    router.replace('/(tabs)/(home)/');
  };

  const handlePause = () => {
    console.log('Pause info shown on results page');
    setShowPauseInfo(true);
  };

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
      
      <PageControls onPause={handlePause} showPause={true} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.title, { color: textColor }]}>
            Quiz Complete!
          </Text>
          <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
            ✨ Beautiful work! ✨
          </Text>
        </View>

        <View style={[styles.scoreCard, glassStyles.glassPinkCard]}>
          <LinearGradient
            colors={gradient}
            style={styles.scoreCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreTotal}>/ {total}</Text>
          </LinearGradient>
          
          <Text style={[styles.percentage, { color: textColor }]}>
            {percentage}% Correct
          </Text>
        </View>

        <View style={[styles.rankCard, glassStyles.glassLavenderCard]}>
          <View style={styles.rankBadgeContainer}>
            <LinearGradient
              colors={gradient}
              style={[styles.rankBadge, glassStyles.glowEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="crown.fill" 
                android_material_icon_name="workspace-premium" 
                size={40} 
                color={colors.cream}
              />
            </LinearGradient>
          </View>
          
          <Text style={[styles.rankTitle, { color: secondaryTextColor }]}>
            Your Rank
          </Text>
          <Text style={[styles.rankName, { color: colors.softPlum }]}>
            {rank}
          </Text>
          <Text style={[styles.rankMessage, { color: textColor }]}>
            {message}
          </Text>
        </View>

        <View style={[styles.statsCard, glassStyles.glassCard]}>
          <Text style={[styles.statsTitle, { color: textColor }]}>
            Performance Breakdown
          </Text>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={[colors.success, '#C8E6C9']}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="checkmark.circle.fill" 
                  android_material_icon_name="check-circle" 
                  size={28} 
                  color={colors.textLight}
                />
              </LinearGradient>
              <Text style={[styles.statLabel, { color: secondaryTextColor }]}>
                Correct
              </Text>
              <Text style={[styles.statValue, { color: textColor }]}>
                {score}
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={[colors.error, '#FFCDD2']}
                style={styles.statIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <IconSymbol 
                  ios_icon_name="xmark.circle.fill" 
                  android_material_icon_name="cancel" 
                  size={28} 
                  color={colors.textLight}
                />
              </LinearGradient>
              <Text style={[styles.statLabel, { color: secondaryTextColor }]}>
                Incorrect
              </Text>
              <Text style={[styles.statValue, { color: textColor }]}>
                {total - score}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.85 : 1 }
            ]}
            onPress={handleTryAgain}
          >
            <LinearGradient
              colors={gradients.plumRose}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol 
                ios_icon_name="arrow.clockwise" 
                android_material_icon_name="refresh" 
                size={24} 
                color={colors.cream}
              />
              <Text style={styles.buttonText}>Try Again</Text>
            </LinearGradient>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.secondaryButton,
              glassStyles.glassButton,
              { opacity: pressed ? 0.85 : 1 }
            ]}
            onPress={handleGoHome}
          >
            <IconSymbol 
              ios_icon_name="house.fill" 
              android_material_icon_name="home" 
              size={24} 
              color={colors.softPlum}
            />
            <Text style={[styles.secondaryButtonText, { color: colors.softPlum }]}>
              Back to Home
            </Text>
          </Pressable>
        </View>
      </ScrollView>

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
              Quiz Completed!
            </Text>
            <Text style={[styles.infoText, { color: secondaryTextColor }]}>
              You&apos;ve finished the quiz beautifully. Review your results or start a new quiz to improve your score!
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 140,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 90,
    marginBottom: 16,
    textShadowColor: 'rgba(154, 78, 136, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  title: {
    ...typography.heading1,
    fontSize: 36,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    fontSize: 17,
    fontStyle: 'italic',
  },
  scoreCard: {
    width: '100%',
    padding: 36,
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...shadows.glow,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.cream,
  },
  scoreTotal: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.cream,
    opacity: 0.9,
  },
  percentage: {
    ...typography.heading2,
    fontSize: 26,
  },
  rankCard: {
    width: '100%',
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
  },
  rankBadgeContainer: {
    marginBottom: 20,
  },
  rankBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  rankTitle: {
    ...typography.caption,
    fontSize: 16,
    marginBottom: 8,
  },
  rankName: {
    ...typography.heading1,
    fontSize: 32,
    marginBottom: 16,
  },
  rankMessage: {
    ...typography.body,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
  },
  statsCard: {
    width: '100%',
    padding: 28,
    marginBottom: 32,
  },
  statsTitle: {
    ...typography.heading3,
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...shadows.soft,
  },
  statDivider: {
    width: 1,
    height: 80,
    backgroundColor: 'rgba(200, 162, 200, 0.3)',
  },
  statLabel: {
    ...typography.caption,
    fontSize: 14,
    marginBottom: 6,
  },
  statValue: {
    ...typography.heading2,
    fontSize: 28,
  },
  buttonContainer: {
    width: '100%',
    gap: 14,
  },
  button: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.glow,
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
  secondaryButton: {
    width: '100%',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
  },
  secondaryButtonText: {
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
