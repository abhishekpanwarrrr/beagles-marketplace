import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { TokenCache } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const tokenCache: TokenCache = {
  getToken: SecureStore.getItemAsync,
  saveToken: SecureStore.setItemAsync,
};
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
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
    console.log('Fonts and auth loaded, hiding splash screen');
    if (loaded && isLoaded) {
      // SplashScreen.hideAsync();
      SplashScreen.hideAsync().catch((e) => {
        console.error('Error hiding splash:', e);
      });
    }
  }, [loaded, isLoaded]);
  if (!isLoaded || !loaded) return null; // Ensures UI does not render too early

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}
