import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import avatar from '../../../assets/images/avatar.png';
import { useState } from 'react';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

const Profile = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [edit, setEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  console.log('🚀 ~ Profile ~ user:', JSON.stringify(user, null, 2));
  console.log('🚀 ~ Profile ~ isLoaded:', isLoaded);
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onUpdateUser = async () => {
    if (!firstName || !lastName || !username) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      await user?.update({
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to update user');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onCaptureImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };
  return (
    <SafeAreaView className="flex-1 px-5 py-10">
      <ScrollView className="flex-1">
        <View className="border border-gray-300 rounded-lg p-3 gap-4">
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 15,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                position: 'relative',
              }}
            >
              {user?.imageUrl && (
                <Image
                  source={{ uri: user?.imageUrl ?? avatar }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 100,
                  }}
                />
              )}
              <TouchableOpacity
                onPress={onCaptureImage}
                className="bg-black p-1 rounded-full absolute bottom-0 -left-2 z-10"
              >
                <Ionicons name="camera-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                gap: 3,
                flex: 1,
              }}
            >
              <Text className="font-semibold text-base">
                {user?.firstName ?? 'John doe'}
              </Text>
              <Text>{user?.username ?? '@johndoe'}</Text>
              <Text className="text-gray-500 text-sm capitalize">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={edit}
            onPress={() => setEdit(true)}
            className={` max-w-[200] rounded-3xl ${edit ? 'bg-gray-400' : 'bg-black'}`}
          >
            <View className="flex flex-row items-center gap-4 px-6 py-2">
              <Text className="text-white text-center text-lg">
                {' '}
                Manage profile
              </Text>
              <Feather name="edit" color={'#fff'} size={20} />
            </View>
          </TouchableOpacity>
        </View>
        {edit && (
          <View className="mt-5 gap-3">
            <TextInput
              className="h-12 border border-gray-300 pl-2 rounded-md"
              placeholder="Update first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              className="h-12 border border-gray-300 pl-2 rounded-md"
              placeholder="Update last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              className="h-12 border border-gray-300 pl-2 rounded-md"
              placeholder="Update last name"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TouchableOpacity
              onPress={onUpdateUser}
              className="bg-black py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-xl text-center">
                {loading ? (
                  <ActivityIndicator size={'small'} color={'#ffffff'} />
                ) : (
                  'Update profile'
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEdit(false)}
              className="bg-gray-300 py-3 rounded-lg cursor-pointer"
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
