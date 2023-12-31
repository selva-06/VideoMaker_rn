import {put, takeLatest, call, select} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  setToken,
  LOGOUT,
  logout,
  logoutSuccess,
} from './authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {loginAPI} from '../api/ApiKit';
import api from '../api/ApiKit';
function* loginUser(action) {
  try {
    const loginAPI = async (username, password) => {
      console.log('LOGINAPI triggered');
      try {
        const response = await api.post(
          'auth/login',
          {username, password},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('response.data', response.data);
        if (response.status === 200 && response.data.user.success) {
          return response.data;
        }

        throw new Error(response.data.message || 'Login failed');
      } catch (error) {
        throw new Error(error.message || 'Login failed');
      }
    };

    const {username, password, navigation} = action.payload;

    const data = yield call(loginAPI, username, password);
    console.log('FAILEDATA', data);
    console.log('Success');
    yield put(loginSuccess(data));
    console.log('Success');
    yield put(setToken(data.user.token));
    console.log('TOKEN PRESENt', data.user.token);
    yield call(() =>
      navigation.navigate('MainTab', {
        screen: 'Home',
      }),
    );
    // navigation.navigate('MainTab', {
    //   screen: 'Home',
    // });
    yield AsyncStorage.setItem('token', data.user.token);
    yield AsyncStorage.setItem('userData', JSON.stringify(data.user));
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
    yield put(logoutSuccess());
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
