/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import authReducer from '../authReducer';
import authSaga from '../authSaga';
import watchFetchListData from '../sagas/ListingSaga';
import listReducer from './ListingReducer';
import {watchUploadVideo} from '../sagas/UploadSaga';
import UploadReducer from './UploadReducer';

function* rootSaga() {
  yield all([authSaga(), watchFetchListData(), watchUploadVideo()]);
}

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  upload: UploadReducer, // Add the new reducer
});

export {rootSaga};
export default rootReducer;
