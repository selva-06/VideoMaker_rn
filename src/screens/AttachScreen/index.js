// HomeScreen.js
import React, {useEffect} from 'react';
import {View, BackHandler, Text} from 'react-native';
import styles from './styles';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
const AttachScreen = ({navigation}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
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
  return (
    <View style={{flex:1,backgroundColor:'rgba(195, 232, 47, 0.3)',paddingLeft: 20}}>
        <Text style={{color:'black', fontSize: 20}}> Attach or record videos :</Text>
        <MenuComponent navigation={navigation} />
    </View>
  );
};

export default AttachScreen;
