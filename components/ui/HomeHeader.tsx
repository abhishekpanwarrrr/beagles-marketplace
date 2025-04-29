import { View, Image, Text } from 'react-native';
import Logo from '@/assets/images/icon.png';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const HomeHeader = () => {
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Image
            source={Logo}
            style={{
              width: 90,
              height: 90,
              objectFit: 'cover',
            }}
          />
        </View>
        <View className="pr-4">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 20,
              flex: 1,
            }}
          >
            <Ionicons
              name="bag-handle-outline"
              size={34}
              color="black"
              className="border border-gray-400 py-1.5 px-2 rounded-lg"
            />
            <Ionicons
              name="notifications-outline"
              size={34}
              color="black"
              className="border border-gray-400 py-1.5 px-2 rounded-lg"
            />
          </View>
        </View>
      </View>
      <SearchBar />
      <AddressBar />
    </View>
  );
};

export default HomeHeader;

function AddressBar() {
  return (
    <View className="mt-3 px-4 py-4 rounded-md bg-gray-100 flex-row items-center gap-3">
      <FontAwesome name="map-marker" size={23} color={'#FA5A2A'} />
      <Text className="text-gray-700 text-lg ">Deliver to:</Text>
      <Text className="text-gray-900 text-xl font-bold" numberOfLines={1}>
        123 Main Street, Springfield
      </Text>
    </View>
  );
}
function SearchBar() {
  return (
    <Link href={'/(protected)/Search'}>
      <View className="relative border flex-row border-gray-300 items-center justify-between px-2 py-1 rounded-md">
        <Ionicons
          name="search-outline"
          size={32}
          color={'#6b7280'}
          style={{
            marginRight: 10,
          }}
        />
        <Text className="flex-1 text-gray-500 text-lg">Find you need</Text>
        <Ionicons name="filter-outline" size={32} color={'#6b7280'} />
      </View>
    </Link>
  );
}
