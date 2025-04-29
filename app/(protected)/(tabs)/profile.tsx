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
import { Feather, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { parseISO, format, isToday, isYesterday } from 'date-fns';

const Profile = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  console.log('🚀 ~ Profile ~ user:', user);
  const [edit, setEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      const result = await user?.update({
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
      console.log('🚀 ~ onUpdateUser ~ result:', result);
      setEdit(false);
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
      await user?.setProfileImage({
        file: base64,
      });
    }
  };
  const date = user?.lastSignInAt ? new Date(user.lastSignInAt) : null;

  console.log('date', date);
  const formattedDate = date
    ? isToday(date)
      ? 'Today'
      : isYesterday(date)
        ? 'Yesterday'
        : format(date, 'd MMM yyyy')
    : 'N/A';

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
                {user?.firstName ?? 'John'} {user?.lastName ?? 'Doe'}
              </Text>
              <Text>{user?.username ?? '@johndoe'}</Text>
              <Text className="text-gray-500 text-sm capitalize">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2 border-b border-gray-300 pb-1">
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-gray-500 font-medium text-sm">
                Last Login:
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-black font-semibold text-sm">
                  {formattedDate}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {date ? format(date, 'hh:mm a') : 'N/A'}
                </Text>
              </View>
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
        {/* Editing  */}
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

        {/* Settings Section */}
        <View className="mt-5">
          <Text className="text-lg font-semibold mb-3">Settings</Text>
          <TouchableOpacity
            onPress={() => {}}
            className="flex-row items-center justify-between border-b border-gray-300 py-3"
          >
            <Text className="text-base">Settings</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Addresses Section */}
        <View className="mt-5">
          <Text className="text-lg font-semibold mb-3">Addresses</Text>
          {user?.addresses?.map((address, index) => (
            <View
              key={index}
              className="border border-gray-300 rounded-lg p-3 mb-3"
            >
              <Text className="text-base font-medium">{address.label}</Text>
              <Text className="text-gray-500">{address.details}</Text>
              <View className="flex-row mt-3 gap-3">
                <TouchableOpacity
                  onPress={() => router.push(`/`)}
                  className="flex-1 bg-blue-500 py-2 rounded-lg"
                >
                  <Text className="text-white text-center">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Address',
                      'Are you sure you want to delete this address?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: async () => {
                            try {
                              // Replace with your custom API call or logic to delete the address
                              await fetch(`/api/addresses/${address.id}`, {
                                method: 'DELETE',
                              })
                                .then((response) => {
                                  if (!response.ok) {
                                    throw new Error('Failed to delete address');
                                  }
                                  Alert.alert('Success', 'Address deleted');
                                })
                                .catch((error) => {
                                  Alert.alert(
                                    'Error',
                                    'Unable to delete address',
                                  );
                                });
                              Alert.alert('Success', 'Address deleted');
                            } catch (error) {
                              Alert.alert('Error', 'Unable to delete address');
                            }
                          },
                        },
                      ],
                    );
                  }}
                  className="flex-1 bg-red-500 py-2 rounded-lg"
                >
                  <Text className="text-white text-center">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="bg-black py-3 rounded-3xl"
          >
            <Text className="text-white text-center">Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="flex-row items-center justify-between border px-3 bg-teal-500 border-gray-300 py-3 rounded-3xl mt-10"
        >
          <Text className="text-base text-white font-bold">Logout</Text>
          <Feather name="log-out" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
