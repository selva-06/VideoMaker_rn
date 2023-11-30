/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // /* eslint-disable prettier/prettier */
// // // src/sagas/authSaga.js

// // import {put, takeLatest} from 'redux-saga/effects';
// // import {LOGIN_REQUEST, loginSuccess, loginFailure} from './authActions';

// // function* loginUser(action) {
// //   try {
// //     const {email, password} = action.payload;

// //     //local
// //     if (email === 'abc@g.c' && password === 'password') {
// //       const user = {name: 'ABC DEF', email: 'abc@g.c'};
// //       yield put(loginSuccess(user));
//       // yield action.payload.navigation.navigate('Home');
// //     } else {
// //       throw new Error('Invalid credentials');
// //     }
// //   } catch (error) {
// //     yield put(loginFailure(error.message));
// //   }
// // }

// // function* authSaga() {
// //   yield takeLatest(LOGIN_REQUEST, loginUser);
// // }

// // export default authSaga;


// // authSaga.js - Updated loginUser saga

// import { put, takeLatest, call } from 'redux-saga/effects';
// import { LOGIN_REQUEST, loginSuccess, loginFailure } from './authActions';

// // Function to make the API call for login
// const loginAPI = async (email, password) => {
//   try {
//     const response = await fetch('http://34.203.231.237/api/v1/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data; // Return the response data if the request was successful
//     }
//     throw new Error(data.message || 'Login failed');
//   } catch (error) {
//     throw new Error(error.message || 'Login failed');
//   }
// };

// function* loginUser(action) {
//   try {
//     const { email, password} = action.payload;

//     // Call the loginAPI function passing email and password
//     const data = yield call(loginAPI, email, password);

//     // Dispatch loginSuccess action with received user data
//     yield put(loginSuccess(data));
//     console.log("amma");
//     // You might navigate or perform any other actions here based on the success
//     // action.payload.navigation.navigate('Home');
//   } catch (error) {
//     yield put(loginFailure(error.message));
//     console.log("try");
//   }
// }

// function* authSaga() {
//   yield takeLatest(LOGIN_REQUEST, loginUser);
// }

// export default authSaga;

// src/sagas/authSaga.js

// src/sagas/authSaga.js

// import { put, takeLatest, call, select } from 'redux-saga/effects';
// import { LOGIN_REQUEST, loginSuccess, loginFailure, setToken, LOGOUT } from './authActions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const loginAPI = async (username, password) => {
//   try {
//     const response = await fetch('http://34.203.231.237/api/v1/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     if (response.ok && data.success) {
//       return data;
//     }
//     throw new Error(data.message || 'Login failed');
//   } catch (error) {
//     throw new Error(error.message || 'Login failed');
//   }
// };

// function* loginUser(action) {
//   try {
//     const { username, password, navigation } = action.payload;

//     const data = yield call(loginAPI, username, password);

//     console.log('Success');
//     yield put(loginSuccess(data));
//     console.log('Success');
//     yield put(setToken(data.token)); // Assuming the token is available in the response
//     console.log("TOKEN PRESENt", data.token);
//     yield call(() => navigation.navigate('Home'));
//     yield AsyncStorage.setItem('token', data.token);
//     yield AsyncStorage.setItem('userData', JSON.stringify(data));
//     // Check if the token is stored in AsyncStorage
//     const storedToken = yield AsyncStorage.getItem('token');
//     const storedUser = yield AsyncStorage.getItem('userData');
//     console.log('STored info:', storedUser);
//     console.log('Stored token:', storedToken);

//   } catch (error) {
//     console.log('Fail');
//     yield put(loginFailure(error.message));
//     console.log('Fail');

//   }
// }

// function* logoutUser({navigation}) {
//   try {
//     // Remove token and user data from AsyncStorage
//     yield AsyncStorage.removeItem('token');
//     yield AsyncStorage.removeItem('userData');


//     // Perform any other necessary cleanup

//     // Dispatch action indicating successful logout
//     yield put({ type: 'LOGOUT_SUCCESS' }); // You can define this action in your reducers
//     navigation.navigate('Login');

//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// }


// function* authSaga() {
//   yield takeLatest(LOGIN_REQUEST, loginUser);
//   yield takeLatest(LOGOUT, logoutUser);

// }

// export default authSaga;


import { put, takeLatest, call, select } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, setToken, LOGOUT } from './authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { loginAPI } from '../api/ApiKit';

function* loginUser(action) {
  try {
    const { username, password, navigation } = action.payload;

    const data = yield call(loginAPI, username, password);

    console.log('Success');
    yield put(loginSuccess(data));
    console.log('Success');
    yield put(setToken(data.token));
    console.log("TOKEN PRESENt", data.token);
    yield call(() => navigation.navigate('Home'));
    yield AsyncStorage.setItem('token', data.token);
    yield AsyncStorage.setItem('userData', JSON.stringify(data));
    // Check if the token is stored in AsyncStorage
    const storedToken = yield AsyncStorage.getItem('token');
    const storedUser = yield AsyncStorage.getItem('userData');
    console.log('STored info:', storedUser);
    console.log('Stored token:', storedToken);

  } catch (error) {
    console.log('Fail');
    yield put(loginFailure(error.message));
    console.log('Fail');

  }
}

function* logoutUser({navigation}) {
  try {
    // Remove token and user data from AsyncStorage
    yield AsyncStorage.removeItem('token');
    yield AsyncStorage.removeItem('userData');

    // Dispatch action indicating successful logout
    yield put({ type: 'LOGOUT_SUCCESS' });
    navigation.navigate('Login');

  } catch (error) {
    console.error('Error logging out:', error);
  }
}


function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(LOGOUT, logoutUser);

}

export default authSaga;


