/* eslint-disable prettier/prettier */
// HomeScreen.js
import React, {useEffect} from 'react';
import {View, BackHandler, Text} from 'react-native';
import styles from './styles';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import {WebView} from 'react-native-webview';

const AttachScreen = ({navigation, route}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      if (navigation.isFocused()) {
        navigation.replace('ModelVideoScreen', {
          videoPath: videoPath,
          thumbnailPath: thumbnailPath,
          originalName: originalName,
          threeDFilePath: threeDFilePath,
          itemID: itemID,
        });
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

  const {downloadDest, originalName, thumbnailPath, videoPath, threeDFilePath, itemID} =
    route.params;
  console.log('download', route.params);
  return (
    <WebView
      source={{uri: 'https://raviusdz.netlify.app/'}}
      // source={{uri: `file://${downloadDest}`}}

      // allowFileAccess={true}

      style={{flex: 1}}
    />
  );
};

export default AttachScreen;
