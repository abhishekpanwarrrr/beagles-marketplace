import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Slot, Stack } from 'expo-router';

const ProtectedLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
      ``
    </Stack>
  );
};

export default ProtectedLayout;
