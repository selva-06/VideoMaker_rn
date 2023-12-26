/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const menuStyles = StyleSheet.create({
  menuTO: {marginLeft: 0, marginBottom: 0, marginRight: 0, backgroundColor: '#444444', flex:1,justifyContent:'center'},
  menuItems: {paddingBottom: 50, marginLeft: 80},
  //modal
  modalContainer: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
  },
  textfocus:{
    backgroundColor:'blue',
    color:'red'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  // modalContent: {
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 20,
  //   width: '80%', // Adjust the width as needed
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   padding: 10,
  //   marginBottom: 15,
  //   width: '100%',
  // },
  // button: {
  //   backgroundColor: '#DDDDDD',
  //   padding: 10,
  //   marginBottom: 10,
  //   width: '100%',
  //   alignItems: 'center',
  // },
  modalBackground : {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50

  }

});
