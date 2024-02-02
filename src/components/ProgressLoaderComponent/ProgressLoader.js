/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {strings} from '../../util/Strings';
import {modalStyles} from './styles';

const UploadModal = () => {

  const uploading = useSelector(state => state.upload.uploading);

  const[onUpload, setOnUpload] = useState(false)
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    const interval = setTimeout(() => {
      setOnUpload(uploading)
    }, 1000);


    return () => {
      clearInterval(interval);
    };
  },[uploading])

  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const error = useSelector(state => state.upload.error);
  const uploadSuccess = !uploading && !error;

  return (
    // <Modal visible={false} transparent={true} animationType="fade">
    //   <View style={modalStyles.container}>
    //     <View style={modalStyles.content}>
    //       {onUpload ? (
    //         <>
    //           <ActivityIndicator animating={true} color={'red'} />
    //           {/* <Text style={modalStyles.progressText}>{uploadProgress}%</Text> */}
    //         </>
    //       ) : (
    //         <Text style={modalStyles.errorText}>
    //           {strings.uploadModel.uploadError}
    //         </Text>
    //       )}
    //     </View>
    //   </View>
    // </Modal>
    <View>
      
    </View>
  );
};

export default UploadModal;
