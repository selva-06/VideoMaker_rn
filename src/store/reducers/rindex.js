/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import authReducer from '../authReducer';
import { watchLogin } from '../authSaga';
function* rootSaga() {
  yield all([watchLogin()]);
}

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export {rootSaga};
export default rootReducer;
