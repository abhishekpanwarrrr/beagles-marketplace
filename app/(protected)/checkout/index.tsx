import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CheckOut = () => {
  const router = useRouter();
  return (
    <View className="flex-1 pt-3 bg-white">
      <View className="border border-gray-300 p-3 mx-3 rounded-md">
        <View className="flex-row gap-3 items-center">
          <Ionicons name="location-outline" size={20} color="red" />
          <Text className="text-lg font-semibold">Shipping Address</Text>
        </View>
        <TouchableOpacity className="mt-5  border border-gray-300 px-3 rounded-md">
          <Text className="text-error bg-red-50 max-w-[70] text-base items-center px-4 py-1 rounded-lg mt-2">
            Home
          </Text>
          <View className="flex-row items-center pt-2">
            <View className="w-[90%]">
              <View className="flex-row items-center gap-4">
                <Text className="text-sm mb-2">
                  JI. Rose No. 123 Block A, Cipete Sub District, Cilandak
                  District, South Jakarta City, DKI Jakarta 12410 Indonesia
                </Text>
                <Ionicons name="chevron-forward" size={24} color={'black'} />
              </View>
              <View className="border-t border-gray-200 py-2 flex-col gap-1">
                <Text className="text-lg font-bold text-orange-500">
                  Abhishek Panwar
                </Text>
                <View className="flex-row items-center gap-5">
                  <Feather name="phone" color={'green'} size={14} />
                  <Text className="text-gray-700 text-base font-semibold">
                    +91 9991237576
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ExtraInfo />
      {/* Checkout button */}
      <View className="absolute bottom-4 left-0 right-0 p-4 shadow-md flex-row justify-between items-center  bg-white border-t border-gray-200">
        <View className="flex-1">
          <Text className="text-gray-500">Total:- </Text>
          <Text className="font-bold text-error text-xl">INR 1,50,000</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="bg-teal-500 py-4 flex-1 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOut;

function ExtraInfo() {
  return (
    <View className="p-3 mx-3 flex-col gap-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-text font-semibold mr-6">Note:-</Text>
        <TextInput
          placeholder="Type any message..."
          className="border flex-1 px-2 py-2 rounded-md border-gray-300"
          autoCapitalize="none"
          numberOfLines={1}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-text font-semibold mr-6">
          Subtotal, 1 items
        </Text>
        <Text className="font-bold text-error text-xl">INR 1,50,000</Text>
      </View>
    </View>
  );
}
