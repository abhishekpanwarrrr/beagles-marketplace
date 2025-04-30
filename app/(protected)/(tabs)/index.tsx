import { getProducts } from '@/api/products';
import Categories from '@/components/ui/Categories';
import HomeHeader from '@/components/ui/HomeHeader';
import ProductItem from '@/components/ui/ProductItem';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Home = () => {
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
        {/* <ImageBackground
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
        </ImageBackground> */}
        <View className="mt-5">
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="text-2xl font-bold text-gray-900">
              ✨ All Products
            </Text>
            <TouchableOpacity
              onPress={() => console.log('Navigate to all products')}
            >
              <Text className="text-sm font-medium text-blue-600">See All</Text>
            </TouchableOpacity>
          </View>
          {products && products.length > 0 ? (
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={({ item }) => <ProductItem item={item} />}
            />
          ) : (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" gap={20}>
                {[1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
                  <SkeletonPlaceholder.Item key={index} flexDirection="column">
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={180}
                      borderRadius={5}
                      marginBottom={10}
                    />
                    <SkeletonPlaceholder.Item width={60} height={15} />
                  </SkeletonPlaceholder.Item>
                ))}
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
