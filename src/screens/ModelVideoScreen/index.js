/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, Button, TouchableOpacity, Image, Text, Modal, Dimensions} from 'react-native';

const ModelVideoScreen = ({navigation, route}) => {
  const {videoPath, thumbnailPath, originalName} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  console.log('t', thumbnailPath);
  console.log('originalNameL', originalName);
  const handleButtonClick = () => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: videoPath,
    });
  };

  const handleDeleteClick = () => {
    setModalVisible(true);
  };

  const handleDeleteVideo = () => {
    alert('Video deleted successfully');
    setModalVisible(false);
  };

  const handleDeleteModal = () => {
    alert('Modal deleted successfully');
    setModalVisible(false);
  };

  const handleDeleteBoth = () => {
    alert('Both Video & modal are deleted successfully');
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <TouchableOpacity onPress={handleDeleteClick}>
        <Text style={{color: 'black'}}>Delete</Text>
      </TouchableOpacity> */}
      <View style={{alignSelf: 'flex-end', marginRight: 20}}>
        <TouchableOpacity onPress={handleDeleteClick}>
          <Image
            source={require('../../assets/images/delete.png')}
            style={{width: 30, height: 30, top: 10}}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleButtonClick}>
        <Image
          source={{uri: thumbnailPath}}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 25,
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
            top: '45%',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={{color: 'black', padding: 20, fontSize: 18, paddingBottom: 0}}>
        NAME :
      </Text>
      <Text
        style={{color: 'black', paddingLeft: 80, fontSize: 16, marginTop: 0}}>
        {originalName}
      </Text>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: 20,
              paddingBottom: 5,
              paddingTop: 20,
              borderRadius: 10,
              alignItems: 'center',
              margin: 20,
            }}>
            {/* <View style={{position: 'absolute', top: 0, right: 20}}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={{color: 'blue', fontSize: 25}}>X</Text>
              </TouchableOpacity>
            </View> */}
            {/* <Text style={{color: 'black', fontSize: 20,fontWeight:'bold', marginBottom: 15}}>
                DELETE
              </Text> */}
              <Image 
                  source={require('../../assets/images/delete.png')}
                  style={{width:50, height: 50}}></Image>
              <Text style={{color: 'black', fontSize: 15, marginBottom: 10, marginTop: 10,textAlign: 'center', padding: 30}}>
                You can delete the video & modal here if you are not satisfied
              </Text>
              <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>
            <TouchableOpacity onPress={handleDeleteVideo} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 16, padding: 5}}>
                Delete Video
              </Text>

            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>

            <TouchableOpacity onPress={handleDeleteModal} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 16, padding: 5}}>
                Delete Modal
              </Text>

            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>

            <TouchableOpacity onPress={handleDeleteBoth} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 16, padding: 5}}>
                Delete Both Modal & Video
              </Text>
            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>
            <TouchableOpacity onPress={closeModal} style={{padding: 8}}>
                <Text style={{color: 'blue', fontSize: 16, padding: 5}}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModelVideoScreen;
