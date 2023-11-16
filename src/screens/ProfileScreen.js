/* eslint-disable prettier/prettier */
// src/screens/Tab2.js

import React from 'react';
import { View, Text, Button ,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Tab2 = ({ navigation, user }) => {
  const styles = Tabstyles;
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Welcome</Text>
      <Text style={styles.myProfileText}>My Profile:</Text>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.6)', 'rgba(255, 255, 255, 0.4)']}
        start={{ x: 0, y: 0 }} // Left side of the container
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: 'row',
          padding:15,
          borderRadius: 10,
          width: 320,
          marginTop:15,
        }}
      >
        <Text style={styles.userDetails}>Name:</Text>
        <Text style={styles.userInformation}>{user.name}</Text>
      </LinearGradient>
        <LinearGradient
        colors={['rgba(195, 232, 47, 0.6)', 'rgba(255, 255, 255, 0.4)']}
        start={{ x: 0, y: 0 }} // Left side of the container
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: 'row',
          padding:15,
          borderRadius: 10,
          width: 320,
          marginTop:15,
        }}
      >
        <Text style={styles.userDetails}>Email:</Text>
        <Text style={styles.userInformation}>{user.email}</Text>
      </LinearGradient>
 
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigation.navigate('Login');}}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Tab2);

const Tabstyles = {
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
      },
      headText: {
        fontSize:45,
        color:'#444444',
        fontFamily:"Poppins-Medium",
        marginBottom:40,
        marginTop:70,
      },
      myProfileText: {
        fontSize:20,
        color:'#9d9e9d',
        fontFamily:"Poppins-SemiBold",
        marginRight:180,
        marginTop:20,
        marginBottom:10,
      },
      userContainer: {
        flexDirection:"row",
        backgroundColor:"rgba(195, 232, 47, 0.4)",
        padding:8,
        borderRadius:10,
        width:320,
        marginTop:15,
      },
      userDetails:{
        fontSize:20,
        color:'#444444',
        fontFamily:"Poppins-SemiBold",
        marginLeft:15,
      },
      userInformation:{
        fontSize:18,
        color:'#444444',
        fontFamily:"Poppins-Medium",
        marginLeft:20,
        marginTop:2,
      },
      buttonContainer:{
        backgroundColor: '#444444', // Background color of the button
        padding:10,
        width:180,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
      },
      buttonText:{
        color: '#C3E82F',
        fontSize:17,
        fontFamily:"Poppins-Medium",

      },
};
