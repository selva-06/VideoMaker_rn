/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';

const VideoPlayerScreen = ({route, navigation}) => {
  const {videoPath} = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };
  const navigateToHome = () => {
    navigation.replace('Home');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            Loading...Please Wait
          </Text>
        </View>
      )}
      <Video
        source={{uri: `http://34.203.231.237/${videoPath}`}}
        style={{flex: 1, height: '100%', width: '100%'}}
        resizeMode="contain"
        controls
        paused={false}
        onLoadStart={handleLoadStart} // Event when video starts loading
        onLoad={handleLoad} // Event when video is loaded
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={navigateToHome} // On press, navigate back to the previous screen
      >
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

{
  /* <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', marginTop: 20 }}>Loading...</Text></View>}  */
}
