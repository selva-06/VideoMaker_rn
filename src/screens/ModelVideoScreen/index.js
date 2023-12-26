/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Button, TouchableOpacity, Image, Text} from 'react-native';

const ModelVideoScreen = ({navigation, route}) => {
  const {videoPath, thumbnailPath, originalName} = route.params;
console.log('t',thumbnailPath);
console.log('originalNameL', originalName);
  const handleButtonClick = () => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: videoPath,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor:'black'}}>
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
      <Text style={{color: 'white'}}>{originalName}</Text>
    </View>
  );
};

export default ModelVideoScreen;
