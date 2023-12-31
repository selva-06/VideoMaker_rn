// src/reducers/authReducer.js

import {
  SET_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
} from './authActions';

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
      return {
        ...initialState,
      };

    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
