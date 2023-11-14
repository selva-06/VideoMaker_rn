// listingReducer.js
import {
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
} from '../actions/UploadActions';

const initialState = {
  uploading: false,
  error: null,
};

const UploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return {...state, uploading: true, error: null};
    case UPLOAD_VIDEO_SUCCESS:
      return {...state, uploading: false, error: null};
    case UPLOAD_VIDEO_FAILURE:
      return {...state, uploading: false, error: action.payload};
    default:
      return state;
  }
};

export default UploadReducer;
