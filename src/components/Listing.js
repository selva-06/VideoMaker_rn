// Listing.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Provider as PaperProvider,
  Menu,
  ProgressBar,
  ActivityIndicator,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import {uploadVideoRequest} from '../store/actions/UploadActions';
import {fetchListData} from '../store/actions/ListingActions';
import UploadModal from './ProgressLoader';
import SnackbarC from './SnackBar';
const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData); // Updated reducer reference
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  console.log('hi', uploadProgress, uploading);
  useEffect(() => {
    dispatch(fetchListData());
  }, [dispatch]);

  const imageSize = (windowWidth - 50) / 2;
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

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
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.menuTO}>
            <Image
              source={require('../assets/images/attach.png')}
              style={styles.menuAnchor}
            />
          </TouchableOpacity>
        }
        style={styles.menuItems}>
        <Menu.Item
          onPress={handleVideoUpload}
          title="Attach Files from Device"
        />
        <Menu.Item onPress={startRecordingVideo} title="Capture Video" />
      </Menu>
      <UploadModal />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <Image
            source={item.source}
            style={[styles.image, {width: imageSize}]}
            resizeMode="cover"
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    zIndex: 0,
  },
  image: {
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  menuTO: {marginLeft: 10, marginBottom: 10},
  menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
  menuItems: {marginTop: 30},
});

export default Listing;
