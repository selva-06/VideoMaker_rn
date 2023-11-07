/* eslint-disable prettier/prettier */
// src/LoginScreen.js

import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {connect} from 'react-redux';
import { loginRequest } from '../store/authActions';
const LoginScreen = ({loginRequest, user, error, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const validatePassword = (password) => {
  //   // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const handleLogin = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    // } else if (!validatePassword(password)) {
    //   setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit');
    //   return;
    // }

    // Clear any previous error messages
    setEmailError('');
    setPasswordError('');

    loginRequest(email, password, navigation);
  };

  const styles = loginstyle;
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>VideoMaker</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
        }}
        autoCapitalize="none"
        color="black"
        placeholderTextColor="black"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        placeholderTextColor="black"
        color="black"
        autoCapitalize="none"
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
        }}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
      {user && <Text style={{ color: 'black' }}>Welcome, {user.name}</Text>}
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
        backgroundColor: 'white',
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
        borderWidth: 2,
        borderRadius: 20,
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