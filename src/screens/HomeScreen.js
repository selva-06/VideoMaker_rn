/* eslint-disable prettier/prettier */
// HomeScreen.js
import React from 'react';
import { useState } from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
import Listing from '../components/Listing';
import Header from '../components/Header';

const HomeScreen = ({navigation}) => {
  const [showDropdowns, setShowDropdowns] = useState(false);

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };



  const styles = homestyles;

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      {/* <Button title='Logout' onPress={()=>{navigation.navigate('Login')}} st={styles.logout} /> */}
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
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
      },
      header: {
        flexDirection:"row"
      },
      attach: { width: 0.0600 * width, height: 0.0250 * height, marginTop:3, marginHorizontal:5 },
      headText: {
        color:'black',
        fontSize: 16,
        fontWeight: '300',
      },
      logout: {
        color: 'green',

      },
    };