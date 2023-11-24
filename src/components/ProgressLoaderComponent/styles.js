/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const modalStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  progressText: {
    color: 'white',
  },
  errorText: {
    color: 'white',
  },
};
