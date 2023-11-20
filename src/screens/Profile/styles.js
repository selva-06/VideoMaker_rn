import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headText: {
    fontSize: 45,
    color: '#444444',
    fontFamily: 'Poppins-Medium',
    marginBottom: 40,
    marginTop: 70,
  },
  myProfileText: {
    fontSize: 20,
    color: '#9d9e9d',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 180,
    marginTop: 20,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(195, 232, 47, 0.4)',
    padding: 8,
    borderRadius: 10,
    width: 320,
    marginTop: 15,
  },
  userDetails: {
    fontSize: 20,
    color: '#444444',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 15,
  },
  userInformation: {
    fontSize: 18,
    color: '#444444',
    fontFamily: 'Poppins-Medium',
    marginLeft: 20,
    marginTop: 2,
  },
  buttonContainer: {
    backgroundColor: '#444444', // Background color of the button
    padding: 10,
    width: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: '#C3E82F',
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
  lineargradient: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    width: 320,
    marginTop: 15,
  },
});
export default styles;
