/* eslint-disable prettier/prettier */
// HomeScreen.js
import React from 'react';
import {View} from 'react-native';
import Listing from '../../components/Listing';
import SnackbarC from '../../components/SnackBar';
import styles from './styles';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Listing />
      <SnackbarC />
    </View>
  );
};

export default HomeScreen;
