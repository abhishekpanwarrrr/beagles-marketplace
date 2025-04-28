import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // Handle the submission of the sign-in form
  const { isSignedIn } = useAuth();
  console.log('🚀 ~ Login ~ isSignedIn:', isSignedIn);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(protected)/(tabs)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-4xl font-bold my-6">Login with Google</Text>
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        className="border border-gray-300 rounded-lg p-4 w-full mb-4"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        textContentType="emailAddress"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        className="border border-gray-300 rounded-lg p-4 w-full mb-4"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        textContentType="password"
        returnKeyType="done"
      />
      <TouchableOpacity
        disabled={loading}
        className="bg-teal-600 py-4 px-6 items-center rounded-lg w-full"
        onPress={onSignInPress}
      >
        <Text className="text-white text-2xl font-medium">
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <Link className="mt-10 text-lg" href="/(auth)/register" asChild>
        <Text className="text-gray-500 underline">
          Don't have an account? Register
        </Text>
      </Link>
    </View>
  );
}
