import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {strings} from '../../util/Strings';
import {logout} from '../../store/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab2 = ({navigation, data, dispatch}) => {
  useEffect(() => {
    const handleBackDevice = () => {
      console.log('back');
      navigation.navigate('MainTab', {
        screen: 'Home',
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackDevice,
    );
    return () => backHandler.remove();
  }, [navigation]);
  console.log('hlo', data);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.profile}>
          <Image
            source={require('../../assets/images/Avatar.png')}
            style={styles.profileImage}
          />
          <Text style={styles.myProfileText}>
            {strings.profileScreen.profileText}
          </Text>
        </View>
      </View>
      <View style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.nameText}</Text>
        <Text style={styles.userInformation}>
          {userData && userData.firstname && userData.lastname
            ? `${userData.firstname} ${userData.lastname}`
            : strings.profileScreen.defName}
        </Text>
      </View>
      <View style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.mailText}</Text>
        <Text style={styles.userInformation}>
          {userData && userData.email
            ? userData.email
            : strings.profileScreen.defMail}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          dispatch(logout(navigation)); // Dispatch the logout action
        }}>
        <Text style={styles.buttonText}>{strings.profileScreen.logoutbtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  data: state.auth.data,
});

export default connect(mapStateToProps)(Tab2);
