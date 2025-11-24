
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
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
  const total = parseInt(params.total as string) || 20;
  const percentage = Math.round((score / total) * 100);

  const getRank = (): { rank: RankType; emoji: string; message: string } => {
    if (score <= 5) {
      return {
        rank: 'Wig Rookie',
        emoji: '🌱',
        message: 'You\'re just getting started! Keep learning about wigs and you\'ll be a pro in no time.'
      };
    } else if (score <= 12) {
      return {
        rank: 'Wig Enthusiast',
        emoji: '💜',
        message: 'Great job! You have a solid understanding of wig care and styling. Keep it up!'
      };
    } else {
      return {
        rank: 'Lace Master',
        emoji: '👑',
        message: 'Outstanding! You\'re a true wig expert. Your knowledge is impressive!'
      };
    }
  };

  const { rank, emoji, message } = getRank();

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
    <View style={[styles.container, { backgroundColor: theme.dark ? '#1a1a1a' : colors.background }]}>
      <PageControls onPause={handlePause} showPause={true} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.title, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Quiz Complete!
          </Text>
        </View>

        <View style={[styles.scoreCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <LinearGradient
            colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
            style={styles.scoreCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreTotal}>/ {total}</Text>
          </LinearGradient>
          
          <Text style={[styles.percentage, { color: theme.dark ? '#ffffff' : colors.text }]}>
            {percentage}% Correct
          </Text>
        </View>

        <View style={[styles.rankCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.highlight }]}>
          <View style={styles.rankBadge}>
            <LinearGradient
              colors={theme.dark ? ['#ffd700', '#ffed4e'] : [colors.accent, '#FFE55C']}
              style={styles.badgeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol 
                ios_icon_name="star.fill" 
                android_material_icon_name="star" 
                size={32} 
                color={theme.dark ? '#7b1fa2' : colors.primary}
              />
            </LinearGradient>
          </View>
          
          <Text style={[styles.rankTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Your Rank
          </Text>
          <Text style={[styles.rankName, { color: theme.dark ? colors.secondary : colors.primary }]}>
            {rank}
          </Text>
          <Text style={[styles.rankMessage, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
            {message}
          </Text>
        </View>

        <View style={[styles.statsCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <Text style={[styles.statsTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Performance Breakdown
          </Text>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <IconSymbol 
                ios_icon_name="checkmark.circle.fill" 
                android_material_icon_name="check-circle" 
                size={24} 
                color="#4CAF50"
              />
              <Text style={[styles.statLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Correct
              </Text>
              <Text style={[styles.statValue, { color: theme.dark ? '#ffffff' : colors.text }]}>
                {score}
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <IconSymbol 
                ios_icon_name="xmark.circle.fill" 
                android_material_icon_name="cancel" 
                size={24} 
                color="#F44336"
              />
              <Text style={[styles.statLabel, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
                Incorrect
              </Text>
              <Text style={[styles.statValue, { color: theme.dark ? '#ffffff' : colors.text }]}>
                {total - score}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={handleTryAgain}
          >
            <LinearGradient
              colors={theme.dark ? ['#7b1fa2', '#9c27b0'] : [colors.primary, colors.secondary]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol 
                ios_icon_name="arrow.clockwise" 
                android_material_icon_name="refresh" 
                size={24} 
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>Try Again</Text>
            </LinearGradient>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.secondaryButton,
              { 
                backgroundColor: theme.dark ? '#333333' : colors.highlight,
                opacity: pressed ? 0.8 : 1 
              }
            ]}
            onPress={handleGoHome}
          >
            <IconSymbol 
              ios_icon_name="house.fill" 
              android_material_icon_name="home" 
              size={24} 
              color={theme.dark ? colors.secondary : colors.primary}
            />
            <Text style={[styles.secondaryButtonText, { color: theme.dark ? colors.secondary : colors.primary }]}>
              Back to Home
            </Text>
          </Pressable>
        </View>
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
              Quiz Completed!
            </Text>
            <Text style={[styles.infoText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
              You&apos;ve finished the quiz. Review your results or start a new quiz to improve your score!
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  scoreCard: {
    width: '100%',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scoreTotal: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  rankCard: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  rankBadge: {
    marginBottom: 16,
  },
  badgeGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.4)',
    elevation: 6,
  },
  rankTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rankName: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  rankMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  statsCard: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
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
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E0E0E0',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
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
  secondaryButton: {
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  secondaryButtonText: {
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
