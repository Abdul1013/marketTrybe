import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const ListingCard = ({ product, btnName }) => {
  return (
    <Card className="m-2 overflow-hidden rounded-xl shadow-md">
      {/* Product Image */}
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          className="h-40 w-full"
          resizeMode="cover"
          progressiveRenderingEnabled
          fadeDuration={300}
        />
      ) : (
        <View className="h-40 w-full items-center justify-center bg-gray-200">
          <Text className="text-gray-500">No Image</Text>
        </View>
      )}

      <Card.Content>
        {/* Product Name */}
        <Text className="text-lg font-semibold" numberOfLines={1}>
          {product.name }
        </Text>

        {/* Product Price */}
        <Text className="mt-1 text-base font-bold text-blue-600">
          ₦{product.price?.toLocaleString() }
        </Text>

        {/* Seller Info */}
        {/* {product.seller && (
          <Text className="mt-1 text-sm text-gray-600">{product.seller.name || 'Unknown Seller'}</Text>
        )} */}
      </Card.Content>

      {/* Action Button */}
      <Card.Actions className="mt-2 mx-auto flex items-center justify-center">
        <Button
          mode="contained"
          labelStyle={{ fontSize: 16 }}
          buttonColor="#2563eb"
          className="w-full px-2"
        >
          {btnName}
        </Button>
      </Card.Actions>
    </Card>
  );
};



export default ListingCard;
