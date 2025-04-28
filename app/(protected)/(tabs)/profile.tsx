import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-5">
      <Text>Profile</Text>
      <TouchableOpacity
        className="bg-red-300 w-full px-4 py-4 rounded-lg"
        onPress={handleSignOut}
      >
        <Text className="text-center text-white font-bold text-xl">
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
