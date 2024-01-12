import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigation/navFunctions';
import { showSnackbar } from '../store/actions/UploadActions';

const api = axios.create({
  baseURL: 'http://34.234.122.64/api/v1/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      config.headers['platform'] = 'react';
      console.log('API TOKEN', token);
      if (token) {
        config.headers['x-auth-token'] = token;
      }
    } catch (error) {
      console.log('API FETCH ERROR', error);
    }
    return config;
  },
  error => {
    // alert('Promise Rejected');
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  response => {
    console.log('APIINTERCEPTORSRESPONSE', response.status);
    if (response.status === 200) {
      // navigate('Profile', {});
      // alert('status code is 200');

    } else {
      console.log('response-------------401', response);
      navigate('Profile', {});
      // alert('status code is 401');
      console.log('response-------------401', response);
    }

    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // alert('status code is 401');
      console.log('response-------------401', error.response);
      // navigate('Profile', {});
      console.log('aSYNC', AsyncStorage.getItem('token'));
      console.log('ASYNC USER', AsyncStorage.getItem('userData'));
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('userData');
      AsyncStorage.getItem('token')
        .then(token => {
          if (token === null) {
            console.log('Token has been removed from AsyncStorage');
          } else {
            console.log('Token still exists in AsyncStorage:', token);
          }
        })
        .catch(error => {
          console.error('Error checking token:', error);
        });
      AsyncStorage.getItem('userData')
        .then(userData => {
          if (userData === null) {
            console.log('UserData has been removed from AsyncStorage');
            // alert('UserData has been removed from AsyncStorage');
          } else {
            console.log('UserData still exists in AsyncStorage:', userData);
          }
        })
        .catch(error => {
          console.error('Error checking userData:', error);
        });
      navigate('Login', {});
    }
    if (error.response && error.response.data) {
      console.log('rrrrrrrrrrrrrrrrrrr', error.response);
      // alert('status code is 401');
      // return Promise.reject(error.response.data); 
      return Promise.resolve();
    }
    console.log('E111111111111111111rror:', error);
    return Promise.resolve(); 
  },
);

// export const uploadFile = (payload, onUploadProgress) => {
//   const config = {
//     headers: {
//       platform: 'react',
//     },
//     onUploadProgress,
//   };

//   console.log('Preparing to upload...');

//   return api
//     .post('assets/uploadVideo', payload, config)
//     .then(response => {
//       console.log('Upload successful! Response:', response.data);
//       return response;
//     })
//     .catch(error => {
//       console.error('Upload failed. Error:', error);
//       throw error;
//     });
// };

// export const loginAPI = async (username, password) => {
//   console.log('LOGINAPI triggered');
//   try {
//     const response = await api.post(
//       'auth/login',
//       {username, password},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     console.log('response.data', response.data);
//     if (response.status === 200 && response.data.user.success) {
//       return response.data;
//     }

//     throw new Error(response.data.message || 'Login failed');
//   } catch (error) {
//     throw new Error(error.message || 'Login failed');
//   }
// };

// export const getUploadedFiles = async () => {
//   try {
//     const config = {
//       headers: {
//         platform: 'react',
//       },
//     };
//     const response = await api.post('assets/getUploadedFiles', null, config);
//     console.log('UploadingFILES', response);
//     const responseData = response.data;
//     console.log('ResponseData', responseData);
//     if (response.status === 200 && response.data.success) {
//       console.log('API FETCHED ', responseData);
//       return responseData;
//     } else if (response.status === 401) {
//       // Handle the 401 unauthorized access here (e.g., redirect to login or logout)
//       console.log('Unauthorized access - error code 401');
//       // Example: You can throw a custom error to handle it in the calling function
//       throw new Error('Unauthorized access - error code 401');
//     }

//     throw new Error(response.data.message || 'Failed to fetch uploaded files');
//   } catch (error) {
//     console.error('Error in getUploadedFiles:', error);

//     throw new Error(error.message || 'Failed to fetch uploaded files');
//   }
// };
// export const getUploadedFiles = async () => {
//   try {
//     const config = {
//       headers: {
//         platform: 'react',
//       },
//     };

//     const response = await api.post('assets/getUploadedFiles', null, config);
//     console.log('UploadingFILES', response);
//     const responseData = response.data;
//     console.log('ResponseData', responseData);

//     if (response.status === 200 && response.data.success) {
//       console.log('API FETCHED ', responseData);
//       return responseData;
//     } else {
//       throw new Error(
//         response.data.message || 'Failed to fetch uploaded files',
//       );
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized access - error code 401,,,selva');
//       // Perform actions for unauthorized access, e.g., logout or redirect to login
//       // Example: throw a specific error to handle it outside this function
//       throw new Error('Unauthorized access - error code 401 in list');
//     } else if (error.response) {
//       console.error('Error in getUploadedFiles:', error.response.status);
//       console.error('Axios error details:', error.response.data);
//       throw new Error(error.message || 'Failed to fetch uploaded files');
//     } else {
//       console.error('Non-Axios error occurred:', error);
//       throw new Error(error.message || 'Failed to fetch uploaded files');
//     }
//   }
// };

export default api;
