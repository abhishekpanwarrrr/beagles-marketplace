// app/splash.tsx

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import supabase from '@/services/superbase'; // Import Supabase client

export default function Splash() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('inside splash screen');

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsChecking(false); // Stop checking once user state is determined
        if (session) {
          // If logged in, navigate to homepage
          router.replace('/');
        } else {
          // If not logged in, navigate to login
          router.replace('/(auth)/login');
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  if (isChecking) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return null; // We'll navigate before rendering anything else
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  text: { color: 'white', fontSize: 28, fontWeight: 'bold' },
});
