/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 20,
      },
      bottombuttonContainer: {width: width * 0.21},
      topbuttonContainer: {width: width * 0.18},
      timerText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'red',
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: '#77c3ec',
        padding: 10,
        borderRadius: 8,
        margin: 10,
      },
      buttonrec: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 8,
        margin: 10,
      },
      imageStyle: {
        width: 65,
        height: 65,
      },
      imageStyleClose: {
        width: 25,
        height: 25,
      },

      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      closeContainer: {
        position: 'absolute',
        top: 20,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
    });
export default styles;
