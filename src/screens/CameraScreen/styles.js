/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
console.log("SCRENNNNNNN-11-", height,width);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'black',
      },
      buttonContainer:{
        top:"79%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       
        // backgroundColor:'transparent',
        // borderColor: 'grey',
        // width: width,
        // padding:0,
        // margin:0,
        // position: 'absolute',
        // borderWidth: 1

      },
      bottombuttonContainer: {width: width * 0.2},
      topbuttonContainer: {width: width * 0.18},

      timerText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'red',
        paddingHorizontal: 12,
        borderRadius:6,  
      },
      button: {
        backgroundColor: '#77c3ec',
        padding: 10,
        borderRadius: 8,
        margin: 10,
      },
      iconspace: {
        padding: 10,
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
        top: '1%',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
    });
export default styles;
