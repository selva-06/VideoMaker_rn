import React, {useEffect} from 'react';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {hideSnackbar} from '../store/actions/UploadActions';
const SnackBarC = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.upload.snackbar);

  useEffect(() => {
    if (snackbar.open) {
      const timeout = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [snackbar.open, dispatch]);

  return (
    <Snackbar
      visible={snackbar.open}
      onDismiss={() => dispatch(hideSnackbar())}
      duration={3000}>
      {snackbar.message}
    </Snackbar>
  );
};

export default SnackBarC;
