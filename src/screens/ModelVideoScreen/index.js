/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Screen} from 'react-native-screens';
import {showSnackbar} from '../../store/actions/UploadActions';
import api from '../../api/ApiKit';
import {deleteItemRequest} from '../../store/actions/DeleteActions';
import SnackBarC from '../../components/SnackBarComponent/SnackBar';

const ModelVideoScreen = ({navigation, route}) => {
  const {videoPath, thumbnailPath, originalName, threeDFilePath, itemID, itemDescription} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);
  console.log('ROUTE_PARAMS', route.params);
  console.log('ThreeD', threeDFilePath);
  const parts = threeDFilePath.split('/');
  const fileName = parts[parts.length - 1];

  console.log('fn', fileName);
  console.log('t', thumbnailPath);
  console.log('originalNameL', originalName);
  const handleButtonClick = () => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: videoPath,
      thumbnailPath: thumbnailPath,
      originalName: originalName,
      threeDFilePath: threeDFilePath,
      itemID: itemID,
      itemDescription: itemDescription,
    });
  };

  // const handleThumbNailClick = () => {
  //   console.log('thumb CLikced');
  //   navigation.navigate('WebView');
  // }
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [fileDestination, setFileDestination] = useState('');
  const [file, setFile] = useState(false);
  const {loading, success} = useSelector(state => state.delete);

  useEffect(() => {
    const handleBackDevice = () => {
      if (navigation.isFocused()) {
        navigation.replace('MainTab', {screen: 'Home'});
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);
  useEffect(() => {
    console.log('useEffect');
    const checkFileExists = async () => {
      if (!fileName || fileName.trim() === '') {
        alert('no filepath');
        console.log('no file path');
        setFileDestination('No File');
        setFile(false);
        return;
      }
      console.log('checking');
      const downloadDest = RNFS.DocumentDirectoryPath + '/' + fileName;
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) {
        setFileDestination('file://' + downloadDest);
        setFile(true);
        console.log('checked');
      } else {
        console.log('no');
      }
    };
    checkFileExists();
  }, [fileName, originalName]);
  const handleThumbNailClick = async () => {
    if (!fileName || fileName.trim() === '') {
      alert('no filepath');
      console.log('no file path');
      setFile(false);
      return;
    }
    console.log('clicked on thumb');
    const downloadDest = RNFS.DocumentDirectoryPath + '/' + fileName;

    const fileExists = await RNFS.exists(downloadDest);
    console.log('File exists:', fileExists);

    if (fileExists) {
      setFileDestination(downloadDest);
      setFile(true);
      alert('File already exists. Skipping download.');
      console.log('File already exists. Skipping download.');
      navigation.navigate('WebView', {
        downloadDest: downloadDest,
        videoPath: videoPath,
        thumbnailPath: thumbnailPath,
        originalName: originalName,
        threeDFilePath: threeDFilePath,
        itemID: itemID,
      });
      return;
    }

    const progress = data => {
      const percent = ((100 * data.bytesWritten) / data.contentLength) | 0;
      setDownloadProgress(percent);
    };

    const directoryContents = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    console.log('Directory contents:', directoryContents);

    const options = {
      fromUrl: threeDFilePath,
      toFile: downloadDest,
      progress,
      background: true,
      progressDivider: 1,
    };

    try {
      setDownloading(true);

      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        console.log('File downloaded to ', downloadDest);
        setDownloading(false);
        setFileDestination(downloadDest);
        setFile(true);
      });
    } catch (err) {
      console.log('Download Error', err);
      setDownloading(false);
    }
  };

  const dispatch = useDispatch();
  const handleDelete = async type => {
    // try {
    //   console.log('Request Body:', { id: itemID, type: type }); // Log request body

    //   const response = await api.post('assets/delete-file', {
    //     id: itemID,
    //     type: type,
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   console.log('Response:', response);
    try {
      console.log('Request Body:', {id: itemID, type: type});
      dispatch(deleteItemRequest(itemID, type)); // Correct payload structure
    } catch (error) {
      console.error('Error deleting item:', error);
    }

    //   if (response && response.status === 200) {
    //     showSnackbar('Item deleted successfully', 'success');
    //     alert('deleted'); // Navigate back after successful delete
    //   } else {
    //     console.log('r',response);
    //     showSnackbar('Failed to delete item', 'error');
    //   }
    // } catch (error) {
    //   console.error('Error deleting item:', error);
    //   showSnackbar('Failed to delete item', 'error');
    // }
  };

  return (
    <>
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 20}}>
          <View style={{backgroundColor: 'white', alignItems: 'center'}}>
            {/* <TouchableOpacity onPress={() => handleDelete(0)}>
              <Text style={{color: 'black'}}>Delete Entire Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(1)}>
              <Text style={{color: 'black'}}>Delete Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(2)}>
              <Text style={{color: 'black'}}>Delete Video</Text>
            </TouchableOpacity> */}
            {loading && (
              <View style={{marginTop: 20, backgroundColor: 'green'}}>
                <ActivityIndicator size="large" color="red" />
              </View>
            )}
{videoPath && (
            <TouchableOpacity onPress={handleButtonClick}>
              <Image
                source={{uri: thumbnailPath}}
                style={{
                  width: Dimensions.get('window').width * 0.9,
                  height: Dimensions.get('window').height * 0.28,
                  borderRadius: 10,
                  borderWidth: 2,
                  marginVertical: 25,
                  marginBottom: 10,
                }}
                resizeMode="cover"
              />
              <Image
                source={require('../../assets/images/play.png')}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '20%',
                  top: '45%',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
  )}
          </View>
{threeDFilePath && (
          <TouchableOpacity onPress={handleThumbNailClick}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/3dmodel.png')}
                style={{
                  width: Dimensions.get('window').width * 0.9,
                  height: Dimensions.get('window').height * 0.28,
                  borderRadius: 10,
                  borderWidth: 2,
                  marginVertical: 25,
                  alignSelf: 'center',
                  marginBottom: 10,
                  opacity: file ? 1 : 0.5,
                }}
                resizeMode="cover"
              />

              {downloading && (
                <View style={{position: 'absolute', padding: 10, top: '45%'}}>
                  <ActivityIndicator
                    size="800"
                    color="black"
                    style={{
                      alignSelf: 'center',
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      marginLeft: 0,
                      width: Dimensions.get('window').width * 0.14,
                      height: Dimensions.get('window').height * 0.07,
                      // marginTop: '30%',
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'black',
                      paddingTop: 5,
                      backgroundColor: 'transparent',
                      // paddingBottom:10,
                    }}>{`${downloadProgress}%`}</Text>
                </View>
              )}

              {!downloading && !file && (
                <Icon
                  name="download-outline"
                  size={50}
                  color="black"
                  style={{
                    position: 'absolute',
                    marginLeft: 0,
                    marginTop: '30%',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
)}
          <Text
            style={{
              color: 'black',
              paddingLeft: 20,
              fontSize: 20,
              marginTop: 0,
              fontWeight: 'bold',
            }}>
            {originalName}
          </Text>
          {fileDestination ? (
            <Text
              style={{
                color: 'black',
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 0,
                fontWeight: '400',
                fontStyle: 'italic',
              }}>
              File already exists at: {fileDestination}
            </Text>
          ) : null}
          <Text
            style={{
              color: 'black',
              paddingLeft: 20,
              fontSize: 14,
              marginTop: 10,
            }}>
            {itemDescription ? itemDescription : 'DESCRIPTION'}
          </Text>
        </View>
      </ScrollView>
      <SnackBarC />
    </>
  );
};

export default ModelVideoScreen;
