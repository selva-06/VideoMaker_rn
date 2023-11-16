/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {loginRequest} from '../store/authActions';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({loginRequest, user, error, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    setEmailError('');
    setPasswordError('');

    loginRequest(email, password, navigation);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
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
        <View style={styles.inputContainer1}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={hidePassword}
            value={password}
            placeholderTextColor="black"
            color="black"
            autoCapitalize="none"
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.password}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              size={24}
              color="black"
              style={{paddingHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
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

const loginstyle = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(195, 232, 47, 0.4)',
    paddingBottom: 40,
  },
  container1: {
    marginRight: 30,
    marginBottom: 75,
  },
  welcomeText: {
    fontSize: 50,
    color: '#444444',
    fontFamily: 'Poppins-Medium',
  },
  sideText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'grey',
  },
  inputContainer: {
    width: 320,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:20,
  },
  inputContainer1: {
    width: 320,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:20,
  },
  password: {
    position: 'absolute',
    right: 20,
    top: '40%', // Adjust the vertical position of the eye icon
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
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    backgroundColor: '#444444', // Background color of the button
    padding: 10,
    width: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#C3E82F',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
  error: {
    color: 'red',
  },
};
