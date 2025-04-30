import React from 'react';
import { Slot, Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Checkout',
        }}
      />
    </Stack>
  );
};

export default Layout;
