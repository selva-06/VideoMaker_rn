/* eslint-disable prettier/prettier */
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
    default:
      return state;
  }
};

export default listReducer;
