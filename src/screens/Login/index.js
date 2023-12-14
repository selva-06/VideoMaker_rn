// /* eslint-disable no-shadow */
// import React, {useState} from 'react';
// import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
// import {connect} from 'react-redux';
// import {loginRequest} from '../../store/authActions';
// import Icon from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
// import {strings} from '../../util/Strings';

// const LoginScreen = ({loginRequest, error, navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [hidePassword, setHidePassword] = useState(true);

//   // const validateEmail = email => {
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   return emailRegex.test(email);
//   // };

//   const handleLogin = () => {
//     if (!email) {
//       setEmailError(strings.loginScreen.emailError.required);
//       return;
//     }
//     // } else if (!validateEmail(email)) {
//     //   setEmailError(strings.loginScreen.emailError.invalid);
//     //   return;
//     // }

//     if (!password) {
//       setPasswordError(strings.loginScreen.passwordError.requiredpwd);
//       return;
//     }

//     setEmailError('');
//     setPasswordError('');

//     loginRequest(email, password);
//   };

//   const togglePasswordVisibility = () => {
//     setHidePassword(!hidePassword);
//   };

//   const withoutsignin = () => {
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.container1}>
//         <Text style={styles.welcomeText}>
//           {strings.loginScreen.welcomeMessage}
//         </Text>
//         <Text style={styles.sideText}>{strings.loginScreen.loginMessage}</Text>
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder={strings.loginScreen.placeholderText.email}
//           value={email}
//           onChangeText={text => {
//             setEmail(text);
//             setEmailError('');
//           }}
//           autoCapitalize="none"
//           color="black"
//           placeholderTextColor="black"
//         />
//         <View style={styles.errorContainer}>
//           {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
//         </View>
//         <TextInput
//           style={styles.input}
//           placeholder={strings.loginScreen.placeholderText.password}
//           secureTextEntry={hidePassword}
//           value={password}
//           placeholderTextColor="black"
//           color="black"
//           autoCapitalize="none"
//           onChangeText={text => {
//             setPassword(text);
//             setPasswordError('');
//           }}
//         />
//         <TouchableOpacity
//           onPress={togglePasswordVisibility}
//           style={styles.password}>
//           <Icon
//             name={hidePassword ? 'eye-off' : 'eye'}
//             size={20}
//             color="black"
//             style={styles.eyepassword}
//           />
//         </TouchableOpacity>
//         <View style={styles.errorContainer}>
//           {passwordError ? (
//             <Text style={styles.error}>{passwordError}</Text>
//           ) : null}
//         </View>
//         <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
//           <Text style={styles.buttonText}>
//             {strings.loginScreen.button.loginbtn}
//           </Text>
//         </TouchableOpacity>
//         <View style={styles.errorContainer}>
//           {error && <Text style={styles.error}>{error}</Text>}
//         </View>
//         <TouchableOpacity onPress={withoutsignin}>
//           <Text style={styles.wosignin}>
//             {strings.loginScreen.button.wosignin}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   error: state.auth.error,
// });

// const mapDispatchToProps = {
//   loginRequest,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

// LoginScreen.js

// import React, {useState} from 'react';
// import {View, TextInput, Button} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {loginRequest} from '../../store/authActions';
// const LoginScreen = () => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Dispatch the loginRequest action with entered username and password
//     dispatch(loginRequest(username, password));
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={text => setUsername(text)}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry={true}
//         value={password}
//         onChangeText={text => setPassword(text)}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;

/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {loginRequest} from '../../store/authActions';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {strings} from '../../util/Strings';

const LoginScreen = ({loginRequest, error, navigation}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = () => {
    if (!username) {
      setEmailError(strings.loginScreen.emailError.required);
      return;
    }

    if (!password) {
      setPasswordError(strings.loginScreen.passwordError.requiredpwd);
      return;
    }

    setEmailError('');
    setPasswordError('');

    // Dispatch the loginRequest action with entered username and password
    loginRequest(username, password, navigation);
    setUsername('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const withoutsignin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.welcomeText}>
          {strings.loginScreen.welcomeMessage}
        </Text>
        <Text style={styles.sideText}>{strings.loginScreen.loginMessage}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={strings.loginScreen.placeholderText.email}
          value={username}
          onChangeText={text => {
            setUsername(text);
            setEmailError('');
          }}
          autoCapitalize="none"
          color="black"
          placeholderTextColor="black"
        />
        <View style={styles.errorContainer}>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>
        <TextInput
          style={styles.input}
          placeholder={strings.loginScreen.placeholderText.password}
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
            size={20}
            color="black"
            style={styles.eyepassword}
          />
        </TouchableOpacity>
        <View style={styles.errorContainer}>
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {strings.loginScreen.button.loginbtn}
          </Text>
        </TouchableOpacity>
        <View style={styles.errorContainer}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <TouchableOpacity onPress={withoutsignin}>
          <Text style={styles.wosignin}>
            {strings.loginScreen.button.wosignin}
          </Text>
        </TouchableOpacity>
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
