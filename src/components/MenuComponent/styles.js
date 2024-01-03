/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
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
  //modal
  modalContainer: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    
  },
  textfocus: {
    backgroundColor: 'blue',
    color: 'red',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  
  modalBackground: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',x
    // alignItems: 'center',
    // height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
