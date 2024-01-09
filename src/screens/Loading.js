/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const initialRoute = token ? 'MainTab' : 'Login'; 

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
      <Image source={require('../assets/images/video1.png')} style={{width:130,height:130}}></Image>
      <Text style={styles.text}>VideoMaker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
});

export default LoadingScreen;
