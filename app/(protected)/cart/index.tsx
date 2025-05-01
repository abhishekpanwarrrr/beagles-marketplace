import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

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

const Cart = () => {
  const router = useRouter();
  return (
    <View className="flex-1 px-3 pt-8 bg-white">
      <View className="p-1 rounded-lg flex-row w-full border-2 border-slate-200 relative">
        <View className="w-48 h-44">
          <Image
            source={{
              uri: data.images[0],
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View className="flex-1 px-1">
          <Text numberOfLines={1} className="text-gray-400 text-lg font-bold">
            {data?.title}
          </Text>
          <Text className="text-2xl font-semibold text-black mt-1">
            र {data?.price}
          </Text>
          <View className="mt-2 border-t border-gray-300 pt-2 flex-row items-center justify-between">
            <TouchableOpacity className="p-1">
              <Ionicons name="heart-outline" size={24} color={'black'} />
            </TouchableOpacity>
            <View className="flex-row gap-4 items-center">
              <TouchableOpacity className="p-1 border border-red-500 rounded-md">
                <Entypo name="minus" size={14} color="red" />
              </TouchableOpacity>
              <Text className="text-xl text-dark font-bold">9</Text>
              <TouchableOpacity className="p-1 border border-red-500 rounded-md">
                <Entypo name="plus" size={14} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity className="absolute top-1 left-1">
          <BouncyCheckbox
            fillColor="red"
            size={24}
            onPress={(isChecked: boolean) => {}}
          />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-4 left-0 right-0 p-4 shadow-md">
        <Link
          href={'/(protected)/checkout'}
          // onPress={() => router.push('/(protected)/checkout')}
          className="bg-teal-500 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Checkout</Text>
        </Link>
      </View>
    </View>
  );
};

export default Cart;
