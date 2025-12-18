
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows } from '@/styles/commonStyles';

interface LaceFrontalEmblemProps {
  size?: number;
  style?: ViewStyle;
}

export function LaceFrontalEmblem({ size = 200, style }: LaceFrontalEmblemProps) {
  const iconSize = size * 0.65; // Icon takes 65% of container
  
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Gradient Background with Glassmorphism */}
      <LinearGradient
        colors={['#C8A2C8', '#E5B8D0', '#F7C6D0']}
        style={[styles.gradientBackground, { width: size, height: size, borderRadius: size / 2 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Glass Overlay */}
      <View style={[styles.glassOverlay, { width: size, height: size, borderRadius: size / 2 }]} />
      
      {/* Glow Effect */}
      <View style={[styles.glowRing, { width: size, height: size, borderRadius: size / 2 }]} />
      
      {/* Lace Frontal SVG Icon */}
      <View style={styles.iconContainer}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 200 200">
          <Defs>
            <SvgLinearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#D4A5A5" stopOpacity="1" />
              <Stop offset="50%" stopColor="#B76E79" stopOpacity="1" />
              <Stop offset="100%" stopColor="#C89090" stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          
          <Path
            d="M 40 80 Q 40 40, 100 30 Q 160 40, 160 80"
            stroke="url(#roseGold)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <Path
            d="M 40 80 Q 35 100, 35 120 Q 35 140, 40 160"
            stroke="url(#roseGold)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <Path
            d="M 160 80 Q 165 100, 165 120 Q 165 140, 160 160"
            stroke="url(#roseGold)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <Path
            d="M 40 160 Q 60 175, 100 180 Q 140 175, 160 160"
            stroke="url(#roseGold)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <Path
            d="M 100 30 L 100 90"
            stroke="url(#roseGold)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          <Path
            d="M 60 50 Q 70 60, 80 70"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 50 70 Q 60 80, 70 90"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 45 95 Q 55 105, 65 115"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 140 50 Q 130 60, 120 70"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 150 70 Q 140 80, 130 90"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 155 95 Q 145 105, 135 115"
            stroke="url(#roseGold)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <Path
            d="M 70 60 Q 75 75, 70 90"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 85 55 Q 90 70, 85 85"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 115 55 Q 110 70, 115 85"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 130 60 Q 125 75, 130 90"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 60 140 Q 65 155, 60 170"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 80 145 Q 85 160, 80 172"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 120 145 Q 115 160, 120 172"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Path
            d="M 140 140 Q 135 155, 140 170"
            stroke="url(#roseGold)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          <Circle cx="55" cy="60" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          <Circle cx="65" cy="75" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          <Circle cx="75" cy="95" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          <Circle cx="145" cy="60" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          <Circle cx="135" cy="75" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          <Circle cx="125" cy="95" r="1.5" fill="url(#roseGold)" opacity="0.7" />
          
          <Circle cx="100" cy="100" r="2" fill="url(#roseGold)" opacity="0.6" />
          <Circle cx="90" cy="110" r="1.5" fill="url(#roseGold)" opacity="0.6" />
          <Circle cx="110" cy="110" r="1.5" fill="url(#roseGold)" opacity="0.6" />
        </Svg>
      </View>
      
      <View style={[styles.glossyReflection, { width: size * 0.4, height: size * 0.3, borderRadius: size / 4 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    ...shadows.medium,
  },
  glassOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  glowRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(183, 110, 121, 0.3)',
    boxShadow: '0px 0px 30px rgba(183, 110, 121, 0.5)',
    elevation: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  glossyReflection: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: [{ rotate: '-25deg' }],
    zIndex: 11,
  },
});
