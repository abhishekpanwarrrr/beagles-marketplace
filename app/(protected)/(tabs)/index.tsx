import { getProducts } from '@/api/products';
import Categories from '@/components/ui/Categories';
import HomeHeader from '@/components/ui/HomeHeader';
import { Product } from '@/types';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      // @ts-ignore
      setProducts(data);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 px-4">
      <HomeHeader />
      <ScrollView className="flex-1 px-1">
        <Categories />
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/5624988/pexels-photo-5624988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          className="h-48 rounded-lg flex items-center justify-center mt-5"
        >
          <TouchableOpacity className="bg-error w-48 h-16 flex items-center justify-center shadow-md rounded-md">
            <Text className="text-center text-white text-2xl font-bold">
              Shop now
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <FlatList
          data={products ?? []}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/(protected)/product/${item?.id}`}>
              <View className="w-full bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 pb-3">
                <View className="flex flex-col items-center w-full">
                  <View className="h-52 w-full mb-5">
                    {item?.images && (
                      <Image
                        className="w-full h-full object-cover"
                        source={{ uri: item?.images[0] }}
                      />
                    )}
                  </View>
                  <Text className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {item?.title}
                  </Text>
                  <Text className="text-base text-error font-semibold dark:text-gray-400">
                    $ {item?.price}
                  </Text>
                  <View className="mt-4 w-full">
                    <TouchableOpacity
                      className="px-4 py-4 items-center bg-success rounded-lg mx-4"
                      onPress={() => router.push('/Search')}
                    >
                      <Text className="text-lg font-bold text-white">
                        View more
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Link>
          )}
          ListEmptyComponent={
            <Text className="text-lg font-semibold">No products available</Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <Text className="text-3xl font-medium text-center my-6 text-dark">
              Available Products
            </Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
