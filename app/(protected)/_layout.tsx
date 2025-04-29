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
        headerShown: true,
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/(protected)/product/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/Search"
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="/Cart" />
    </Stack>
  );
};

export default ProtectedLayout;
