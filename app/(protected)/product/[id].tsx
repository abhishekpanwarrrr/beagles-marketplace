import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductById } from '@/api/products';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  useEffect(() => {
    async function fetchData() {
      const data = await getProductById(id as string);
      console.log('Product Detail:', data);
      //   @ts-ignore
      setProduct(data);
    }
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Ahh something went wrong</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Product Title and Price */}
        <View className="mb-5">
          <Text className="text-3xl font-bold text-gray-900">
            {product.title}
          </Text>
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-2xl text-green-600 font-bold">
              ${product.price}
            </Text>
            <View className="flex-row items-center bg-yellow-50 px-3 py-1 rounded-full">
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text className="text-sm font-medium text-gray-700 ml-1">
                {product.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* Product Image */}
        <View className="w-full h-80 rounded-2xl overflow-hidden mb-8 bg-gray-50 shadow-md">
          <Image
            source={{ uri: product.images[0] }}
            alt={product.title}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>

        {/* Description */}
        <View className="mb-8 bg-gray-50 p-5 rounded-xl">
          <Text className="text-xl font-bold mb-3 text-gray-900">
            Description
          </Text>
          <Text className="text-base leading-6 text-gray-700">
            {product.description}
          </Text>
        </View>

        {/* Product Info */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4 text-gray-900">
            Product Details
          </Text>
          <View className="space-y-3 bg-white border border-gray-50 rounded-xl p-4 shadow-sm">
            <View className="flex-row border-b border-gray-100 pb-2">
              <Text className="text-base font-semibold text-gray-700 w-1/3">
                Brand
              </Text>
              <Text className="text-base text-gray-700 flex-1">
                {product.brand}
              </Text>
            </View>
            <View className="flex-row border-b border-gray-100 pb-2">
              <Text className="text-base font-semibold text-gray-700 w-1/3">
                Category
              </Text>
              <Text className="text-base text-gray-700 flex-1">
                {/* {product.category} */}
              </Text>
            </View>
            <View className="flex-row border-b border-gray-100 pb-2">
              <Text className="text-base font-semibold text-gray-700 w-1/3">
                Stock
              </Text>
              <Text className="text-base text-gray-700 flex-1">
                {product.stock}
              </Text>
            </View>
            <View className="flex-row border-b border-gray-100 pb-2">
              <Text className="text-base font-semibold text-gray-700 w-1/3">
                Warranty
              </Text>
              <Text className="text-base text-gray-700 flex-1">
                {product.warrantyInformation}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-base font-semibold text-gray-700 w-1/3">
                Shipping
              </Text>
              <Text className="text-base text-gray-700 flex-1">
                {product.shippingInformation}
              </Text>
            </View>
          </View>
        </View>

        {/* Tags */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-3 text-gray-900">Tags</Text>
          <View className="flex-row flex-wrap gap-2">
            {product?.tags?.map((tag, index) => (
              <Text
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm font-medium"
              >
                {tag}
              </Text>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View className="mb-20">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Customer Reviews
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-green-600">
                Write a Review
              </Text>
            </TouchableOpacity>
          </View>

          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <View
                key={index}
                className="mb-4 p-5 bg-gray-50 rounded-xl border border-gray-100"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-gray-800">
                    {review.reviewerName}
                  </Text>
                  <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text className="text-xs font-medium text-gray-700 ml-1">
                      {review.rating}
                    </Text>
                  </View>
                </View>
                <Text className="text-base text-gray-700 leading-6 mt-1">
                  {review.comment}
                </Text>
              </View>
            ))
          ) : (
            <View className="p-6 bg-gray-50 rounded-xl items-center justify-center">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={40}
                color="#9CA3AF"
              />
              <Text className="text-base text-gray-500 mt-2 text-center">
                No reviews yet. Be the first to review!
              </Text>
            </View>
          )}
        </View>

        {/* Add to Cart Button - Fixed at bottom */}
        <View className="absolute bottom-0 left-0 right-0 p-4 shadow-md">
          <TouchableOpacity className="bg-teal-500 py-4 rounded-xl items-center">
            <Text className="text-white font-semibold text-lg">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
