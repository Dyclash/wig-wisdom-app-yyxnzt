
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)", // Ensure any route can link back to `/`
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(128, 0, 128)", // Purple
      background: "rgb(248, 248, 255)", // Almost White Lavender
      card: "rgb(255, 255, 255)", // White
      text: "rgb(51, 51, 51)", // Dark Gray
      border: "rgb(230, 230, 250)", // Lavender
      notification: "rgb(255, 215, 0)", // Gold
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(218, 112, 214)", // Orchid
      background: "rgb(26, 26, 26)", // Dark background
      card: "rgb(42, 42, 42)", // Dark card
      text: "rgb(255, 255, 255)", // White text
      border: "rgb(68, 68, 68)", // Dark border
      notification: "rgb(255, 215, 0)", // Gold
    },
  };
  return (
    <>
      <StatusBar style="auto" animated />
        <ThemeProvider
          value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
        >
          <WidgetProvider>
            <GestureHandlerRootView>
            <Stack>
              {/* Main app with tabs */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              {/* Quiz Screens */}
              <Stack.Screen
                name="quiz"
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="results"
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />

              {/* Modal Demo Screens */}
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  title: "Standard Modal",
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                  title: "Form Sheet Modal",
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [0.5, 0.8, 1.0],
                  sheetCornerRadius: 20,
                }}
              />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  headerShown: false,
                }}
              />
            </Stack>
            <SystemBars style={"auto"} />
            </GestureHandlerRootView>
          </WidgetProvider>
        </ThemeProvider>
    </>
  );
}
