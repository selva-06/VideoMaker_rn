import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  containerTop: {
    alignItems: 'center',
    backgroundColor: 'rgba(195, 232, 47, 0.4)',
    width: windowWidth * 1.3,
    height: windowHeight * 0.54,
    borderRadius: 200,
    marginBottom: 40,
    marginTop: -60,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:160,
    height: windowHeight * 0.76,
  },
  profileImage: {
    height: windowHeight * 0.18,
    width: windowWidth * 0.34,
    resizeMode: 'contain',
  },
  myProfileText: {
    fontSize: RFValue(20),
    color: '#444444',
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 10,
  },

  userDetails: {
    fontSize: RFValue(18),
    color: '#444444',
    fontFamily: 'Poppins-SemiBold',
    // marginLeft: 4,
    marginRight: 20,
    // color:"red"
  },
  userInformation: {
    fontSize: RFValue(15),
    color: '#444444',
    fontFamily: 'Poppins-Medium',
    flexShrink: 1 
   
  },
  buttonContainer: {
    backgroundColor: '#444444',
    padding: 10,
    width: windowWidth * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 140,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#C3E82F',
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Medium',
  },
  lineargradient: {
    flexDirection: 'row',
    borderRadius: 10,
    width: windowWidth * 0.8,
    height: windowHeight * 0.09,
    alignItems: 'center',
    marginLeft: 30,
    
  },
});
export default styles;