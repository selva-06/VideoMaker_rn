// UploadReducer.js
import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  SET_UPLOAD_PROGRESS,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from '../actions/UploadActions';

const initialState = {
  uploading: false,
  error: null,
  uploadProgress: 0,
  snackbar: {
    open: false,
    message: '',
    type: 'success',
  },
};

const UploadReducer = (state = initialState, action) => {
  console.log('hlo', action);
  switch (action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return {...state, uploading: true, error: null};
    case UPLOAD_VIDEO_SUCCESS:
      return {...state, uploading: false, error: null, uploadProgress: 0};
    case UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
        uploadProgress: 0,
      };
    case SET_UPLOAD_PROGRESS:
      console.log('Action Payload:', action.payload);
      return {...state, uploadProgress: action.payload};
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          type: action.payload.type || 'success',
        },
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };

    default:
      return state;
  }
};

export default UploadReducer;
