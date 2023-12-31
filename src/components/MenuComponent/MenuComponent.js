/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, View, TextInput, Button, Modal} from 'react-native';
import {Menu} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {uploadVideoRequest} from '../../store/actions/UploadActions';
import {strings} from '../../util/Strings';
import {menuStyles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoDetailsModal from '../NameDescriptionModal';

const MenuComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [videoDescription, setVideoDescription] = useState('');
  const [videoUri, setVideoUri] = useState('');
  const [videoName, setVideoName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showSecondIcon, setShowSecondIcon] = useState(false);

  const closeMenu = () => {
    setShowSecondIcon(!showSecondIcon);
    setMenuVisible(false);
  };
  const openMenu = () => {
    setShowSecondIcon(!showSecondIcon);
    setMenuVisible(true);
  };

  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });

      console.log(result.uri, result.type, result.name, result.size);

      setModalVisible(true);

      setVideoUri(result.uri);
      setVideoName(result.name);
      setVideoDescription('');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error:', err);
      }
    }
    closeMenu();
  };

  const uploadVideo = () => {
    if (!videoName.trim() || !videoDescription.trim()) {
      console.log('Please enter both video name and description.');
      alert('Please enter both video name and description.');

      return;
    }
    const formData = new FormData();
    formData.append('video', {
      uri: videoUri,
      type: 'video/mp4',
      name: videoName,
    });
    formData.append('name', videoName);
    formData.append('description', videoDescription);

    dispatch(uploadVideoRequest(formData));
    setModalVisible(false);
    setVideoDescription('');
    setVideoName('');
  };

  const navigateToCameraScreen = () => {
    navigation.replace('Cameraa');
    closeMenu();
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={() => {
          setMenuVisible(false);
          closeMenu();
        }}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            style={styles.menuTO}
            activeOpacity={5}>
            {showSecondIcon ? (
              <Icon name="add-circle" size={32} color="#C3E82F" />
            ) : (
              <Icon name="add-circle-outline" size={32} color="#C3E82F" />
            )}
          </TouchableOpacity>
        }
        style={styles.menuItems}>
        <Menu.Item
          onPress={handleVideoUpload}
          title={strings.menu.attachText}
        />
        <Menu.Item
          onPress={navigateToCameraScreen}
          title={strings.menu.captureText}
        />
      </Menu>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Video Name"
              // value={videoName}
              onChangeText={text => setVideoName(text)}
              placeholderTextColor={'grey'}
              color={'black'}
              autoFocus={true}
              editable={true}
              style={{
                borderColor: videoName.trim() === '' ? 'red' : 'black',
                borderWidth: 1,
                padding: 10,
                backgroundColor: 'lightgrey',
              }}
            />
            <TextInput
              placeholder="Video Description"
              value={videoDescription}
              placeholderTextColor={'grey'}
              color={'black'}
              onChangeText={text => setVideoDescription(text)}
              style={{
                borderColor: videoName.trim() === '' ? 'red' : 'black',
                borderWidth: 1,
                padding: 10,
                backgroundColor: 'lightgrey',
              }}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Upload" onPress={uploadVideo} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = menuStyles;

export default MenuComponent;
