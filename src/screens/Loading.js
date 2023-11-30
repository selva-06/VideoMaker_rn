/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('HIAPPLOAD', token);
        const initialRoute = token ? 'Home' : 'Login';
        navigation.navigate(initialRoute);
      } catch (error) {
        console.error('Error retrieving token:', error);
        navigation.navigate('Login');
      }
    };

    checkToken();
  }, [navigation]);
  // axios.get('http://34.203.231.237/api/v1/assets/getUploadedFiles')
  // .then(response => {
  //   console.log('Response: API FETCH LISTING', response.data);
  // })
  // .catch(error => {
  //   console.error('Error fetching data:FETCH LISTING', error);
  // });
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
  },
});

export default LoadingScreen;
