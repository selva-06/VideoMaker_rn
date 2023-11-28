// HomeScreen.js
import React from 'react';
import {View} from 'react-native';
import Listing from '../../components/ListingComponent/Listing';
import SnackbarC from '../../components/SnackBarComponent/SnackBar';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Listing navigation={navigation} />
      <SnackbarC />
    </View>
  );
};

export default HomeScreen;
