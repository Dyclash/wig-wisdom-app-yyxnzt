
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, glassStyles, shadows } from '@/styles/commonStyles';

interface PageControlsProps {
  onPause?: () => void;
  showPause?: boolean;
}

export function PageControls({ onPause, showPause = true }: PageControlsProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleGoHome = () => {
    console.log('Navigating to home...');
    router.push('/(tabs)/(home)/');
  };

  const handlePause = () => {
    console.log('Pause button pressed');
    if (onPause) {
      onPause();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          glassStyles.glassButton,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={handleGoHome}
      >
        <IconSymbol
          ios_icon_name="house.fill"
          android_material_icon_name="home"
          size={22}
          color={colors.softPlum}
        />
      </Pressable>

      {showPause && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            glassStyles.glassButton,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={handlePause}
        >
          <IconSymbol
            ios_icon_name="pause.fill"
            android_material_icon_name="pause"
            size={22}
            color={colors.roseGold}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 48,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 1000,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
