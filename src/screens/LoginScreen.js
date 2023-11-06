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

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={{color:'black'}}>{error}</Text>}
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
