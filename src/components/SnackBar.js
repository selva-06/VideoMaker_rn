// SnackbarC.js
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Snackbar} from 'react-native-paper';

const SnackbarC = () => {
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const error = useSelector(state => state.upload.error);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [uploadCompleted, setUploadCompleted] = useState(false);

  useEffect(() => {
    if (!uploading && uploadCompleted && !error) {
      setSnackbarMessage('Upload successful!');
      setSnackbarVisible(true);
      setUploadCompleted(false);
    } else if (error) {
      setSnackbarMessage('Upload failed. Please try again.');
      setSnackbarVisible(true);
      setUploadCompleted(false);
    }
  }, [uploading, uploadCompleted, error]);

  useEffect(() => {
    if (uploadProgress === 100) {
      setUploadCompleted(true);
    }
  }, [uploadProgress]);

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={onDismissSnackbar}
      duration={3000}
      action={{
        label: 'Dismiss',
        onPress: onDismissSnackbar,
      }}>
      {snackbarMessage}
    </Snackbar>
  );
};

export default SnackbarC;
