/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // listingSaga.js
// import {put, takeLatest, call} from 'redux-saga/effects';
// import {setListData} from '../actions/ListingActions';
// import {ListData} from '../../assets/data/Data';
// import { getUploadedFiles } from '../../api/ApiKit';
// function* fetchListData() {
//   try {
//     const response = yield call(getUploadedFiles);
//     // const uploadedFiles = response.data.map(item => item.thumbnail); // Extracting thumbnails
//     const uploadedFiles = response.data; // Extracting thumbnails
//     console.log('THE UPLOADED ARE ______ ',uploadedFiles);
//     yield put(setListData(uploadedFiles)); // Dispatch action to set list data
//     console.log('done fetching img from saga');
//   } catch (error) {
//     console.log('IS',error.response);
//   }
// }

// function* watchFetchListData() {
//   yield takeLatest('FETCH_LIST_DATA', fetchListData);
// }

// export default watchFetchListData;

import { put, takeLatest, call } from 'redux-saga/effects';
import { setListData } from '../actions/ListingActions';
import { getUploadedFiles } from '../../api/ApiKit';

// function* fetchListData() {
//   try {
//     const response = yield call(getUploadedFiles);
//     if (response.data && response.data.length > 0) {
//       // Sort the data based on the 'updatedAt' field in descending order
//       const sortedData = response.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       // Reverse the sorted array to have the latest uploaded item first
//       const latestFirst = sortedData.reverse();
      
//       yield put(setListData(latestFirst)); // Dispatch action to set sorted list data



//     }
//   } catch (error) {
//     console.log('Error fetching uploaded files:', error);
//   }
// }

// function* watchFetchListData() {
//   yield takeLatest('FETCH_LIST_DATA', fetchListData);
// }

// export { fetchListData }; // Export the fetchListData function for integration
// export default watchFetchListData;


//----------------------------------------------------------
function* fetchListData() {
  try {
    const response = yield call(getUploadedFiles);
    console.log('GET_UPLOAD_FILES',response);
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
        // Handle the case where 'createdAt' is not present for all items
        // You can dispatch an action, show a message, or handle it based on your requirements
      }
    }
  } catch (error) {
    console.log('Error fetching uploaded files:', error);
  }
}

function* watchFetchListData() {
  yield takeLatest('FETCH_LIST_DATA', fetchListData);
}

export default watchFetchListData;
