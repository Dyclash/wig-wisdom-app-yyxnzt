
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol.ios";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleStartQuiz = () => {
    console.log('Starting quiz...');
    router.push('/quiz');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.dark ? '#1a1a1a' : colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <LinearGradient
          colors={theme.dark ? ['#4a148c', '#7b1fa2'] : [colors.primary, colors.secondary]}
          style={styles.iconContainer}
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
        
        <Text style={[styles.title, { color: theme.dark ? '#ffffff' : colors.text }]}>
          Wig Wisdom
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
          Test your wig knowledge!
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={[styles.infoCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.card }]}>
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="questionmark.circle.fill" 
              android_material_icon_name="help" 
              size={24} 
              color={theme.dark ? colors.secondary : colors.primary}
            />
            <Text style={[styles.infoText, { color: theme.dark ? '#ffffff' : colors.text }]}>
              20 questions about wigs, care, and styling
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="clock.fill" 
              android_material_icon_name="schedule" 
              size={24} 
              color={theme.dark ? colors.secondary : colors.primary}
            />
            <Text style={[styles.infoText, { color: theme.dark ? '#ffffff' : colors.text }]}>
              Take your time - no time limit!
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="star.fill" 
              android_material_icon_name="star" 
              size={24} 
              color={theme.dark ? colors.accent : colors.accent}
            />
            <Text style={[styles.infoText, { color: theme.dark ? '#ffffff' : colors.text }]}>
              Learn about lace types, installation, and maintenance
            </Text>
          </View>
        </View>

        <View style={[styles.rankCard, { backgroundColor: theme.dark ? '#2a2a2a' : colors.highlight }]}>
          <Text style={[styles.rankTitle, { color: theme.dark ? '#ffffff' : colors.text }]}>
            Ranking System
          </Text>
          <View style={styles.rankItem}>
            <Text style={styles.rankEmoji}>🌱</Text>
            <Text style={[styles.rankText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
              0-5: Wig Rookie
            </Text>
          </View>
          <View style={styles.rankItem}>
            <Text style={styles.rankEmoji}>💜</Text>
            <Text style={[styles.rankText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
              6-12: Wig Enthusiast
            </Text>
          </View>
          <View style={styles.rankItem}>
            <Text style={styles.rankEmoji}>👑</Text>
            <Text style={[styles.rankText, { color: theme.dark ? '#cccccc' : colors.textSecondary }]}>
              13-20: Lace Master
            </Text>
          </View>
        </View>
      </View>

      <Pressable 
        style={({ pressed }) => [
          styles.startButton,
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
          <Text style={styles.buttonText}>Start Quiz</Text>
          <IconSymbol 
            ios_icon_name="arrow.right" 
            android_material_icon_name="arrow-forward" 
            size={24} 
            color="#FFFFFF"
          />
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoSection: {
    width: '100%',
    marginBottom: 32,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  rankCard: {
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  rankTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '500',
  },
  startButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(128, 0, 128, 0.3)',
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
});
