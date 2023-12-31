import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({ navigation, route }) => {
  const { videoPath, thumbnailPath, originalName, threeDFilePath } = route.params;
console.log('rrrvideopath',route.params);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ModelVideoScreen',{
          videoPath,
          thumbnailPath,
          originalName,
          threeDFilePath,
        });
      }}
      style={{ paddingRight:10}}
    >
      <Icon name="arrow-back" size={26} color="#C3E82F" />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
