
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { colors, glassStyles, gradients, shadows, typography } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { LaceFrontalEmblem } from "@/components/LaceFrontalEmblem";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleStartQuiz = () => {
    console.log('Starting quiz...');
    router.push('/quiz');
  };

  const bgColor = theme.dark ? colors.backgroundDark : colors.background;
  const textColor = theme.dark ? colors.textLight : colors.text;
  const secondaryTextColor = theme.dark ? '#D4B5D4' : colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Decorative Background Gradient */}
      <LinearGradient
        colors={theme.dark 
          ? ['rgba(42, 26, 46, 0.9)', 'rgba(154, 78, 136, 0.2)', 'rgba(42, 26, 46, 0.9)']
          : ['rgba(255, 243, 236, 1)', 'rgba(247, 198, 208, 0.3)', 'rgba(200, 162, 200, 0.2)']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Lace Frontal Emblem */}
        <View style={styles.header}>
          <LaceFrontalEmblem size={140} style={styles.emblem} />
          
          <Text style={[styles.title, { color: textColor }]}>
            Wig Wisdom
          </Text>
          
          <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
            ✨ Master the Art of Wig Beauty ✨
          </Text>
        </View>

        {/* Glass Info Card */}
        <View style={[styles.glassCard, glassStyles.glassPinkCard]}>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <IconSymbol 
                ios_icon_name="questionmark.circle.fill" 
                android_material_icon_name="help" 
                size={28} 
                color={colors.softPlum}
              />
            </View>
            <Text style={[styles.infoText, { color: textColor }]}>
              48 expert questions covering every aspect of wig care
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <IconSymbol 
                ios_icon_name="clock.fill" 
                android_material_icon_name="schedule" 
                size={28} 
                color={colors.roseGold}
              />
            </View>
            <Text style={[styles.infoText, { color: textColor }]}>
              Take your time - learn at your own pace
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <IconSymbol 
                ios_icon_name="star.fill" 
                android_material_icon_name="star" 
                size={28} 
                color={colors.accent}
              />
            </View>
            <Text style={[styles.infoText, { color: textColor }]}>
              Become a certified Lace Master
            </Text>
          </View>
        </View>

        {/* Topics Card with Wave Pattern */}
        <View style={[styles.topicsCard, glassStyles.glassLavenderCard]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Topics Covered
          </Text>
          <View style={styles.topicsList}>
            {[
              { emoji: '💎', text: 'Wig Quality & Selection' },
              { emoji: '📏', text: 'Length & Density' },
              { emoji: '💡', text: 'Beginner Knowledge' },
              { emoji: '🛍️', text: 'Shopping & Buying' },
              { emoji: '🎯', text: 'Installation Methods' },
              { emoji: '💧', text: 'Wig Care' },
              { emoji: '🔥', text: 'Wig Maintenance' },
            ].map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <View style={styles.topicEmojiContainer}>
                  <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                </View>
                <Text style={[styles.topicText, { color: textColor }]}>
                  {topic.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ranking System with Glass Effect */}
        <View style={[styles.rankCard, glassStyles.glassCard]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Ranking System
          </Text>
          <View style={styles.rankList}>
            <View style={styles.rankItem}>
              <LinearGradient
                colors={['rgba(200, 162, 200, 0.3)', 'rgba(247, 198, 208, 0.3)']}
                style={styles.rankBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.rankEmoji}>🌱</Text>
              </LinearGradient>
              <View style={styles.rankTextContainer}>
                <Text style={[styles.rankName, { color: textColor }]}>Wig Rookie</Text>
                <Text style={[styles.rankScore, { color: secondaryTextColor }]}>0-16 correct</Text>
              </View>
            </View>
            
            <View style={styles.rankItem}>
              <LinearGradient
                colors={[colors.lavender, colors.blushPink]}
                style={styles.rankBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.rankEmoji}>💜</Text>
              </LinearGradient>
              <View style={styles.rankTextContainer}>
                <Text style={[styles.rankName, { color: textColor }]}>Wig Enthusiast</Text>
                <Text style={[styles.rankScore, { color: secondaryTextColor }]}>17-32 correct</Text>
              </View>
            </View>
            
            <View style={styles.rankItem}>
              <LinearGradient
                colors={gradients.roseGoldShimmer}
                style={[styles.rankBadge, glassStyles.glowEffect]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.rankEmoji}>👑</Text>
              </LinearGradient>
              <View style={styles.rankTextContainer}>
                <Text style={[styles.rankName, { color: textColor }]}>Lace Master</Text>
                <Text style={[styles.rankScore, { color: secondaryTextColor }]}>33-48 correct</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Start Button with Gradient */}
        <Pressable 
          style={({ pressed }) => [
            styles.startButton,
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
            <Text style={styles.buttonText}>Begin Your Journey</Text>
            <IconSymbol 
              ios_icon_name="arrow.right" 
              android_material_icon_name="arrow-forward" 
              size={24} 
              color={colors.cream}
            />
          </LinearGradient>
        </Pressable>
      </ScrollView>
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
  emblem: {
    marginBottom: 24,
  },
  title: {
    ...typography.heading1,
    fontSize: 48,
    marginBottom: 8,
    textShadowColor: 'rgba(154, 78, 136, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    ...typography.body,
    fontSize: 17,
    fontStyle: 'italic',
  },
  glassCard: {
    width: '100%',
    padding: 24,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...shadows.soft,
  },
  infoText: {
    ...typography.body,
    flex: 1,
    fontWeight: '600',
  },
  topicsCard: {
    width: '100%',
    padding: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.heading2,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  topicsList: {
    gap: 12,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    padding: 14,
    ...shadows.soft,
  },
  topicEmojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicEmoji: {
    fontSize: 22,
  },
  topicText: {
    ...typography.body,
    fontWeight: '600',
    flex: 1,
  },
  rankCard: {
    width: '100%',
    padding: 24,
    marginBottom: 32,
  },
  rankList: {
    gap: 16,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...shadows.soft,
  },
  rankEmoji: {
    fontSize: 32,
  },
  rankTextContainer: {
    flex: 1,
  },
  rankName: {
    ...typography.heading3,
    fontSize: 20,
    marginBottom: 4,
  },
  rankScore: {
    ...typography.caption,
    fontSize: 15,
  },
  startButton: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    ...shadows.glow,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  buttonText: {
    color: colors.cream,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
