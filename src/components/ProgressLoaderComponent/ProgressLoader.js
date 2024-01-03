/* eslint-disable no-unused-vars */
import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {strings} from '../../util/Strings';
import {modalStyles} from './styles';
const UploadModal = () => {
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const error = useSelector(state => state.upload.error);
  const uploadSuccess = !uploading && !error;

  return (
    <Modal visible={uploading} transparent={true} animationType="fade">
      <View style={modalStyles.container}>
        <View style={modalStyles.content}>
          {uploading ? (
            <>
              <ActivityIndicator animating={true} color={'red'} />
              {/* <Text style={modalStyles.progressText}>{uploadProgress}%</Text> */}
            </>
          ) : (
            <Text style={modalStyles.errorText}>
              {strings.uploadModel.uploadError}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UploadModal;
