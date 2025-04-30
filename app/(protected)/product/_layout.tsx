import React from 'react';
import { Stack } from 'expo-router';

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Product Details',
      }}
    />
  );
};

export default ProductLayout;
