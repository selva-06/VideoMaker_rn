// src/reducers/authReducer.js

import {SET_TOKEN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './authActions';

const initialState = {
  data: null,
  error: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      // Reset state to initial values on logout
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
