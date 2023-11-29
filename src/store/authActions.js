/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
// /* eslint-disable prettier/prettier */
// // src/actions/authActions.js

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// export const loginRequest = (email, password) => ({
//   type: LOGIN_REQUEST,
//   payload: {email, password},
// });

// export const loginSuccess = user => ({
//   type: LOGIN_SUCCESS,
//   payload: user,
// });

// export const loginFailure = error => ({
//   type: LOGIN_FAILURE,
//   payload: error,
// eslint-disable-next-line prettier/prettier
// });

// src/actions/authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

export const loginRequest = (username, password, navigation) => ({
  type: LOGIN_REQUEST,
  payload: { username, password, navigation },
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

export const logout = (navigation) => ({
  type: LOGOUT,
  navigation,
});
