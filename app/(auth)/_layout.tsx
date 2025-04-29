import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(protected)/(tabs)'} />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
};
export default AuthLayout;
