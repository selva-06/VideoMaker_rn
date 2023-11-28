/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import Video from 'react-native-video';
// import axios from 'axios';

// function RecordedVideoScreen({ route }) {
//   const { videoSource } = route.params;
//   const [uploading, setUploading] = useState(false);

//   const uploadVideo = async () => {
//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: videoSource,
//         type: 'video/mp4',
//         name: 'recorded_video.mp4',
//       });

//       const response = await axios.post(
//         'https://api.escuelajs.co/api/v1/files/upload',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log('Video uploaded:', response.data);
//       // Handle success
//     } catch (error) {
//       console.error('Error uploading video:', error.message);
//       console.error('Video source path:', videoSource);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Video
//         source={{ uri: videoSource }}
//         style={styles.video}
//         controls={true}
//         resizeMode="cover"
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={uploadVideo}
//         disabled={uploading}
//       >
//         <Text style={styles.buttonText}>
//           {uploading ? 'Uploading...' : 'Upload Video'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   video: {
//     width: '100%',
//     height: '80%',
//   },
//   button: {
//     backgroundColor: '#77c3ec',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default RecordedVideoScreen;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {uploadVideoRequest} from '../../store/actions/UploadActions';
import Video from 'react-native-video';
import SnackBarC from '../../components/SnackBarComponent/SnackBar';
import styles from './styles';
import {strings} from '../../util/Strings';
function RecordedVideoScreen({route, navigation}) {
  const {videoSource, videoDuration} = route.params;
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  console.log('rec is', videoDuration);

  const uploadVideo = () => {
    setUploading(true);

    if (videoDuration < 10 || videoDuration > 26) {
      // Show alert and return without uploading
      alert('Please record a video between 10 and 25 seconds.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: videoSource,
      type: 'video/mp4',
      name: 'recorded_video.mp4',
    });

    dispatch(uploadVideoRequest(formData));
    navigation.replace('Home');
  };
  const navigateToHomeScreen = () => {
    navigation.replace('Home'); // Navigate to the Main screen
  };
  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoSource}}
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />
      <View style={styles.bottombuttonContainer}>
        <TouchableOpacity
          style={styles.buttonrec}
          onPress={navigateToHomeScreen}>
          <Text style={styles.buttonText}>
            {strings.recordedScreen.cancelText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={uploadVideo}
          disabled={uploading}>
          <Image
            source={require('../../assets/images/uploadTick.png')}
            style={styles.imageStyleClose}
          />
        </TouchableOpacity>
      </View>
      <SnackBarC />
    </View>
  );
}

export default RecordedVideoScreen;
