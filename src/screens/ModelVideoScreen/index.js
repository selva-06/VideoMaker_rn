/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Button, TouchableOpacity, Image} from 'react-native';

const ModelVideoScreen = ({navigation, route}) => {
  const {videoPath, thumbnailPath} = route.params;
console.log('t',thumbnailPath);
  const handleButtonClick = () => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: videoPath,
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleButtonClick}>
        <Image
          source={{uri: thumbnailPath}}
          style={{width: '100%', height: 200, marginVertical: 25,
            marginBottom: 10,
            }} // Adjust the dimensions as needed
          resizeMode="cover"
        />
        <Image
                  source={require('../../assets/images/play.png')}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '20%',
                    top: '45%'
                  }}
                  resizeMode="contain"
                />
      </TouchableOpacity>
    </View>
  );
};

export default ModelVideoScreen;
