import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const SearchPage = () => {
  return (
    <ScrollView className="flex-1 px-4 pt-5">
      {/* Suggestions */}
      <View className="">
        <Text className="text-xl font-semibold text-dark mb-5 ml-5">
          Popular Searches
        </Text>
        <View className="flex-row gap-4 flex-wrap ">
          <Text className="border border-gray-300 px-5 py-3 text-lg capitalize rounded-md">
            fossil watch
          </Text>
          <Text className="border border-gray-300 px-5 py-3 text-lg capitalize rounded-md">
            iphone 14 pro
          </Text>
          <Text className="border border-gray-300 px-5 py-3 text-lg capitalize rounded-md">
            Gaming Chair
          </Text>
          <Text className="border border-gray-300 px-5 py-3 text-lg capitalize rounded-md">
            New balance
          </Text>
        </View>
      </View>
      {/* Recommended Items */}
      <View className="mt-6 mb-10">
        <Text className="text-xl font-semibold text-dark mb-5 ml-5">
          Recommended for you
        </Text>
        <View className="flex-row items-center gap-2 flex-wrap">
          <View className="flex-col border border-gray-300 rounded-md w-[49%] mb-4 shadow">
            <View className="w-full h-48">
              <Image
                source={{
                  uri: data?.images[0],
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View className="mt-3 px-4 py-4">
              <Text
                numberOfLines={2}
                className="font-semibold text-xl text-text"
              >
                {data?.title}
              </Text>
              <Text className="text-error text-lg font-medium">
                र {data?.price}
              </Text>
              <View className="flex-row justify-between">
                <View className="flex-row items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    {data.rating}
                  </Text>
                </View>
                <View className="flex-row border-b border-gray-100 pb-2">
                  <Text className="text-base font-semibold text-gray-700 w-1/3 mr-3">
                    Stock
                  </Text>
                  <Text className="text-base text-gray-700 flex-1">
                    {data.stock}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-col border border-gray-300 w-[49%] rounded-md shadow">
            <View className="w-full h-48">
              <Image
                source={{
                  uri: data?.images[0],
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View className="mt-3 px-4 py-4">
              <Text
                numberOfLines={2}
                className="font-semibold text-xl text-text"
              >
                {data?.title}
              </Text>
              <Text className="text-error text-lg font-medium">
                र {data?.price}
              </Text>
              <View className="flex-row justify-between">
                <View className="flex-row items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    {data.rating}
                  </Text>
                </View>
                <View className="flex-row border-b border-gray-100 pb-2">
                  <Text className="text-base font-semibold text-gray-700 w-1/3 mr-3">
                    Stock
                  </Text>
                  <Text className="text-base text-gray-700 flex-1">
                    {data.stock}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-col border border-gray-300 w-[49%] rounded-md shadow">
            <View className="w-full h-48">
              <Image
                source={{
                  uri: data?.images[0],
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View className="mt-3 px-4 py-4">
              <Text
                numberOfLines={2}
                className="font-semibold text-xl text-text"
              >
                {data?.title}
              </Text>
              <Text className="text-error text-lg font-medium">
                र {data?.price}
              </Text>
              <View className="flex-row justify-between">
                <View className="flex-row items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    {data.rating}
                  </Text>
                </View>
                <View className="flex-row border-b border-gray-100 pb-2">
                  <Text className="text-base font-semibold text-gray-700 w-1/3 mr-3">
                    Stock
                  </Text>
                  <Text className="text-base text-gray-700 flex-1">
                    {data.stock}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchPage;

const data = {
  docId: '2mUtfHNr6V0QesouuSIA',
  weight: 2,
  rating: 2.74,
  returnPolicy: '90 days return policy',
  id: 22,
  stock: 40,
  meta: {
    barcode: '7957222289508',
    updatedAt: '2024-05-23T08:56:21.620Z',
    qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
    createdAt: '2024-05-23T08:56:21.620Z',
  },
  thumbnail:
    'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png',
  discountPercentage: 18.15,
  tags: ['pet supplies', 'dog food'],
  dimensions: {
    height: 29.77,
    depth: 20.54,
    width: 29.39,
  },
  reviews: [
    {
      rating: 5,
      date: '2024-05-23T08:56:21.620Z',
      reviewerEmail: 'leo.rivera@x.dummyjson.com',
      comment: 'Highly impressed!',
      reviewerName: 'Leo Rivera',
    },
    {
      date: '2024-05-23T08:56:21.620Z',
      reviewerName: 'Alexander Jones',
      reviewerEmail: 'alexander.jones@x.dummyjson.com',
      rating: 4,
      comment: 'Highly recommended!',
    },
    {
      reviewerName: 'Addison Wright',
      reviewerEmail: 'addison.wright@x.dummyjson.com',
      comment: 'Would buy again!',
      rating: 4,
      date: '2024-05-23T08:56:21.620Z',
    },
  ],
  category: {
    groceries: 'https://dummyjson.com/image/150',
  },
  title: 'Dog Food',
  images: [
    'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png',
  ],
  description:
    'Specially formulated dog food designed to provide essential nutrients for your canine companion.',
  minimumOrderQuantity: 29,
  sku: 'A6QRCH37',
  shippingInformation: 'Ships in 1 month',
  price: 10.99,
  warrantyInformation: '1 year warranty',
  availabilityStatus: 'In Stock',
};
