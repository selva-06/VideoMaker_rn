/* eslint-disable prettier/prettier */
// src/screens/Tab2.js

import React from 'react';
import { View, Text, Button ,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

const Tab2 = ({ navigation, user }) => {
  const styles = Tabstyles;
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Welcome</Text>
      {user && <Text style={styles.text}>Name: {user.name}</Text>}
      {user && <Text style={styles.text}>Email: {user.email}</Text>}

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
      },
      headText: {
        fontSize:45,
        color:'#444444',
        fontFamily:"Poppins-Medium"
      },
      infoContainer: {
        
      },
      buttonContainer:{
        backgroundColor: '#444444', // Background color of the button
        padding:10,
        width:180,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      },
      buttonText:{
        color: '#C3E82F',
        fontSize:17,
        fontFamily:"Poppins-Medium",

      },
};
