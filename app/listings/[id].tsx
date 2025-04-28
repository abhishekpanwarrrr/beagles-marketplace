import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const ListingWithId = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ListingWithId</Text>
    </View>
  );
};

export default ListingWithId;
