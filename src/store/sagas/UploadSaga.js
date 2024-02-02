import {put, takeLatest, call} from 'redux-saga/effects';
import {
  UPLOAD_VIDEO_REQUEST,
  uploadVideoSuccess,
  uploadVideoFailure,
  setUploadProgress,
  showSnackbar,
  hideSnackbar,
} from '../actions/UploadActions';
import store from '../Store';
import api from '../../api/ApiKit';
function* uploadVideo(action) {
  try {
    const uploadFile = async (payload, onUploadProgress) => {
      const config = {
        headers: {
          platform: 'react',
        },
        onUploadProgress,
      };
      console.log('Preparing to upload...');

      try {
        const response = await api.post('assets/uploadVideo', payload, config);
        console.log('Upload successful! Response:', response.data);
        return response;
      } catch (error) {
        console.error('Upload failed. Error:', error);
        throw error;
      }
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
  console.log('PROGRESS EVENT  __----', progressEvent);
  const {loaded, total} = progressEvent;
  const percentCompleted = Math.round((loaded / total) * 100);
  console.log('Progress:', percentCompleted);
  store.dispatch(setUploadProgress(percentCompleted));
  // let progressTimeout;
  // clearTimeout(progressTimeout);

  // if (percentCompleted <= 100) {
  //   progressTimeout = setTimeout(() => {
  //     console.log('dddddddddddddddddddd');
  //     store.dispatch(setUploadProgress(percentCompleted));
  //     console.log('dispatch compppppppppppppppppppp');
  //   }, 100); // Adjust the delay time as needed
  // } else {
  //   console.log('ppppppppppppppppppppppppppp');
  //   // If progress reaches 100%, dispatch immediately without delay
  //   store.dispatch(setUploadProgress(percentCompleted));
  // }
}

export function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}
