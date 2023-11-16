/* eslint-disable prettier/prettier */
// src/screens/Tab2.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

const Tab2 = ({ navigation, user }) => {
  const styles = Tabstyles;
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Screen 2 Content</Text>
      {user && <Text style={styles.text}>Welcome, {user.name}</Text>}
      <Button title = "Logout" onPress={() => { navigation.navigate('Login');}} />
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
        color:'black',
        fontSize: 20,
        fontWeight: '800',
      },
      text: {
        color:'black',
        fontSize: 14,
        fontWeight: '800',
      },
};
