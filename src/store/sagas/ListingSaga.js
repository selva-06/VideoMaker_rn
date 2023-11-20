/* eslint-disable prettier/prettier */
// listingSaga.js
import {put, takeLatest, call} from 'redux-saga/effects';
import { setListData } from '../actions/ListingActions';
import { ListData } from '../../assets/data/Data';
function* fetchListData() {
  try {
    //to fetch data
    // const data = yield call(/* API call to fetch data */);
    yield put(setListData(ListData)); // Dispatch action to set list data
    console.log('done fetching img from saga');
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchListData() {
  yield takeLatest('FETCH_LIST_DATA', fetchListData);
}

export default watchFetchListData;
