/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  Dimensions,
  Modal,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import { PERMISSIONS, request } from 'react-native-permissions';
import Video from 'react-native-video';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import RNFS from 'react-native-fs'; // Import react-native-fs
async function requestPermissions() {
  try {
    if (Platform.OS === 'android') {
      const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
      const microphonePermission = await request(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      const readPermission = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      const writePermission = await request(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );

      if (
        cameraPermission === 'granted' &&
        microphonePermission === 'granted' &&
        readPermission === 'granted' &&
        writePermission === 'granted'
      ) {
        console.log('All permissions granted');
      } else {
        console.log(
          'Permission denied',
          cameraPermission,
          microphonePermission,
          readPermission,
          writePermission,
        );
      }
    } else {
      console.log('iOS permissions already configured');
    }
  } catch (err) {
    console.error('Error requesting permissions:', err);
  }
}

function Cameraa({ navigation }) {
  const camera = useRef(null);
  const devices = useCameraDevices();
  // const backCameras = devices.filter(device => device.position === 'back');
  // const device = backCameras[0];
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [torch, setTorch] = useState('off');
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(false); // State to disable the stop button initially
  const [forceStop, setForceStop] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoSource, setVideoSource] = useState('');
  const [showRecordedVideo, setShowRecordedVideo] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const handleBackButton = () => {
      if (isRecording) {
        toggleRecording();
        setForceStop(true);
        return true; // Prevent default behavior
      } else {
        setSelectedDevice(null);
        navigation.navigate('MainTab', {
          screen: 'Home',
        });
        return true; // Prevent default behavior
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove(); // Cleanup the event listener on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isRecording]);

  useEffect(() => {
    console.log('Devices:', devices);
    console.log('Selected Device:', selectedDevice);
    async function setup() {
      await requestPermissions();
      if (devices && devices.length > 0) {
        setSelectedDevice(devices[0]); // Set default camera on load
        console.log('Selected Device1111:', selectedDevice);

      }
    }
    setup();
    setShowModal(true);
  }, [devices]);
  const format = useCameraFormat(selectedDevice, [
    { videoResolution: { width: 1280, height: 720 }, pixelFormat: 'native' },
  ]);
  // const format = useCameraFormat(selectedDevice, [   { videoResolution: { width: 1920, height: 1080 }, pixelFormat: 'native' },  { videoResolution: { width: 1280, height: 720 }, pixelFormat: 'native' },   { videoResolution: { width: 640, height: 480 }, pixelFormat: 'native' }, ]);
  const closeModal = () => {
    setShowModal(false);
  };

  const toggleCameraView = () => {
    setShowCamera(prevState => !prevState);
  };
  const toggletorch = () => {
    if (torch === 'on') {
      setTorch('off');
    } else {
      setTorch('on');
    }
    console.log(torch);
  };

  const fileUriPrefix = Platform.OS === 'android' ? 'file://' : '';


  const switchCamera = () => {
    if (devices.length > 1 && selectedDevice) {
      const currentIndex = devices.findIndex(
        device => device.id === selectedDevice.id,
      );
      const nextIndex = (currentIndex + 1) % devices.length;
      setSelectedDevice(devices[nextIndex]);
    }
  };
  const navigateToHomeScreen = () => {
    if (isRecording) {
      toggleRecording();
      setForceStop(true); // Set the flag to indicate forced stop
      console.log('stopped recording moving to home', forceStop); // Stop recording if it's in progress
      console.log('moved to home from camera');
    } else {
      setSelectedDevice(null);
      // navigation.navigate('MainTab'); // Navigate to the Cameraa screen
      navigation.navigate('MainTab', {
        screen: 'Home',
      });
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        setTimer(0); // Reset timer when starting recording
        const interval = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1); // Increment timer every second
        }, 1000);
        setTimerInterval(interval);

        const recordingTimeout = setTimeout(async () => {
          // If recording exceeds 25 seconds, stop automatically
          clearInterval(interval); // Stop timer interval
          setIsRecording(false);
          setIsStopButtonDisabled(false); // Enable the stop button
          try {
            const video = await camera.current.stopRecording();
            setShowRecordedVideo(true);
            console.log('Recording automatically stopped after 25 seconds:');
          } catch (error) {
            console.error('Error stopping recording:', error);
            setIsRecording(false);
          }
        }, 25000); // 25 seconds timeout

        const video = await camera.current.startRecording({
          video: true,
          audio: true,
          videoBitrate: 'low',
          onRecordingError: error => {
            console.error('Recording error:', error);
            setIsRecording(false);
            clearTimeout(recordingTimeout); // Clear the automatic stop timeout on error
          },
          onRecordingFinished: async video => {
            setIsRecording(false);
            setVideoSource(fileUriPrefix + video.path);
            console.log('video FIIIIIILLLEEEE' + 'file://' + video.path);
            setShowRecordedVideo(true);
            console.log('Finished recording:', video, video.duration);
            clearTimeout(recordingTimeout); // Clear the automatic stop timeout on manual stop
            const videoDuration = video.duration; // Assuming video.duration gives the duration
            if (videoDuration < 10) {
              try {
                await deleteVideo(fileUriPrefix+ video.path);
                console.log(
                  'Video deleted as duration was less than 10 seconds',
                );
                navigation.replace('MainTab', {
                  screen: 'Home',
                });// Navigate to HomeScreen if video is deleted
                alert(
                  'Video deleted as minimum duration of 40seconds was not met',
                );
              } catch (error) {
                console.error('Error deleting video:', error);
                navigation.replace('Recorded', {
                  videoSource: fileUriPrefix + video.path,
                  videoDuration: videoDuration, // Pass video duration as a parameter
                });
              }
            } else {
              navigation.replace('Recorded', {
                videoSource: fileUriPrefix + video.path,
                videoDuration: videoDuration, // Pass video duration as a parameter
              }); // Proceed with original function if video duration is not less than 10 seconds
            }
          },
        });

        setIsRecording(true);
        setIsStopButtonDisabled(true); // Disable the stop button when recording starts
        console.log('Started recording');

        setTimeout(() => {
          setIsStopButtonDisabled(false);
        }, 10000); // Enable the stop button after 10 seconds
      } catch (error) {
        console.error('Error starting recording:', error);
        setIsRecording(false);
      }
    } else {
      clearInterval(timerInterval); // Stop the timer when recording stops

      try {
        const video = await camera.current.stopRecording();
        setIsRecording(false);
        setShowRecordedVideo(true);
        console.log('Stopped recording');
      } catch (error) {
        console.error('Error stopping recording:', error);
        setIsRecording(false);
      }
    }
  };
  const deleteVideo = async videoPath => {
    try {
      const deleted = await RNFS.unlink(videoPath);
      console.log(`Deleted video at ${videoPath}`);
      navigation.replace('MainTab', {
        screen: 'Home',
      });
      return deleted;
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      {selectedDevice !== null && (
        <Camera
          ref={camera}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '10%',
            bottom: '20%',
          }}
          device={selectedDevice}
          isActive={true}
          video={true}
          format={format}
          enableZoomGesture={true}
          torch={torch}
        />
      )}


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconspace} onPress={toggletorch}>
          <Icon
            name={torch === 'on' ? 'flash-off-outline' : 'flash-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconspacerec}
          onPress={toggleRecording}>
          <Image
            source={
              isRecording
                ? require('../../assets/images/recordstop.png')
                : require('../../assets/images/record.png')
            }
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <View style={styles.bottombuttonContainer} />
      </View>


      <View style={styles.closeContainer}>
        <TouchableOpacity
          style={[styles.iconspace]}
          onPress={navigateToHomeScreen}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.imageStyleClose}
          />
        </TouchableOpacity>
        {isRecording ? (
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        ) : (
          <View />
        )}
        <View style={styles.topbuttonContainer} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}>
        <View style={styles1.modalContainer}>
          <View style={styles1.modalContentContainer}>
            <Text style={styles1.modalTitle}>Note!</Text>
            <View style={styles1.bulletPoints}>
              <Text style={styles1.bulletItem}>
                - The video should be recorded in portrait only
              </Text>
              <Text style={styles1.bulletItem}>
                - The recorded video's duration should be minimum 40seconds and
                maximum 2minutes
              </Text>
              <Text style={styles1.bulletItem}>
                - Should not close while recording in progress
              </Text>
            </View>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles1.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  return formattedTime;
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  bulletPoints: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: 'black',
  },
  bulletItem: {
    fontSize: RFValue(15),
    marginBottom: 5,
    color: 'black',
    fontFamily: 'EBGaramond-VariableFont_wght',
  },
  closeText: {
    fontSize: RFValue(15),
    color: 'blue',
    marginTop: 10,
  },
});

export default Cameraa;
