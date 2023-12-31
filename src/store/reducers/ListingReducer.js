/* eslint-disable prettier/prettier */
import {LOGOUT} from '../authActions';
const initialState = {
  listData: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LIST_DATA':
      return {
        ...state,
        listData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        listData: null,
      };

    default:
      return state;
  }
};

export default listReducer;
