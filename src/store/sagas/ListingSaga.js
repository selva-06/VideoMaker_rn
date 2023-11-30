/* eslint-disable prettier/prettier */
// listingSaga.js
import {put, takeLatest, call} from 'redux-saga/effects';
import {setListData} from '../actions/ListingActions';
import {ListData} from '../../assets/data/Data';
import { getUploadedFiles } from '../../api/ApiKit';
function* fetchListData() {
  try {
    const response = yield call(getUploadedFiles);
    // const uploadedFiles = response.data.map(item => item.thumbnail); // Extracting thumbnails
    const uploadedFiles = response.data; // Extracting thumbnails
    console.log('THE UPLOADED ARE ______ ',uploadedFiles);
    yield put(setListData(uploadedFiles)); // Dispatch action to set list data
    console.log('done fetching img from saga');
  } catch (error) {
    console.log('IS',error.response);
  }
}

function* watchFetchListData() {
  yield takeLatest('FETCH_LIST_DATA', fetchListData);
}

export default watchFetchListData;
