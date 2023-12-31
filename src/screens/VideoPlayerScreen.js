/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
import {RFValue} from 'react-native-responsive-fontsize';

const VideoPlayerScreen = ({route, navigation}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      navigation.replace('ModelVideoScreen', {
        videoPath: videoPath,
        thumbnailPath: thumbnailPath,
        originalName: originalName,
        threeDFilePath: threeDFilePath,
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);
  const {videoPath, thumbnailPath, originalName, threeDFilePath} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  console.log('ROUTE_PARAMS', route.params);
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };
  const navigateToHome = () => {
    navigation.replace('ModelVideoScreen', {
      videoPath: videoPath,
      thumbnailPath: thumbnailPath,
      originalName: originalName,
      threeDFilePath: threeDFilePath,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
      }}>
      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Dimensions.get('window').height * 0.25,
          }}>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: RFValue(20),
              alignSelf: 'center',
              margin: '20%',
              fontFamily: 'EBGaramond-VariableFont_wght',
            }}>
            Loading...
          </Text>
        </View>
      )}
      <Video
        source={{uri: `http://34.234.122.64/${videoPath}`}}
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        resizeMode="contain"
        controls
        paused={false}
        onLoadStart={handleLoadStart} // Event when video starts loading
        onLoad={handleLoad} // Event when video is loaded
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '2%',
          left: '7%',
          backgroundColor: 'rgba(195, 232, 47,0.7)',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={navigateToHome}>
        <Image
          source={require('../assets/images/close.png')}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayerScreen;
