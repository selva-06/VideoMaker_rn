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
      'https://api.escuelajs.co/api/v1/files/upload',
      action.payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 201) {
      yield put(uploadVideoSuccess());
      console.log('Uploaded successfully!');
      console.log('Response data:', response.data);
    } else {
      yield put(uploadVideoFailure(response.statusText));
      console.log('fail', response.statusText);
    }
  } catch (error) {
    yield put(uploadVideoFailure(error.message));
    console.log('err', error.message);
  }
}

export function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}
