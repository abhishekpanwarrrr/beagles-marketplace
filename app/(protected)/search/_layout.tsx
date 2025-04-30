import React from 'react';
import { Stack } from 'expo-router';

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Search',
          headerSearchBarOptions: {
            onChangeText: (text) => console.log('Text', text.nativeEvent.text),
          },
        }}
      />
    </Stack>
  );
};

export default SearchLayout;
