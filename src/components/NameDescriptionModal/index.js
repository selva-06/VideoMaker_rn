import React from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
const VideoDetailsModal = ({
  modalVisible,
  setModalVisible,
  videoName,
  setVideoName,
  videoDescription,
  setVideoDescription,
  uploadVideo,
  uploading,
}) => {
  return (
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
          <TouchableOpacity
            style={styles.button}
            onPress={uploadVideo}
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
  );
};

export default VideoDetailsModal;
