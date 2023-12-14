// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://api.escuelajs.co/api/v1/',
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

// // api.interceptors.request.use((config) => {
// //   // const token = getTokenFromRoot(); token func
// //   if (token) {
// //     if (token) {

// //     } else {
// //       // clearStorage();
// //     }

// //   }
// //   return config;
// // });

// export const uploadFile = (payload, onUploadProgress) => {
//   const config = {
//     onUploadProgress,
//   };

//   return api.post('files/upload', payload, config);
// };

// export default api;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    return Promise.reject(error);
  },
);

// export const uploadFile = (payload, onUploadProgress) => {
//   const config = {
//     headers: {
//       platform: 'react',
//     },
//     onUploadProgress,
//   };

//   return api.post('assets/uploadVideo', payload, config);
// };
export const uploadFile = (payload, onUploadProgress) => {
  const config = {
    headers: {
      platform: 'react',
    },
    onUploadProgress,
  };

  console.log('Preparing to upload...');

  return api
    .post('assets/uploadVideo', payload, config)
    .then(response => {
      console.log('Upload successful! Response:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Upload failed. Error:', error);
      throw error;
    });
};

export const loginAPI = async (username, password) => {
  console.log('LOGINAPI triggered');
  try {
    const response = await api.post(
      'auth/login',
      {username, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response.data', response.data);
    if (response.status === 200 && response.data.user.success) {
      return response.data;
    }

    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const getUploadedFiles = async () => {
  try {
    const config = {
      headers: {
        platform: 'react',
      },
    };
    const response = await api.post('assets/getUploadedFiles', null, config);
    console.log('UploadingFILES', response);
    const responseData = response.data;
    console.log('ResponseData', responseData);
    if (response.status === 200 && response.data.success) {
      console.log('API FETCHED ', responseData);
      return responseData;
    }

    throw new Error(response.data.message || 'Failed to fetch uploaded files');
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch uploaded files');
  }
};

export default api;
