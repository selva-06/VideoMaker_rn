import {StyleSheet,Dimensions} from 'react-native';
import {  RFValue } from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    justifyContent:"center",
    paddingBottom:40,    },
  headText: {
    fontSize: RFValue(35),
    color: '#444444',
    fontFamily: 'Poppins-Medium',
    marginBottom: 40,
  },
  myProfileText: {
    fontSize: RFValue(18),
    color: '#9d9e9d',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 180,
    marginTop: 0,
    marginBottom: 10,
  },

  userDetails: {
    fontSize: RFValue(17),
    color: '#444444',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 4,
  },
  userInformation: {
    fontSize: RFValue(16),
    color: '#444444',
    fontFamily: 'Poppins-Medium',
    marginLeft: 20,
  },
  buttonContainer: {
    backgroundColor: '#444444', // Background color of the button
    padding: 10,
    width: windowWidth*0.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#C3E82F',
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Medium',
  },
  lineargradient: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    width: windowWidth*0.8,
    height:windowHeight*0.09,
    marginTop: 15,
    alignItems: 'center',
  },
});
export default styles;
