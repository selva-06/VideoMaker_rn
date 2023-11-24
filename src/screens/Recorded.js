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

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadVideoRequest } from '../store/actions/UploadActions';
import Video from 'react-native-video';
import SnackBarC from '../components/SnackBar';

function RecordedVideoScreen({ route, navigation }) {
  const { videoSource } = route.params;
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const uploadVideo = () => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: videoSource,
      type: 'video/mp4',
      name: 'recorded_video.mp4',
    });

    dispatch(uploadVideoRequest(formData));
    navigation.navigate('MainTab');
  };
  const navigateToHomeScreen = () => {
    navigation.navigate('MainTab'); // Navigate to the Cameraa screen
  };
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoSource }}
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={uploadVideo}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          Upload Video
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={navigateToHomeScreen}>
        <Text style={styles.buttonText}>
          CLose 
        </Text>
      </TouchableOpacity>
      <SnackBarC />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '80%',
  },
  button: {
    backgroundColor: '#77c3ec',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecordedVideoScreen;
