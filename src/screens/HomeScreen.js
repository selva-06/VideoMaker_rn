/* eslint-disable prettier/prettier */
// HomeScreen.js
import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Listing from '../components/Listing';
const HomeScreen = ({navigation}) => {

  const styles = homestyles;

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Home Screen</Text>
      {/* <Button title='Logout' onPress={()=>{navigation.navigate('Login')}} st={styles.logout} /> */}
      <Listing />
    </View>
  );
};

export default HomeScreen;

const homestyles =
 {
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 5,
        backgroundColor: 'skyblue',
      },
      headText: {
        color:'black',
        fontSize: 20,
        fontWeight: '800',
      },
      logout: {
        color: 'green',

      },
    };