import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

const ProtectedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // Show loading state while auth state is being determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="search" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="checkout" />
    </Stack>
  );
};

export default ProtectedLayout;
