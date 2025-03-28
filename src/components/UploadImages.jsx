//upload image used on sell screen
import * as ImagePicker from 'expo-image-picker';
import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UploadImages = memo(({ onImagesSelected }) => {
  const [images, setImages] = useState([]);

  const selectImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 5,
        quality: 1,

        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync({});
        // if (status !== 'granted') {
        //   Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload images.');
        //   return;
        // }
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
        const updatedImages = [...images, ...newImages].slice(0, 5); // Ensure max 5 images
        setImages(updatedImages);
        onImagesSelected(updatedImages); // Pass images back to parent
      }
    } catch (error) {
      console.error('Image Picker Error', error);
      Alert.alert('Error', 'Failed to select images. please try again');
    }
  };
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  return (
    <View className="mb-6 items-center">
      {/* Upload Button */}
      {images.length === 0 ? (
        <TouchableOpacity
          onPress={selectImages}
          className="h-36 w-36 items-center justify-center rounded-lg border-2 border-gray-300">
          <Text className="mt-2 text-gray-500">Upload Images</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2"
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item }}
                className="mr-3 h-36 w-36 rounded-lg"
                resizeMode="cover"
              />

              {/*remove button*/}
              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1">
                <Ionicons name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Text className="text-left text-red-500">*Please upload product photos here</Text>

      {/* Upload More Button (If Less than 5 Images) */}
      {images.length > 0 && images.length < 5 && (
        <TouchableOpacity onPress={selectImages} className="mt-2 rounded-lg bg-blue-500 px-4 py-2">
          <Text className="text-white">Add More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default UploadImages;
