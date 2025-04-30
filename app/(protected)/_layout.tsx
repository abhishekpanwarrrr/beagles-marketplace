import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

const ProtectedLayout = () => {
  const { isSignedIn } = useAuth();

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
      <Stack.Screen name="/(protected)/product/[id]" />
      <Stack.Screen name="/search" />
      <Stack.Screen name="/cart" />
      <Stack.Screen name="/checkout" />
    </Stack>
  );
};

export default ProtectedLayout;
