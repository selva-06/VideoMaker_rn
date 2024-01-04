/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const menuStyles = StyleSheet.create({
  menutouch: {
    backgroundColor: '#444444',
    flex: 1,
    justifyContent: 'center',

  },
  menuItems: {
    position: 'absolute',
    top: '78%', // Adjust as needed to move the menu up
    left: '20%',

  },
  
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  //modal
  modalContainer: {
    width: '83%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 25,

  },
  ModalTitleText:{
    color:'#444444',
    fontSize: 15,
    textAlign: 'center',
    marginBottom:20,
    fontFamily: 'Poppins-Regular',

  },
  modalInputContainer: {
    borderColor: "grey",
    borderWidth: 1.8,
    borderRadius: 17,
    marginBottom: 10,
    paddingLeft: 12,
    height:windowHeight*0.07,

  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    color:"black",
  },
  buttonContainer: {
    backgroundColor: '#C3E82F',
    padding: 8,
    width: windowWidth * 0.27,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#444444',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },

});
