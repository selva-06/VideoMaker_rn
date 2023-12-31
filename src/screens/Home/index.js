// HomeScreen.js
import React, {useEffect, useRef} from 'react';
import {View, BackHandler, ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Listing from '../../components/ListingComponent/Listing';
import SnackbarC from '../../components/SnackBarComponent/SnackBar';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const handleBackButton = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp(); // Exit the app
      return true;
    }
    return false; // Allow default back navigation for other screens
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <Listing navigation={navigation} />
      <SnackbarC />
    </View>
  );
};

export default HomeScreen;
