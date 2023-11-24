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
});
export default styles;
