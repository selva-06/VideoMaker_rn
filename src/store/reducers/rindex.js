/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import authReducer from '../authReducer';
import { watchLogin } from '../authSaga';
import watchFetchListData from '../sagas/ListingSaga';
import listReducer from './ListingReducer';
function* rootSaga() {
  yield all([watchLogin(),watchFetchListData]);
}

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer, // Add the new reducer

});

export {rootSaga};
export default rootReducer;
