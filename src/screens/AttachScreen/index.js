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
        navigation.navigate('MainTab', {screen: 'Home'});
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

  const {downloadDest} = route.params;
  console.log('download', downloadDest);
  return (
    <WebView
      source={{uri: 'https://ravimk001.github.io/usdz-web-viewer/'}}
      // source={{uri: `file://${downloadDest}`}}

      // allowFileAccess={true}

      style={{flex: 1}}
    />
  );
};

export default AttachScreen;
