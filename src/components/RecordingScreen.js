import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {useDispatch} from 'react-redux';
import {uploadVideoRequest} from '../store/actions/UploadActions';
import {launchCamera} from 'react-native-image-picker';

const RecordingScreen = () => {

  const dispatch = useDispatch();
  
  const startRecordingVideo = () => {
    const options = {
        mediaType: 'video',
        videoQuality: 'high',
      };
  
      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled video recording');
        } else if (response.error) {
          console.log('Error recording video:', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          const type = response.assets[0].type;
          const fname = response.assets[0].fileName;
          console.log('Video recorded:', uri);
          console.log(type);
          console.log(fname);
          const form1 = new FormData();
          form1.append('file', {
            uri: uri,
            type: type,
            name: fname,
          });
          dispatch(uploadVideoRequest(form1)); // Updated action reference
        }
      });
  };

  useEffect(() => {
    startRecordingVideo(); // Start recording when the component mounts
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 20, left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Recording in progress...</Text>
      </View>
    </View>
  );
};

export default RecordingScreen;