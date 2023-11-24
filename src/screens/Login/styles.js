import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(195, 232, 47, 0.4)',
    paddingBottom: 80,
  },
  container1: {
    width: windowWidth * 0.9,
    marginBottom: windowHeight * 0.14,
    marginLeft: 55,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: RFValue(45),
    color: '#444444',
    fontFamily: 'Poppins-Medium',
  },
  sideText: {
    fontSize: RFValue(18),
    fontFamily: 'Poppins-Medium',
    color: 'grey',
  },
  inputContainer: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.05,
  },
  errorContainer: {height: windowHeight * 0.0289},
  password: {
    position: 'absolute',
    // right: "6%",
    // top: '16%',
    height: windowHeight * 0.143,
    right: windowWidth * 0.06,
  },
  input: {
    color: 'black',
    paddingLeft: windowWidth * 0.04,
    borderWidth: 2,
    borderRadius: 20,
    width: '87%',
    height: '38%',
    borderColor: 'grey',
    fontFamily: 'Poppins-Medium',
    marginTop: windowHeight * 0.013,
    fontSize: RFValue(13),
  },
  buttonContainer: {
    backgroundColor: '#444444',
    width: '60%',
    height: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.08,
  },
  buttonText: {
    color: '#C3E82F',
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Medium',
  },
  error: {
    color: 'red',
  },
  wosignin: {
    color: '#444444',
    textDecorationLine: 'underline',
    fontSize: RFValue(14),
    marginTop: windowHeight * 0.02,
  },
});
export default styles;
