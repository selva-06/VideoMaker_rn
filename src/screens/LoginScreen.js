/* eslint-disable prettier/prettier */
// src/LoginScreen.js

import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {connect} from 'react-redux';
import { loginRequest } from '../store/authActions';
const LoginScreen = ({loginRequest, user, error, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginRequest(email, password, navigation);
  };

  const styles= loginstyle;
  return (
    <View style={styles.container}>
        <Text style={styles.headText}>VideoMaker</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        color="black"
        placeholderTextColor="black" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        placeholderTextColor="black"
        color="black"
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
      {user && <Text style={{color:'black'}}>Welcome, {user.name}</Text>}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
 const loginstyle= 
 {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'skyblue',
      },
      headText: {
        color: 'black',
        fontSize: 30,
        marginBottom: 20,
      },
      input: {
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 10,
        borderRadius: 30,
        width: '80%',
        height: 50,
        borderColor: '#dadae8',
        paddingBottom: 10,
        marginBottom: 10,
      },
      error: {
        color: 'red',
      },
 }