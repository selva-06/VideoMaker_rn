// listingReducer.js
import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  SET_UPLOAD_PROGRESS,
} from '../actions/UploadActions';

const initialState = {
  uploading: false,
  error: null,
  uploadProgress: 0,
};

const UploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return {...state, uploading: true, error: null};
    case UPLOAD_VIDEO_SUCCESS:
      return {...state, uploading: false, error: null};
    case UPLOAD_VIDEO_FAILURE:
      return {...state, uploading: false, error: action.payload};
    case SET_UPLOAD_PROGRESS:
      console.log('Action Payload:', action.payload);
      return {...state, uploadProgress: action.payload};
    default:
      return state;
  }
};

export default UploadReducer;
