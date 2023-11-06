/* eslint-disable prettier/prettier */
// HomeScreen.js
import React from 'react';
import {View, Text, Button} from 'react-native';
const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text style={{color:'black'}}>Home Screen</Text>
      <Button title='hi' onPress={()=>{navigation.navigate('Login')}} />
    </View>
  );
};

export default HomeScreen;