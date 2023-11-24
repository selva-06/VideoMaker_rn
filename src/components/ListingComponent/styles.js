/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const listingstyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    zIndex: 0,
  },
  image: {
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  menuTO: {marginLeft: 10, marginBottom: 10},
  menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
  menuItems: {marginTop: 30},
});
