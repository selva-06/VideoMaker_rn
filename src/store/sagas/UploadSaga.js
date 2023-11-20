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
function* uploadVideo(action) {
  try {
    const {payload} = action;

    yield put(setUploadProgress(0));

    const {data} = yield call(uploadFile, payload, onUploadProgress);

    console.log('Uploaded Successfully');
    console.log('Response Data:', data);

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
