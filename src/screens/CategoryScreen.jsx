import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoriesListing from '../components/CategoriesListing';
import CustomHeader from '../components/CustomHeader';
import { categories } from '../data/dummyData';

export default function CategoryScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="MainTabs" title="All Available Category" />

      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
        keyExtractor={(item) => item.id}
        className="mb-2 px-3 py-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductList', { category: item.name })}>
            <CategoriesListing {...item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
