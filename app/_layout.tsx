// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import 'react-native-reanimated';
// import './global.css';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import supabase from '@/services/superbase';
// import { Session } from '@supabase/supabase-js';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });
//   // const [isUserAuthenticated, setIsUserAuthenticated] = useState<
//   //   boolean | null
//   // >(null);
//   // console.log('🚀 ~ RootLayout ~ isUserAuthenticated:', isUserAuthenticated);

//   // useEffect(() => {
//   //   const { data: authListener } = supabase.auth.onAuthStateChange(
//   //     (event, session) => {
//   //       setIsUserAuthenticated(!!session); // Set user authentication status
//   //     },
//   //   );
//   //   console.log('🚀 ~ useEffect ~ authListener:', authListener.subscription.id);

//   //   // Cleanup listener when component unmounts
//   //   return () => {
//   //     authListener?.subscription?.unsubscribe();
//   //   };
//   // }, []);
//   const [session, setSession] = useState<Session | null>(null);
//   console.log('🚀 ~ RootLayout ~ session:', session?.user.id);
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);
//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, session]);

//   if (!loaded) {
//     return null;
//   }

//   if (session && session?.user?.id) {
//     return (
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="listings/[id]" options={{ headerShown: false }} />
//           <Stack.Screen name="(admin)" options={{ headerShown: false }} />
//         </Stack>
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     );
//   }
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
//         {/* <Stack.Screen name="splash" options={{ headerShown: false }} />
//         <Stack.Screen name="onboarding" options={{ headerShown: false }} /> */}
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
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
