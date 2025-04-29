import { getProducts } from '@/api/products';
import Categories from '@/components/ui/Categories';
import HomeHeader from '@/components/ui/HomeHeader';
import { Product } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
