// sagas/UploadSaga.js
import {put, takeLatest, call} from 'redux-saga/effects';
import api from '../../api/ApiKit';
import {deleteItemSuccess, deleteItemFailure} from '../actions/DeleteActions';
import {navigate} from '../../navigation/navFunctions';
import { showSnackbar } from '../actions/UploadActions';
function* deleteItemSaga(action) {
  try {
    const {id, type} = action.payload;
    console.log('deleteidtype', id, type);
    yield call(
      api.post,
      'assets/delete-file',
      {id, type},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('apideletecall', id, type);
    yield put(deleteItemSuccess());
    if (type === 0) {
      alert('Item deleted successfully');
      navigate('MainTab', {screen: 'Home'});
      yield put(showSnackbar('Deleted Item Successfully', 'success'));
    } else if (type === 1) {
      alert('Video deleted successfully');
      yield put(showSnackbar('Deleted Video Successfully', 'success'));
    } else if (type === 2) {
      alert('Model deleted successfully');
      yield put(showSnackbar('Deleted Model Successfully', 'success'));
    }
    console.log('suces', id, type);
  } catch (error) {
    yield put(deleteItemFailure(error));
    yield put(showSnackbar('Deletion Failed', 'error'));
  }
}

export function* watchDeleteItem() {
  yield takeLatest('DELETE_ITEM_REQUEST', deleteItemSaga);
}
