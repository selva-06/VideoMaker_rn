// Deleteactions.js
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const deleteItemRequest = (id, type) => ({
    type: DELETE_ITEM_REQUEST,
    payload: { id, type },
});
  
  export const deleteItemSuccess = () => ({
    type: DELETE_ITEM_SUCCESS,
  });
  
  export const deleteItemFailure = (error) => ({
    type: DELETE_ITEM_FAILURE,
    payload: error,
  });
  