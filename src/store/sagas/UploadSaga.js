// listingSaga.js
import {put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  UPLOAD_VIDEO_REQUEST,
  uploadVideoSuccess,
  uploadVideoFailure,
} from '../actions/UploadActions';

function* uploadVideo(action) {
  try {
    const response = yield call(
      axios.post,
      'http://172.20.10.5:3001/client/uploadVideo',
      action.payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 200) {
      yield put(uploadVideoSuccess());
    } else {
      yield put(uploadVideoFailure(response.statusText));
    }
  } catch (error) {
    yield put(uploadVideoFailure(error.message));
  }
}

export function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}
