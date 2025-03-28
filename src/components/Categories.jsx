//home screen category list
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import CategoriesListing from './CategoriesListing';

const CategoryList = memo(() => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const shuffledCategories = shuffleArray([...categoryList]).slice(0, 6);
        // Take only the first 6 categories
        setCategories(shuffledCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View className="mt-1">
      <View className="mx-1 mb-2 flex flex-row items-center justify-between">
        <Text className="w-1/3 text-xl font-semibold">Categories</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          className="rounded bg-blue-500 px-3 py-2">
          <Text className="font-semibold text-white">See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          className="p-2"
          renderItem={({ item }) => <CategoriesListing {...item} />}
        />
      )}
    </View>
  );
});

export default CategoryList;
