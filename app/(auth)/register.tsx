import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import Icon from '@/assets/images/icon.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  console.log('🚀 ~ Register ~ isLoaded:', isLoaded);
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(protected)/(tabs)');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="flex-1 justify-center items-center px-4">
      <Image source={Icon} className="w-24 h-24 object-cover" />
      <Text className="text-4xl font-bold mb-6">Register</Text>
      <TextInput
        className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={'none'}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={'none'}
        className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4"
      />

      <TouchableOpacity
        className="rounded-lg w-full h-16 overflow-hidden "
        disabled={loading}
        onPress={onSignUpPress}
      >
        <LinearGradient
          colors={['#fdba74', '#0d9488']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-white text-xl font-semibold">Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text
        className="text-blue-500 mt-5 text-center text-lg"
        onPress={() => router.push('/(auth)')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}
