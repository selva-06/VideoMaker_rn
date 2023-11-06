/* eslint-disable prettier/prettier */
// listingSaga.js
import {put, takeLatest, call} from 'redux-saga/effects';
import { setListData } from '../actions/ListingActions';
import { ListData } from '../../assets/data/Data';
function* fetchListData() {
  try {
    // Assuming you have some asynchronous operation to fetch data
    // const data = yield call(/* Your API call to fetch data */);
    yield put(setListData(ListData)); // Dispatch action to set list data
    console.log('done fetching img from saga')
  } catch (error) {
    // Handle error
    console.log(error);
  }
}

function* watchFetchListData() {
  yield takeLatest('FETCH_LIST_DATA', fetchListData);
}

export default watchFetchListData;
