/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  bottombuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
  video: {
    width: '100%',
    height: '80%',
  },
  imageStyleClose: {
    width: 25,
    height: 25,
  },
  buttonTick: {
    backgroundColor: 'rgba(195, 232, 47, 0.8)',
    padding: 9,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonrec: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonTextCancel: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginLeft:10,
  },
  //modal
  
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  buttonModal: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonTextModal: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
export default styles;
