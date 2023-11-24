/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import {PERMISSIONS, request} from 'react-native-permissions';
import Video from 'react-native-video';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

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

function Cameraa({navigation}) {
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

  useEffect(() => {
    async function setup() {
      await requestPermissions();
      if (devices && devices.length > 0) {
        setSelectedDevice(devices[0]); // Set default camera on load
      }
    }
    setup();
  }, [devices]);
  const format = useCameraFormat(selectedDevice, [
    {videoResolution: {width: 640, height: 480}, pixelFormat: 'native'},
  ]);

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
      navigation.navigate('MainTab'); // Navigate to the Cameraa screen

      console.log('stopped recording moving to home', forceStop); // Stop recording if it's in progress
      console.log('moved to home from camera');
    } else {
      navigation.navigate('MainTab'); // Navigate to the Cameraa screen
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
          onRecordingFinished: video => {
            setIsRecording(false);
            setVideoSource('file://' + video.path);
            setShowRecordedVideo(true);
            console.log('Finished recording:', video);
            clearTimeout(recordingTimeout); // Clear the automatic stop timeout on manual stop
            navigation.navigate('Recorded', {
              videoSource: 'file://' + video.path,
            });

            //   clearTimeout(recordingTimeout);
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

  return (
    <View style={styles.container}>
      {selectedDevice !== null && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={selectedDevice}
          isActive={true}
          video={true}
          format={format}
          enableZoomGesture={true}
          torch={torch}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonrec} onPress={toggletorch}>
          <Icon
            name={torch === 'on' ? 'flash-off-outline' : 'flash-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonrec,
            isRecording && isStopButtonDisabled && {opacity: 0.5},
          ]}
          onPress={toggleRecording}
          disabled={isStopButtonDisabled}>
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
          style={styles.buttonrec}
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
    </View>
  );
}
const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
};

export default Cameraa;
