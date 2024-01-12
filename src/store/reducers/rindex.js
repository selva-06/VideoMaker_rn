/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import authReducer from '../authReducer';
import authSaga from '../authSaga';
import watchFetchListData from '../sagas/ListingSaga';
import listReducer from './ListingReducer';
import {watchUploadVideo} from '../sagas/UploadSaga';
import UploadReducer from './UploadReducer';
import { watchDeleteItem } from '../sagas/DeleteSaga';
import deleteReducer from './DeleteReducer';

function* rootSaga() {
  yield all([authSaga(), watchFetchListData(), watchUploadVideo(),watchDeleteItem()]);
}

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  upload: UploadReducer,
  delete: deleteReducer,
});

export {rootSaga};
export default rootReducer;
