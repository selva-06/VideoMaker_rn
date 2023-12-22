import {put, takeLatest, call} from 'redux-saga/effects';
import {setListData} from '../actions/ListingActions';
import api, {getUploadedFiles} from '../../api/ApiKit';
// import {logout} from '../authActions';

function* fetchListData() {
  try {
    const getUploadedFiles = async () => {
      try {
        const config = {
          headers: {
            platform: 'react',
          },
        };

        const response = await api.post(
          'assets/getUploadedFiles',
          null,
          config,
        );
        console.log('UploadingFILES', response);
        const responseData = response.data;
        console.log('ResponseData', responseData);

        if (response.status === 200 && response.data.success) {
          console.log('API FETCHED ', responseData);
          return responseData;
        } else {
          throw new Error(
            response.data.message || 'Failed to fetch uploaded files',
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access - error code 401,,,selva');
          // Perform actions for unauthorized access, e.g., logout or redirect to login
          // Example: throw a specific error to handle it outside this function
          throw new Error('Unauthorized access - error code 401 in list');
        } else if (error.response) {
          console.error('Error in getUploadedFiles:', error.response.status);
          console.error('Axios error details:', error.response.data);
          throw new Error(error.message || 'Failed to fetch uploaded files');
        } else {
          console.error('Non-Axios error occurred:', error);
          throw new Error(error.message || 'Failed to fetch uploaded files');
        }
      }
    };

    const response = yield call(getUploadedFiles);

    // const response = yield call(api.post,'assets/getUploadedFiles', {});

    console.log('GET_UPLOAD_FILES', response);
    if (response.data && response.data.length > 0) {
      // Check if 'createdAt' is present for all items in response.data
      const isCreatedAtPresent = response.data.every(item => !!item.createdAt);

      if (isCreatedAtPresent) {
        // If 'createdAt' is present for all items, proceed with sorting
        const sortedData = response.data.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        console.log('Sorted Data:', sortedData); // Log sorted data for verification

        yield put(setListData(sortedData.reverse())); // Dispatch action to set sorted list data
        console.log('Done fetching and sorting data from saga');
      } else {
        console.log('createdAt is not present for all items');
        // case where 'createdAt' is not present for all items
      }
    }
  } catch (error) {
    console.log('Error fetching uploaded files:', error.response);
    if (error.message.includes('401')) {
      console.log('EROOR BOSS');
      // yield put(logout(navigation)); // Dispatch the logout action with navigation
      // navigation.navigate('Login');
      // eslint-disable-next-line no-undef
      // yield put({type: 'LOGOUT_SUCCESS'});
      // navigation.navigate('Login');
    } else {
      alert(error.message);

      console.log('eroor mam', error);
    }
  }
}

function* watchFetchListData() {
  yield takeLatest('FETCH_LIST_DATA', fetchListData);
}

export default watchFetchListData;
