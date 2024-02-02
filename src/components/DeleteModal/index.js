import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteItemRequest } from '../../store/actions/DeleteActions';
import RNFS from 'react-native-fs';

const DeleteModal = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
 console.log(route.params);
 const {itemID, threeDFilePath} = route.params;
 const parts = threeDFilePath.split('/');
  const fileName = parts[parts.length - 1];
  
  console.log('fn', fileName);

  const downloadDest = RNFS.DocumentDirectoryPath + '/' + fileName;

    // const fileExists = RNFS.exists(downloadDest);
    // console.log('ex!!!!!!',fileExists);
    console.log('File 1111111:', downloadDest);


 const dispatch = useDispatch();
 const { loading, success } = useSelector(state => state.delete);


  const handleDeleteClick = () => {
    setModalVisible(true);
    console.log(itemID);
  };

  // const handleDelete = async (type) => {
  //   try{
  //     console.log("RequestBody",  itemID, type);
  //     dispatch(deleteItemRequest(itemID,type));
  //     if(type === 2){
  //       // alert('Item deleted successfully');
  //     alert("CCCCCCCCCCCCCCCCCCCCCC");
  //     const fileExists = await RNFS.exists(downloadDest);
  //     alert('iiiiiiiiiiiiiiiiiiii',downloadDest);
  //     if (fileExists && !fileName.trim()) {
  //       await RNFS.unlink(downloadDest);
  //       console.log('wuunnnnnnnnn',fileExists);
  //       console.log("CALLLED");
  //       console.log('File deleted successfully');
  //     } else {
  //       alert('File not found for deletion');
  //     }
  //   }
  //     // if(type === 0){
  //     // alert('Item deleted successfully');}
  //     // else if(type === 1){
  //     //   alert('Video deleted successfully');
  //     // }else if (type=== 2){
  //     //   alert('Model deleted successfully');
  //     // }
  //     setModalVisible(false);
  //   }
  //   catch(error){
  //     console.error('error deleting item',error);
  //     alert(error);
  //   }
  // } 

  const handleDelete = async (type) => {
    try {
      console.log("RequestBody", itemID, type);
      dispatch(deleteItemRequest(itemID, type));
      if (!downloadDest.trim()) {
      if (type === 2) {
        alert("CCCCCCCCCCCCCCCCCCCCCC");
  
        if (!downloadDest.trim()) {
          alert('Destination is empty. Cannot delete cache.');
        } else {
          const fileExists = await RNFS.exists(downloadDest);
          alert('iiiiiiiiiiiiiiiiiiii', downloadDest);
  
          if (fileExists) {
            await RNFS.unlink(downloadDest);
            console.log('wuunnnnnnnnn', fileExists);
            console.log("CALLLED");
            console.log('File deleted successfully');
          } else {
            alert('File not found for deletion');
          }
        }
      }
    }else{alert('dsjfsdhi')};
      setModalVisible(false);
    } catch (error) {
      console.error('error deleting item', error);
      alert(error);
    }
  }
  



  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleDeleteClick}>
        <Icon name={'trash-sharp'} size={24} color={'#C3E82F'} />
      </TouchableOpacity>
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
            <Icon
              name={'trash-sharp'}
              size={40}
              color={'#C3E82F'}
              style={{paddingTop: 10, paddingBottom: 10}}
            />

            <Text
              style={{
                color: 'black',
                fontSize: 15,
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center',
                padding: 0,
              }}>
              You can delete the video & model here if you are not satisfied
            </Text>
            <View
              style={{
                backgroundColor: '#f0f5f5',
                width: Dimensions.get('window').width * 0.82,
                height: 1,
              }}></View>
            <TouchableOpacity onPress={() => handleDelete(1)} style={{padding: 8}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontWeight: 'bold',
                  padding: 5,
                }}>
                Delete Video
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#f0f5f5',
                width: Dimensions.get('window').width * 0.82,
                height: 1,
              }}></View>

            <TouchableOpacity onPress={() => handleDelete(2)} style={{padding: 8}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontWeight: 'bold',
                  padding: 5,
                }}>
                Delete Model
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#f0f5f5',
                width: Dimensions.get('window').width * 0.82,
                height: 1,
              }}></View>

            <TouchableOpacity onPress={() => handleDelete(0)}style={{padding: 8}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontWeight: 'bold',
                  padding: 5,
                }}>
                Delete Entire Item
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#f0f5f5',
                width: Dimensions.get('window').width * 0.82,
                height: 1,
              }}></View>
            <TouchableOpacity onPress={closeModal} style={{padding: 8}}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 14,
                  fontWeight: 'bold',
                  padding: 5,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )} */}
    </>
  );
};

export default DeleteModal;
