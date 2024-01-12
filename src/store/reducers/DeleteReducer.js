//DeleteReducer.js
import {
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
  } from '../actions/DeleteActions';
  
  const initialState = {
    loading: false,
    success: false, 
  };
  
  const deleteReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
        };
  
      case DELETE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
        };
  
      case DELETE_ITEM_FAILURE:
        return {
          ...state,
          loading: false,
          success: false,
        };
    
      default:
        return state;
    }
  };
  
  export default deleteReducer;
  