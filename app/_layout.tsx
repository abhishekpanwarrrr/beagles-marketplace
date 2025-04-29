import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
        <StatusBar style="auto" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function InitialLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLoaded } = useAuth();
  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);
  return <Slot />;
}
