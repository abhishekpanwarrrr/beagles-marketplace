import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getProducts } from '@/api/products';
import { Product } from '@/types';

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getProducts();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);
  return (
    <SafeAreaView className="flex-1 px-4">
      {/* <FlatList
        data={products ?? []}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            className="w-full rounded-lg shadow-md p-4 flex flex-col"
          >
            <View className="w-[100%] h-40 rounded-md">
              <Image
                source={{ uri: item?.images[0] }}
                alt={item?.title}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-lg font-semibold text-gray-800">
                {item?.title}
              </Text>
              <Text className="text-lg font-bold text-green-600 mt-2">
                ${item?.price}
              </Text>
            </View>
            <TouchableOpacity
              className="mt-4 bg-teal-500 rounded-md p-4"
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <Text className="text-white text-center">View More</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-lg font-semibold">No products available</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <Text className="text-lg font-semibold">Available Products</Text>
        }
      /> */}
      <Button title="Cart" onPress={() => router.push('/(protected)/Cart')} />
      <Button
        title="Search"
        onPress={() => router.push('/(protected)/Search')}
      />
    </SafeAreaView>
  );
};

export default Home;
