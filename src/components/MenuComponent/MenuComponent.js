// /* eslint-disable prettier/prettier */
// import React, {useState} from 'react';
// import {TouchableOpacity} from 'react-native';
// import {Menu} from 'react-native-paper';
// import DocumentPicker from 'react-native-document-picker';
// import {useDispatch} from 'react-redux';
// import {uploadVideoRequest} from '../../store/actions/UploadActions';
// import {launchCamera} from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {strings} from '../../util/Strings';
// import {menuStyles} from './styles';

// const MenuComponent = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const closeMenu = () => setMenuVisible(false);
//   const openMenu = () => setMenuVisible(true);

//   const handleVideoUpload = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.video],
//       });

//       console.log(result.uri, result.type, result.name, result.size);

//       const formData = new FormData();
//       formData.append('video',{
//         uri: result.uri,
//         type: result.type,
//         name: result.name,
//       });
//       formData.append('name', 'test'); //Append another key

//       dispatch(uploadVideoRequest(formData)); // Updated action reference
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         console.error('Error:', err);
//       }
//     }
//     closeMenu();
//   };

//   const startRecordingVideo = () => {
//     const options = {
//       mediaType: 'video',
//       videoQuality: 'high',
//       durationLimit: 120,
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose Photo from Custom Option',
//         },
//       ],
//     };

//     launchCamera(options, async response => {
//       if (response.didCancel) {
//         console.log('User cancelled video recording');
//       } else if (response.error) {
//         console.log('Error recording video:', response.error);
//       } else if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri;
//         const type = response.assets[0].type;
//         const fname = response.assets[0].fileName;
//         console.log('Video recorded:', uri);
//         console.log(type);
//         console.log(fname);
//         const form1 = new FormData();
//         form1.append('file', {
//           uri: uri,
//           type: type,
//           name: fname,
//         });
//         dispatch(uploadVideoRequest(form1)); // Updated action reference
//       }
//     });
//     closeMenu();
//     // <RecordingScreen />;
//   };
//   const navigateToCameraScreen = () => {
//     navigation.replace('Cameraa'); // Navigate to the Cameraa screen
//     closeMenu();
//   };

//   return (
//     <>
//       <Menu
//         visible={menuVisible}
//         onDismiss={() => {
//           setMenuVisible(false);
//           closeMenu();
//         }}
//         anchor={
//           <TouchableOpacity onPress={openMenu} style={styles.menuTO}>
//             <Icon name="add" size={32} color="#C3E82F" />
//           </TouchableOpacity>
//         }
//         style={styles.menuItems}>
//         <Menu.Item
//           onPress={handleVideoUpload}
//           title={strings.menu.attachText}
//         />
//         <Menu.Item
//           onPress={navigateToCameraScreen}
//           title={strings.menu.captureText}
//         />
//       </Menu>
//     </>
//   );
// };

// const styles = menuStyles;

// export default MenuComponent;

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
    setMenuVisible(false);}
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

      setModalVisible(true); // Open the modal for entering name and description

      // Storing video details from DocumentPicker result
      setVideoUri(result.uri); // Storing video URI
      setVideoName(result.name); // Setting the video name
      setVideoDescription(''); // Clear any previous description
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
      // Check if either name or description is empty
      console.log('Please enter both video name and description.');
      alert('Please enter both video name and description.');

      return; // Prevent upload if either field is empty
    }
    const formData = new FormData();
    formData.append('video', {
      uri: videoUri,
      type: 'video/mp4', // You might want to adjust the type accordingly
      name: videoName,
    });
    formData.append('name', videoName);
    formData.append('description', videoDescription);

    dispatch(uploadVideoRequest(formData));
    setModalVisible(false); // Close modal after upload
    setVideoDescription(''); // Reset description state after upload
    setVideoName(''); // Reset name state after upload
  };

  const navigateToCameraScreen = () => {
    // navigation.navigate('MainTab', {
    //   screen: 'Home',
    // });
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
          <TouchableOpacity onPress={openMenu} style={styles.menuTO} activeOpacity={5}>
            {/* <Icon name="add" size={32} color="#C3E82F" />
            {showSecondIcon && <Icon name="attach" size={32} color="black" />} */}

{showSecondIcon ? (
          <Icon name="add-circle" size={32} color="#C3E82F" />
        ) : (
          <Icon name="add-circle-outline" size={32} color="#C3E82F" />
        )}

            {/* <Icon name="attach" size={32} color="black" /> */}
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
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Enter Video Name"
              value={videoName}
              onChangeText={text => setVideoName(text)}
              color={'black'}
              autoFocus={true}
              editable={true} // Disable editing of the name
              style={{
                borderColor: videoName.trim() === '' ? 'red' : 'black',
                borderWidth: 1,
                padding: 10,
                backgroundColor: 'lightgrey',
              }}
            />
            <TextInput
              placeholder="Enter Video Description"
              value={videoDescription}
              placeholderTextColor={'black'}
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
              <Button title="Upload" onPress={uploadVideo} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
   </>
  );
};

const styles = menuStyles;

export default MenuComponent;
