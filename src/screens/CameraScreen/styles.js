/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      buttonContainer: {
        position: 'relative',
        backgroundColor:'transparent',
        height:height,
      },
      buttonContainer3:{
        position: 'absolute',
        bottom:0,
        flexDirection: 'row',
        backgroundColor:'transparent',
        borderColor: 'grey',
        width: width,
        padding:0,
        margin:0,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1

      },
      buttonContainer1: {
        position: 'relative',
        // bottom: -35,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // flex: 1,
        // flexGrow: 1,
        width: width,
        height:height,
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
