import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProductCategories } from '@/api/products';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Categories = () => {
  const [categories, setCategories] = useState<
    { name: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const result = await getProductCategories();
        const transformed = result.map((item: Record<string, string>) => {
          const key = Object.keys(item)[0];
          return { name: key, image: item[key] };
        });
        const unique = Array.from(
          new Map(transformed.map((item) => [item.name, item])).values(),
        );
        setCategories(unique);
      } catch (error) {
        Alert.alert(JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <View className="w-full">
      {loading ? (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" gap={20}>
            {[1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
              <SkeletonPlaceholder.Item key={index} flexDirection="column">
                <SkeletonPlaceholder.Item
                  width={80}
                  height={80}
                  borderRadius={5}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item width={60} height={15} />
              </SkeletonPlaceholder.Item>
            ))}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <ScrollView
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerClassName="flex-row gap-8 items-center py-2"
        >
          {categories?.map((category) => (
            <View
              key={category.name}
              className="h-auto items-center justify-center"
            >
              <Image
                source={{ uri: category.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <Text className="text-md font-semibold text-gray-700 capitalize text-center">
                {category.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;
