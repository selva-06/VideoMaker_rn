/* eslint-disable prettier/prettier */
// HomeScreen.js
import React from 'react';
import { useState } from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
import Listing from '../components/Listing';

const HomeScreen = ({navigation}) => {

  const styles = homestyles;

  return (
    <View style={styles.container}>
      <Listing />
    </View>
  );
};

export default HomeScreen;
const { width, height } = Dimensions.get('window');

const homestyles =
 {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
      },
      
    };
