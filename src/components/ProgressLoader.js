import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Modal, Text, View} from 'react-native';

const UploadModal = () => {
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const error = useSelector(state => state.upload.error);
  const uploadSuccess = !uploading && !error;
  console.log(uploadSuccess, 'is it??');

  return (
    <Modal visible={uploading} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: 'black', padding: 20, borderRadius: 10}}>
          {uploading ? (
            <>
              <ActivityIndicator animating={true} color={'red'} />
              <Text style={{color: 'white'}}>{uploadProgress}%</Text>
            </>
          ) : (
            <Text>Uploading...</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UploadModal;
