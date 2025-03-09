import React from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView, Text, Image } from 'react-native';
import ListingCard from '../components/ListingCard';
import USerProfile from '../components/UserProfile';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { listings } from '../data/dummyData'; // Import your product data
import FastImage from 'react-native-fast-image';

export default function ShopScreen() {
  const navigation = useNavigation();
  // const screenHeight = Dimensions.get('window');

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Add style={{ marginBottom: 20 }} here */}
      {/* Header */}
      <View className="my-4 flex-row items-center justify-between px-2">
        <BackButton screenName="ListingDetails" />
        <Text className="text-xl font-extrabold">Seller's Profile</Text>
        <USerProfile />
      </View>
      <ScrollView className="mb-3 flex-col" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4 px-1">
          {/* Seller Profile Image */}
          <View className="overflow-hidden rounded-lg">
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
              }}
              style={{ width: 130, height: 130 }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View className="w-full flex-col gap-6">
            <View>
              <Text className="text-sm font-bold">Demilade Femi</Text>
              <Text className="text-xs text-gray-600">Name</Text>
            </View>
            <View>
              <Text className="mt-2 text-sm font-bold">2025</Text>
              <Text className="text-xs text-gray-600">Year Created</Text>
            </View>
            <View className="flex-col">
              <Text className="mt-2 text-sm font-bold" style={{ width: '60%' }}>
                Hostelite, Block C, Enterprise
              </Text>
              <Text className="text-xs text-gray-600">Location</Text>
            </View>
          </View>
        </View>

        {/* Shop Title */}
        <Text className="mt-4 text-center text-lg font-semibold">Demilade’s Shop</Text>

        {/* Product List */}
        <View className=" mt-4  px-4 flex-row flex-wrap justify-between">
          {/* Add mb-20 to the class name here */}
          {listings.map((product) => (
            <View key={product.id} className="mb-4 w-[48%]">
              <TouchableOpacity onPress={() => navigation.navigate('ListingDetails')}>
                <ListingCard {...product} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
