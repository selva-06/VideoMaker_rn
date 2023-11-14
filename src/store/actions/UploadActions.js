// UploadActions.js
export const UPLOAD_VIDEO_REQUEST = 'UPLOAD_VIDEO_REQUEST';
export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';
export const UPLOAD_VIDEO_FAILURE = 'UPLOAD_VIDEO_FAILURE';

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
