// HomeScreen.js
import React, {useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import Listing from '../../components/ListingComponent/Listing';
import SnackbarC from '../../components/SnackBarComponent/SnackBar';
import styles from './styles';
const HomeScreen = ({navigation}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Listing navigation={navigation} />
      <SnackbarC />
    </View>
  );
};

export default HomeScreen;
