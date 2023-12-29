import React, {useState} from "react";
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    Dimensions,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/Ionicons';

const DeleteModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

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
    

    return(
<>
        {/* <View style={{alignSelf: 'flex-end', marginRight: 20}}> */}
        <TouchableOpacity onPress={handleDeleteClick}>
          <Icon name={'trash-sharp'} size={24} color={'#C3E82F'}/>
        </TouchableOpacity>
      {/* </View> */}
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
              padding: 20,
              paddingBottom: 5,
              paddingTop: 20,
              borderRadius: 20,
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
                        <Icon name={'trash-sharp'} size={40} color={'#C3E82F'} style={{paddingTop:10,paddingBottom:10}} />

              <Text style={{color: 'black', fontSize: 15, marginBottom: 10, marginTop: 10,textAlign: 'center', padding: 0}}>
                You can delete the video & model here if you are not satisfied
              </Text>
              <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>
            <TouchableOpacity onPress={handleDeleteVideo} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 14,fontWeight:'bold', padding: 5}}>
                Delete Video
              </Text>

            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>

            <TouchableOpacity onPress={handleDeleteModal} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 14,fontWeight:'bold', padding: 5}}>
                Delete Model
              </Text>

            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>

            <TouchableOpacity onPress={handleDeleteBoth} style={{padding: 8}}>
              <Text style={{color: 'red', fontSize: 14, fontWeight:'bold', padding: 5}}>
                Delete Both Model & Video
              </Text>
            </TouchableOpacity>
            <View style={{backgroundColor:'#f0f5f5', width: Dimensions.get('window').width*0.82, height: 1}}></View>
            <TouchableOpacity onPress={closeModal} style={{padding: 8}}>
                <Text style={{color: 'blue', fontSize: 14,fontWeight:'bold', padding: 5}}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </View> */}
      {/* </View> */}
      </>
    )
}

export default DeleteModal;