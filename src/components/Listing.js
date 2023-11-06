/* eslint-disable prettier/prettier */
// Listing.js
import React from 'react';
import { View, FlatList, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ListData } from '../assets/data/Data';

const Listing = () => {
  const data = ListData;
  const windowWidth = Dimensions.get('window').width;

  // Calculate the image size based on window width
  const imageSize = (windowWidth - 50) / 2; // Adjust margin and padding as needed

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={item.source} style={[styles.image, { width: imageSize }]} resizeMode="cover" />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  image: {
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default Listing;
