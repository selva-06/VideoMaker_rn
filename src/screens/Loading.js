/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('HIAPPLOAD', token);
        const initialRoute = token ? 'MainTab' : 'Login';//        const initialRoute = token ? 'Home' : 'Login';

        navigation.navigate(initialRoute);
      } catch (error) {
        console.error('Error retrieving token:', error);
        navigation.navigate('Login');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
});

export default LoadingScreen;
