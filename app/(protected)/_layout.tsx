import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Slot, Stack } from 'expo-router';
import { Text, View } from 'react-native';

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
        name="/product/[id]"
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
