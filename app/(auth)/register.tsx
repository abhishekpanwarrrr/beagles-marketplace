import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import Icon from '@/assets/images/icon.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!email || !password) {
      Alert.alert('Enter all required fields');
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.log('err', JSON.stringify(err, null, 2));

      Alert.alert(err?.errors[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    if (!code) {
      return Alert.alert('Enter the code first');
    }
    setLoading(true);
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
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.longMessage);
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Your Email
        </Text>
        <Text className="text-base text-gray-600 mb-6 text-center">
          Enter the verification code we sent to your email address.
        </Text>

        <TextInput
          value={code}
          placeholder="Verification Code"
          onChangeText={(code) => setCode(code)}
          keyboardType="number-pad"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg mb-6 bg-gray-50"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity
          // onPress={onVerifyPress}
          className="w-full rounded-xl h-16"
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#fdba74', '#0d9488']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text className="py-4 text-white">
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                'Verify'
              )}
            </Text>
          </LinearGradient>
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
        className="w-full h-16"
        disabled={loading}
        onPress={onSignUpPress}
      >
        <LinearGradient
          colors={['#fdba74', '#0d9488']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className="py-4 text-white">
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'Register'
            )}
          </Text>
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
