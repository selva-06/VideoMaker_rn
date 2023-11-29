import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {strings} from '../../util/Strings';
import {logout} from '../../store/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Tab2 = ({navigation, data, dispatch}) => {
  console.log('hlo', data);
  const [userData, setUserData] = useState(null); // State to hold user data

  // Function to fetch and set user data from AsyncStorage
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
    fetchUserData(); // Fetch user data on component mount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{strings.profileScreen.welcomeText}</Text>
      <Text style={styles.myProfileText}>
        {strings.profileScreen.profileText}
      </Text>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.5)', 'rgba(255, 255, 255, 0.4)']}
        start={{x: 0, y: 0}} // Left side of the container
        end={{x: 1, y: 0}}
        style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.nameText}</Text>
        <Text style={styles.userInformation}>
          {userData && userData.firstname && userData.lastname
            ? `${userData.firstname} ${userData.lastname}`
            : strings.profileScreen.defName}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.5)', 'rgba(255, 255, 255, 0.4)']}
        start={{x: 0, y: 0}} // Left side of the container
        end={{x: 1, y: 0}}
        style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.mailText}</Text>
        <Text style={styles.userInformation}>
          {userData && userData.mobile
            ? userData.mobile
            : strings.profileScreen.defMail}
        </Text>
      </LinearGradient>

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
