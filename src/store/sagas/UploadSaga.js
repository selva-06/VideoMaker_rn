import {put, takeLatest, call} from 'redux-saga/effects';
import {
  UPLOAD_VIDEO_REQUEST,
  uploadVideoSuccess,
  uploadVideoFailure,
  setUploadProgress,
  showSnackbar,
  hideSnackbar,
} from '../actions/UploadActions';
import {uploadFile} from '../../api/ApiKit';
import store from '../Store';
import api from '../../api/ApiKit';
function* uploadVideo(action) {
  try {
    const uploadFile = (payload, onUploadProgress) => {
      const config = {
        headers: {
          platform: 'react',
        },
        onUploadProgress,
      };

      console.log('Preparing to upload...');

      return api
        .post('assets/uploadVideo', payload, config)
        .then(response => {
          console.log('Upload successful! Response:', response.data);
          return response;
        })
        .catch(error => {
          console.error('Upload failed. Error:', error);
          throw error;
        });
    };

    const {payload} = action;

    yield put(setUploadProgress(0));

    const {data} = yield call(uploadFile, payload, onUploadProgress);

    console.log('Uploaded Successfully');
    console.log('Response Data:1111111111', data);

    yield put(uploadVideoSuccess(data));
    yield put(showSnackbar('Uploaded Successfully', 'success'));
  } catch (error) {
    yield put(uploadVideoFailure(error.message));
    yield put(showSnackbar('Upload failed', 'error'));
  }
}

function onUploadProgress(progressEvent) {
  const {loaded, total} = progressEvent;
  const percentCompleted = Math.round((loaded / total) * 100);
  console.log('Progress:', percentCompleted);
  store.dispatch(setUploadProgress(percentCompleted));
}

export function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}
