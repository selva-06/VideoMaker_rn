import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(195, 232, 47, 0.4)',
      paddingBottom: 80,
    },
    container1: {
      marginRight: 30,
      marginBottom: 120,
    },
    welcomeText: {
      fontSize: 48,
      color: '#444444',
      fontFamily: 'Poppins-Medium',
    },
    sideText: {
      fontSize: 19,
      fontFamily: 'Poppins-Medium',
      color: 'grey',
    },
    inputContainer: {
      width: 320,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    password: {
      position: 'absolute',
      right: 20,
      top: '25%', 
    },
    input: {
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 2,
      borderRadius: 20,
      width: '90%',
      height: 50,
      borderColor: 'grey',
      paddingBottom: 5,
      fontFamily: 'Poppins-Medium',
      marginTop: 10,
    },
    buttonContainer: {
      backgroundColor: '#444444', 
      width: 180,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: '#C3E82F',
      fontSize: 17,
      fontFamily: 'Poppins-Medium',
    },
    error: {
      color: 'red',
    },
    wosignin: {
      color: '#444444',
      textDecorationLine: 'underline',
      fontSize: 16,
      marginTop: 10,
    },
  });
  export default styles;
  