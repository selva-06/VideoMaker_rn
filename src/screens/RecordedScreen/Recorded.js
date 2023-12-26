// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Image,
//   Dimensions,
//   BackHandler,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {uploadVideoRequest} from '../../store/actions/UploadActions';
// import Video from 'react-native-video';
// import SnackBarC from '../../components/SnackBarComponent/SnackBar';
// import styles from './styles';
// import {strings} from '../../util/Strings';
// function RecordedVideoScreen({route, navigation}) {
//   useEffect(() => {
//     const handleBackDevice = () => {
//       navigation.navigate('Home');
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackDevice,
//     );
//     return () => backHandler.remove();
//   }, [navigation]);
//   const {videoSource, videoDuration} = route.params;
//   const [uploading, setUploading] = useState(false);
//   const dispatch = useDispatch();
//   console.log('rec is', videoDuration);

//   const uploadVideo = () => {
//     setUploading(true);

//     if (videoDuration < 10 || videoDuration > 26) {
//       // Show alert and return without uploading
//       alert('Please record a video between 10 and 25 seconds.');
//       setUploading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', {
//       uri: videoSource,
//       type: 'video/mp4',
//       name: 'recorded_video.mp4',
//     });
//     formData.append('name', 'test');

//     dispatch(uploadVideoRequest(formData));
//     navigation.replace('Home');
//   };
//   const navigateToHomeScreen = () => {
//     navigation.replace('Home'); // Navigate to the Main screen
//   };
//   return (
//     <View style={styles.container}>
//       <Video
//         source={{uri: videoSource}}
//         style={styles.video}
//         controls={true}
//         resizeMode="cover"
//       />
//       <View style={styles.bottombuttonContainer}>
//         <TouchableOpacity
//           style={styles.buttonrec}
//           onPress={navigateToHomeScreen}>
//           <Text style={styles.buttonText}>
//             {strings.recordedScreen.cancelText}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={uploadVideo}
//           disabled={uploading}>
//           <Image
//             source={require('../../assets/images/uploadTick.png')}
//             style={styles.imageStyleClose}
//           />
//         </TouchableOpacity>
//       </View>
//       <SnackBarC />
//     </View>
//   );
// }

// export default RecordedVideoScreen;
//-------------------------------------------------------------------
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Image,
//   Dimensions,
//   BackHandler,
//   Modal,
//   TextInput,
//   Button,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {uploadVideoRequest} from '../../store/actions/UploadActions';
// import Video from 'react-native-video';
// import SnackBarC from '../../components/SnackBarComponent/SnackBar';
// import styles from './styles';
// import {strings} from '../../util/Strings';

// function RecordedVideoScreen({route, navigation}) {
//   useEffect(() => {
//     const handleBackDevice = () => {
//       navigation.navigate('Home');
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackDevice,
//     );
//     return () => backHandler.remove();
//   }, [navigation]);

//   const {videoSource, videoDuration} = route.params;
//   const [uploading, setUploading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
//   const [videoName, setVideoName] = useState(''); // State to hold the entered video name
//   const dispatch = useDispatch();
//   console.log('rec is', videoDuration);

//   const uploadVideo = () => {
//     setUploading(true);

//     if (videoDuration < 10 || videoDuration > 26) {
//       // Show alert and return without uploading
//       alert('Please record a video between 10 and 25 seconds.');
//       setUploading(false);
//       return;
//     }

//     if (!videoName.trim()) {
//       // Show modal for entering video name if it's empty
//       setModalVisible(true);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', {
//       uri: videoSource,
//       type: 'video/mp4',
//       name: 'recorded_video.mp4',
//     });
//     formData.append('name', videoName);

//     dispatch(uploadVideoRequest(formData));
//     navigation.replace('Home');
//   };

//   const navigateToHomeScreen = () => {
//     navigation.replace('Home'); // Navigate to the Main screen
//   };

