/* eslint-disable prettier/prettier */
// src/LoginScreen.js

import React, {useState} from 'react';
import {View, TextInput, Button, Text,TouchableOpacity} from 'react-native';
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
        <View style={styles.container1}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.sideText}>Login to your account</Text>
        </View>
        <View style={styles.inputContainer}>
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
      </View>
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}

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
 const loginstyle =
 {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(195, 232, 47, 0.4)',
        paddingBottom:40,
      },
      container1: {
        marginRight:30,
        marginBottom:75
      },
      welcomeText: {
        fontSize:50,
        color:'#444444',
        fontFamily:"Poppins-Medium"
      },
      sideText: {
        fontSize:20,
        fontFamily:"Poppins-Medium",
        color:"grey",
      },
      inputContainer:{
        width:320,
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
      },
      input: {
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 2,
        borderRadius: 20,
        width: '90%',
        height: 50,
        borderColor: 'grey',
        paddingBottom: 10,
        marginBottom: 10,
        fontFamily:"Poppins-Medium",
      },
      buttonContainer:{
        backgroundColor: '#444444', // Background color of the button
        padding:10,
        width:180,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#C3E82F',
        fontSize:17,
        fontFamily:"Poppins-Medium",

      },
      error: {
        color: 'red',
      },
 };