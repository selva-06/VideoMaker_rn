/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Menu} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {uploadVideoRequest} from '../../store/actions/UploadActions';
import {launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {strings} from '../../util/Strings';
import {menuStyles} from './styles';

const MenuComponent = ({navigation}) => {
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
      formData.append('video',{
        uri: result.uri,
        type: result.type,
        name: result.name,
      });
      formData.append('name', 'test'); //Append another key

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
      durationLimit: 120,
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
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
    // <RecordingScreen />;
  };
  const navigateToCameraScreen = () => {
    navigation.replace('Cameraa'); // Navigate to the Cameraa screen
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
            <Icon name="add" size={32} color="#C3E82F" />
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
    </>
  );
};

const styles = menuStyles;

export default MenuComponent;