//   return (
//     <View style={styles.container}>
//       <Video
//         source={{uri: videoSource}}
//         style={styles.video}
//         controls={true}
//         resizeMode="cover"
//       />
//       <View style={styles.bottombuttonContainer}>
//         <TouchableOpacity
//           style={styles.buttonrec}
//           onPress={navigateToHomeScreen}>
//           <Text style={styles.buttonText}>
//             {strings.recordedScreen.cancelText}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             // Check if videoName is empty; if so, show modal again
//             if (!videoName.trim()) {
//               setModalVisible(true);
//             } else {
//               uploadVideo(); // Otherwise, proceed with uploading
//             }
//           }}
//           disabled={uploading}>
//           <Image
//             source={require('../../assets/images/uploadTick.png')}
//             style={styles.imageStyleClose}
//           />
//         </TouchableOpacity>
//       </View>
//       <SnackBarC />

//       {/* Modal for entering video name */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>Enter Video Name:</Text>
//             <TextInput
//               style={styles.input}
//               value={videoName}
//               onChangeText={text => setVideoName(text)}
//               placeholder="Video Name"
//             />
//             <Button title="Save" onPress={uploadVideo} />
//             <Button
//               title="Close"
//               onPress={() => {
//                 setVideoName(''); // Reset the videoName state

//                 setModalVisible(false); // Set modalVisible to false
//                 setVideoName(''); // Reset the videoName state

//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// export default RecordedVideoScreen;

//----------------------------------------

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  BackHandler,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {uploadVideoRequest} from '../../store/actions/UploadActions';
import Video from 'react-native-video';
import SnackBarC from '../../components/SnackBarComponent/SnackBar';
import styles from './styles';
import {strings} from '../../util/Strings';
import VideoDetailsModal from '../../components/NameDescriptionModal';
function RecordedVideoScreen({route, navigation}) {
  useEffect(() => {
    const handleBackDevice = () => {
      navigation.navigate('MainTab');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const {videoSource, videoDuration} = route.params;
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoName, setVideoName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const dispatch = useDispatch();

  const uploadVideo = () => {
    setUploading(true);

    if (videoDuration < 10 || videoDuration > 26) {
      alert('Please record a video between 10 and 25 seconds.');
      setUploading(false);
      return;
    }

    if (!videoName.trim() || !videoDescription.trim()) {
      setModalVisible(true);
      return;
    }

    const formData = new FormData();
    formData.append('video', {
      uri: videoSource,
      type: 'video/mp4',
      name: 'recorded_video.mp4',
    });
    formData.append('name', videoName);
    formData.append('description', videoDescription);

    dispatch(uploadVideoRequest(formData));
    navigation.replace('MainTab');
  };

  const navigateToHomeScreen = () => {
    navigation.replace('MainTab');
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
          onPress={() => {
            if (!videoName.trim() || !videoDescription.trim()) {
              setModalVisible(true);
            } else {
              uploadVideo();
            }
          }}
          disabled={uploading}>
          <Image
            source={require('../../assets/images/uploadTick.png')}
            style={styles.imageStyleClose}
          />
        </TouchableOpacity>
      </View>
      <SnackBarC />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: 'black'}}>Enter Video Details:</Text>
            <TextInput
              style={styles.input}
              value={videoName}
              onChangeText={text => setVideoName(text)}
              placeholder="Video Name"
              placeholderTextColor={'grey'}
            />
            <TextInput
              style={styles.input}
              value={videoDescription}
              onChangeText={text => setVideoDescription(text)}
              placeholder="Video Description"
              placeholderTextColor={'grey'}
            />
            {/* <Button
              title="Save"
              onPress={() => {
                if (!videoName.trim() || !videoDescription.trim()) {
                  alert('Please enter both video name and description.');
                  setModalVisible(true);
                } else {
                  uploadVideo();
                }
              }}
            />
            <Button
              title="Close"
              onPress={() => {
                setVideoName('');
                setVideoDescription('');
                setModalVisible(false);
              }}
            /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!videoName.trim() || !videoDescription.trim()) {
                  alert('Please enter both video name and description.');
                  setModalVisible(true);
                } else {
                  uploadVideo();
                }
              }}
              disabled={uploading}>
              <Text style={styles.buttonTextModal}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVideoName('');
                setVideoDescription('');
                setModalVisible(false);
              }}>
              <Text style={styles.buttonTextModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RecordedVideoScreen;
