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
} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';

const ModelVideoScreen = ({navigation, route}) => {
  const {videoPath, thumbnailPath, originalName, threeDFilePath} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  console.log('ROUTE_PARAMS', route.params);
  console.log('ThreeD', threeDFilePath);

  console.log('t', thumbnailPath);
  console.log('originalNameL', originalName);
  const handleButtonClick = () => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: videoPath,
      thumbnailPath: thumbnailPath,
      originalName: originalName,
      threeDFilePath: threeDFilePath,
    });
  };

  // const handleThumbNailClick = () => {
  //   console.log('thumb CLikced');
  //   navigation.navigate('WebView');
  // }
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [fileDestination, setFileDestination] = useState('');

  useEffect(()=>{
    console.log('useEffect')
    const checkFileExists = async () => {
      console.log('checking');
      const downloadDest = RNFS.DocumentDirectoryPath + '/' + originalName + '.usdz';
      const fileExists = await RNFS.exists(downloadDest);
      if(fileExists){
        setFileDestination(downloadDest);
        console.log('checked');
      }else{
        console.log('no');
      }
    };
    checkFileExists();
  },[originalName]);
  const handleThumbNailClick = async () => {
    console.log('clicked on thumb');
    const downloadDest =
      RNFS.DocumentDirectoryPath + '/' + originalName + '.usdz';

    const fileExists = await RNFS.exists(downloadDest);
    console.log('File exists:', fileExists);

    if (fileExists) {
      setFileDestination(downloadDest);
      alert('File already exists. Skipping download.');
      console.log('File already exists. Skipping download.');
      navigation.navigate('WebView',{downloadDest: downloadDest});
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
      });
    } catch (err) {
      console.log('Download Error', err);
      setDownloading(false);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 20}}>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
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
            {downloading && (
              <View>
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: '40%',
                    backgroundColor: 'black',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>{`${downloadProgress}%`}</Text>
              </View>
            )}
            {/* {fileDestination ? (
              <Text
              style={{
                color: 'black',
                paddingLeft: 20,
                fontSize: 20,
                marginTop: 0,
                fontWeight: 'bold',
              }}>
              File already exists at: {fileDestination}            
              </Text>
            ): null } */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleThumbNailClick}>
          <Image
            source={require('../../assets/images/b.png')}
            style={{
              width: Dimensions.get('window').width * 0.9,
              height: Dimensions.get('window').height * 0.28,
              borderRadius: 10,
              borderWidth: 2,
              marginVertical: 25,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            resizeMode="cover"></Image>
        </TouchableOpacity>

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
            ): null }
        <Text
          style={{
            color: 'black',
            paddingLeft: 20,
            fontSize: 14,
            marginTop: 10,
          }}>
          By clicking the first item user can view the video captured to convert
          it into a 3D model. By clicking the second item user can view the 3D
          model converted according to the video.
        </Text>
        <Text
          style={{
            color: 'black',
            paddingLeft: 20,
            fontSize: 14,
            marginTop: 10,
          }}>
          By clicking the first item user can view the video captured to convert
          it into a 3D model. By clicking the second item user can view the 3D
          model converted according to the video.
        </Text>
        <Text
          style={{
            color: 'black',
            paddingLeft: 20,
            fontSize: 14,
            marginTop: 10,
          }}>
          By clicking the first item user can view the video captured to convert
          it into a 3D model. By clicking the second item user can view the 3D
          model converted according to the video.
        </Text>
        <Text
          style={{
            color: 'black',
            paddingLeft: 20,
            fontSize: 14,
            marginTop: 10,
          }}>
          By clicking the first item user can view the video captured to convert
          it into a 3D model. By clicking the second item user can view the 3D
          model converted according to the video.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ModelVideoScreen;
