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
          <Text style={styles.buttonTextCancel}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTick}
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
        <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text style={styles.ModalTitleText}>Enter Video Details:</Text>
            <TextInput
              style={styles.modalInputContainer}
              value={videoName}
              onChangeText={text => setVideoName(text)}
              placeholder="Video Name"
              placeholderTextColor={'grey'}
            />
            <TextInput
              style={styles.modalInputContainer}
              value={videoDescription}
              onChangeText={text => setVideoDescription(text)}
              placeholder="Video Description"
              placeholderTextColor={'grey'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
               
              }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  setVideoName('');
                  setVideoDescription('');
                  setModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  if (!videoName.trim() || !videoDescription.trim()) {
                    alert('Please enter both video name and description.');
                    setModalVisible(true);
                  } else {
                    uploadVideo();
                  }
                }}
                disabled={uploading}>
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RecordedVideoScreen;
