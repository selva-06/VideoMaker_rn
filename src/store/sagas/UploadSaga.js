import {put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  UPLOAD_VIDEO_REQUEST,
  uploadVideoSuccess,
  uploadVideoFailure,
  setUploadProgress,
} from '../actions/UploadActions';
import store from '../Store';
function* uploadVideo(action) {
  try {
    const {payload} = action;
    const {data} = yield call(uploadFile, payload);
    yield put(uploadVideoSuccess(data));
  } catch (error) {
    yield put(uploadVideoFailure(error.message));
  }
}

function uploadFile(payload) {
  return new Promise((resolve, reject) => {
    const config = {
      onUploadProgress: progressEvent => {
        const {loaded, total} = progressEvent;
        const percentCompleted = Math.round((loaded / total) * 100);
        console.log('Progress:', percentCompleted);
        store.dispatch(setUploadProgress(percentCompleted));
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post('https://api.escuelajs.co/api/v1/files/upload', payload, config)
      .then(response => {
        console.log('Uploaded Successfully');
        console.log(response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}

// import {put, takeLatest, call} from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   UPLOAD_VIDEO_REQUEST,
//   uploadVideoSuccess,
//   uploadVideoFailure,
//   setUploadProgress,
// } from '../actions/UploadActions';

// function* uploadVideo(action) {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       onUploadProgress: function (progressEvent) {
//         const {loaded, total} = progressEvent;
//         const percentCompleted = Math.round((loaded * 100) / total);
//         console.log('Progress:', percentCompleted);
//         // Dispatch an action to update the progress in the Redux store
//         put(setUploadProgress(percentCompleted));
//       },
//     };

//     const response = yield call(
//       axios.post,
//       'https://api.escuelajs.co/api/v1/files/upload',
//       action.payload,
//       config,
//     );

//     if (response.status === 201) {
//       yield put(uploadVideoSuccess());
//       console.log('Uploaded successfully!');
//       console.log('Response data:', response.data);
//     } else {
//       yield put(uploadVideoFailure(response.statusText));
//       console.log('fail', response.statusText);
//     }
//   } catch (error) {
//     yield put(uploadVideoFailure(error.message));
//     console.log('err', error.message);
//   }
// }

// export function* watchUploadVideo() {
//   yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
// }
