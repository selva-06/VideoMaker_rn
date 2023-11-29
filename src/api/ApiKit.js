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
  baseURL: 'http://34.203.231.237/api/v1/',
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
      // Handle AsyncStorage retrieval errors here
      console.log('API FETCH ERROR', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const uploadFile = (payload, onUploadProgress) => {
  const config = {
    onUploadProgress,
  };

  return api.post('assets/uploadVideo', payload, config);
};

export default api;
