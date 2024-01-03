/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
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
  button: {
    backgroundColor: 'rgba(195, 232, 47, 0.8)',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonrec: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  //modal
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    
  },
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
  input: {
    height:Dimensions.get('window').height*0.068,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width*0.7,
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

});
export default styles;
