/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import {Menu} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {uploadVideoRequest} from '../store/actions/UploadActions';
import {launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuComponent = ({style}) => {
    const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);
  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });

      console.log(result.uri, result.type, result.name, result.size);

      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: result.type,
        name: result.name,
      });

      dispatch(uploadVideoRequest(formData)); // Updated action reference
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error:', err);
      }
    }
    closeMenu();
  };

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
          <TouchableOpacity onPress={openMenu} style={styles.menuTO}>
            {/* <Image
              source={require('../assets/images/attach.png')}
              style={styles.menuAnchor}
            /> */}
            <Icon name="add" size={32} color="#C3E82F" />
          </TouchableOpacity>
        }
        style={styles.menuItems}>
        {/* <Menu.Item
          onPress={() => handleMenuPress(handleVideoUpload)}
          title="Attach Files from Device"
        />
        <Menu.Item
          onPress={() => handleMenuPress(startRecordingVideo)}
          title="Capture Video"
        /> */}
        <Menu.Item
          onPress={handleVideoUpload}
          title="Attach Files from Device"
        />
        <Menu.Item onPress={startRecordingVideo} title="Capture Video" />
      </Menu>
    </>
  );
};
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  menuTO: {marginLeft: 0, marginBottom: 0, marginRight: 10},
  menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
  menuItems: {marginTop: 30},
});

export default MenuComponent;
