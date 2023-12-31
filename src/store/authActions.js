export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'; 

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loginRequest = (username, password, navigation) => ({
  type: LOGIN_REQUEST,
  payload: {username, password, navigation},
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

export const logout = navigation => ({
  type: LOGOUT,
  navigation,
});
