
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

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
          {
            backgroundColor: theme.dark ? '#2a2a2a' : colors.card,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={handleGoHome}
      >
        <IconSymbol
          ios_icon_name="house.fill"
          android_material_icon_name="home"
          size={24}
          color={theme.dark ? colors.secondary : colors.primary}
        />
      </Pressable>

      {showPause && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.dark ? '#2a2a2a' : colors.card,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={handlePause}
        >
          <IconSymbol
            ios_icon_name="pause.fill"
            android_material_icon_name="pause"
            size={24}
            color={theme.dark ? colors.accent : colors.accent}
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
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
});
