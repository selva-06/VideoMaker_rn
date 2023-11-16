import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadFile = (payload, onUploadProgress) => {
  const config = {
    onUploadProgress,
  };

  return api.post('files/upload', payload, config);
};

export default api;
