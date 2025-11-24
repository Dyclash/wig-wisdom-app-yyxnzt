
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// 🎨 Luxurious Feminine Color Palette
export const colors = {
  // Primary Colors
  lavender: '#C8A2C8',
  blushPink: '#F7C6D0',
  roseGold: '#B76E79',
  softPlum: '#9A4E88',
  cream: '#FFF3EC',
  
  // Glass Effects
  glassWhite: 'rgba(255, 255, 255, 0.25)',
  glassPink: 'rgba(247, 198, 208, 0.3)',
  glassLavender: 'rgba(200, 162, 200, 0.3)',
  glassPlum: 'rgba(154, 78, 136, 0.2)',
  
  // Semantic Colors
  background: '#FFF3EC',      // Cream
  backgroundDark: '#2A1A2E',  // Deep plum for dark mode
  text: '#4A2C4A',            // Deep purple-brown
  textSecondary: '#8B6B8B',   // Muted purple
  textLight: '#FFFFFF',
  
  // UI Elements
  primary: '#9A4E88',         // Soft Plum
  secondary: '#C8A2C8',       // Lavender
  accent: '#B76E79',          // Rose Gold
  highlight: '#F7C6D0',       // Blush Pink
  card: '#FFFFFF',
  
  // Status Colors
  success: '#A8D5BA',         // Soft mint
  error: '#E8A0A0',           // Soft coral
  warning: '#F4D4A8',         // Soft peach
};

// 🌟 Glassmorphism Styles
export const glassStyles = StyleSheet.create({
  glassCard: {
    backgroundColor: colors.glassWhite,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0px 8px 32px rgba(154, 78, 136, 0.15)',
    elevation: 8,
  },
  glassPinkCard: {
    backgroundColor: colors.glassPink,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(247, 198, 208, 0.5)',
    boxShadow: '0px 8px 32px rgba(247, 198, 208, 0.2)',
    elevation: 8,
  },
  glassLavenderCard: {
    backgroundColor: colors.glassLavender,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 200, 0.5)',
    boxShadow: '0px 8px 32px rgba(200, 162, 200, 0.2)',
    elevation: 8,
  },
  glassButton: {
    backgroundColor: colors.glassWhite,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0px 4px 16px rgba(154, 78, 136, 0.12)',
    elevation: 6,
  },
  glowEffect: {
    boxShadow: '0px 0px 20px rgba(183, 110, 121, 0.4)',
    elevation: 10,
  },
});

// ✨ Gradient Definitions
export const gradients = {
  lavenderPink: [colors.lavender, colors.blushPink],
  plumRose: [colors.softPlum, colors.roseGold],
  roseGoldShimmer: [colors.roseGold, '#D4A5A5', colors.roseGold],
  creamLavender: [colors.cream, colors.lavender],
  pinkGlow: [colors.blushPink, colors.lavender, colors.softPlum],
};

// 💫 Shadow Styles
export const shadows = {
  soft: {
    boxShadow: '0px 4px 12px rgba(154, 78, 136, 0.1)',
    elevation: 4,
  },
  medium: {
    boxShadow: '0px 8px 24px rgba(154, 78, 136, 0.15)',
    elevation: 6,
  },
  strong: {
    boxShadow: '0px 12px 32px rgba(154, 78, 136, 0.2)',
    elevation: 8,
  },
  glow: {
    boxShadow: '0px 0px 24px rgba(183, 110, 121, 0.35)',
    elevation: 10,
  },
};

// 🎨 Button Styles
export const buttonStyles = StyleSheet.create({
  primaryButton: {
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.medium,
  },
  secondaryButton: {
    borderRadius: 24,
    backgroundColor: colors.glassWhite,
    borderWidth: 2,
    borderColor: colors.lavender,
    ...shadows.soft,
  },
  glassButton: {
    borderRadius: 20,
    backgroundColor: colors.glassWhite,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...shadows.soft,
  },
});

// 📐 Common Styles
export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    ...shadows.soft,
  },
  glassCard: {
    backgroundColor: colors.glassWhite,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    padding: 20,
    marginVertical: 8,
    width: '100%',
    ...shadows.medium,
  },
});

// 🌊 Wave Pattern (for decorative elements)
export const wavePattern = {
  borderTopLeftRadius: 100,
  borderTopRightRadius: 80,
  borderBottomLeftRadius: 90,
  borderBottomRightRadius: 110,
};

// 💎 Typography
export const typography = {
  heading1: {
    fontSize: 36,
    fontWeight: '800' as const,
    letterSpacing: -1,
    color: colors.text,
  },
  heading2: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
    color: colors.text,
  },
  heading3: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.textSecondary,
  },
  elegant: {
    fontSize: 24,
    fontWeight: '300' as const,
    fontStyle: 'italic' as const,
    letterSpacing: 1,
    color: colors.softPlum,
  },
};
