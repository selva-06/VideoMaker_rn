// UploadActions.js
export const UPLOAD_VIDEO_REQUEST = 'UPLOAD_VIDEO_REQUEST';
export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';
export const UPLOAD_VIDEO_FAILURE = 'UPLOAD_VIDEO_FAILURE';
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const uploadVideoRequest = formData => ({
  type: UPLOAD_VIDEO_REQUEST,
  payload: formData,
});

export const uploadVideoSuccess = () => ({
  type: UPLOAD_VIDEO_SUCCESS,
});

export const uploadVideoFailure = error => ({
  type: UPLOAD_VIDEO_FAILURE,
  payload: error,
});

export const setUploadProgress = progress => ({
  type: SET_UPLOAD_PROGRESS,
  payload: progress,
});

export const showSnackbar = (message, type) => ({
  type: SHOW_SNACKBAR,
  payload: {message, type},
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
