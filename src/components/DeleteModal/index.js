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

const DeleteModal = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
 console.log(route.params);
 const {itemID} = route.params;

 const dispatch = useDispatch();
 const { loading, success } = useSelector(state => state.delete);


  const handleDeleteClick = () => {
    setModalVisible(true);
    console.log(itemID);
  };

  const handleDelete = async (type) => {
    try{
      console.log("RequestBody",  itemID, type);
      dispatch(deleteItemRequest(itemID,type));
      // if(type === 0){
      // alert('Item deleted successfully');}
      // else if(type === 1){
      //   alert('Video deleted successfully');
      // }else if (type=== 2){
      //   alert('Model deleted successfully');
      // }
      setModalVisible(false);
    }
    catch(error){
      console.error('error deleting item',error);
      alert(error);
    }
  } 

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
