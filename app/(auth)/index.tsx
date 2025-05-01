import {
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import Icon from '@/assets/images/icon.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setLoading(true);
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
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center px-4">
      <Image source={Icon} className="w-24 h-24 object-cover" />
      <Text className="text-4xl font-bold mb-8">Login</Text>
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        className="border border-gray-300 rounded-lg p-4 w-full mb-4"
        autoCapitalize="none"
        autoFocus={true}
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
        className="rounded-lg w-full h-16 overflow-hidden "
        onPress={onSignInPress}
      >
        <LinearGradient
          colors={['#0d9488', '#fdba74']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-white text-xl font-semibold text-center py-4">
            {loading ? (
              <ActivityIndicator size={'small'} className="text-white" />
            ) : (
              'Login'
            )}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Link className="mt-10 text-lg" href="/(auth)/register" asChild>
        <Text className="text-gray-500 underline">
          Don't have an account? Register
        </Text>
      </Link>
    </KeyboardAvoidingView>
  );
}
