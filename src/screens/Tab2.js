/* eslint-disable prettier/prettier */
// src/screens/Screen2.js

import React from 'react';
import {View, Text, Button} from 'react-native';

const Tab2 = ({navigation}) => {
    const styles = Tabstyles;
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Screen 2 Content</Text>
      <Button title='Logout' onPress={()=>{navigation.navigate('Login')}} st={styles.logout} />

    </View>
  );
};

export default Tab2;

const Tabstyles ={
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'skyblue',
      },
      headText: {
        color:'black',
        fontSize: 20,
        fontWeight: '800',
      },
}