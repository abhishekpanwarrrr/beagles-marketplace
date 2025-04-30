import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Product } from '@/types';
import { useRouter } from 'expo-router';
interface ProductItemProps {
  item: Product;
}
const ProductItem: FC<ProductItemProps> = ({ item }) => {
  const router = useRouter();

  return (
    <View className="bg-white rounded-2xl shadow-lg mx-2 mb-4 overflow-hidden w-72">
      <View className="h-40 w-full">
        {item?.images && (
          <Image
            source={{ uri: item?.images[0] }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        )}
      </View>

      <View className="p-4">
        <View>
          <Text
            className="text-lg font-semibold text-gray-800 mb-1"
            numberOfLines={1}
          >
            {item?.title}
          </Text>

          <Text className="text-error font-bold text-xl mb-3">
            र {item?.price}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="bg-error py-2 px-4 rounded-lg shadow-sm self-start">
            <Text className="text-white text-sm font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/(protected)/product/${item?.id}`)}
            className="bg-dark py-2 px-4 rounded-lg shadow-sm self-end"
          >
            <Text className="text-white text-sm font-semibold">View more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
