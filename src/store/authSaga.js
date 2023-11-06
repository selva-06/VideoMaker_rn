/* eslint-disable prettier/prettier */
// src/sagas/authSaga.js

import {put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from './authActions';

function* loginUser(action) {
  try {
    const {email, password} = action.payload;

    // Simulate a local authentication check (replace with your own logic)
    if (email === 'abc@g.c' && password === 'password') {
      const user = {name: 'Leo Das', email: 'abc@g.c'};
      yield put(loginSuccess(user));
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
}

export default authSaga;
