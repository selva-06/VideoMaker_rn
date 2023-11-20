import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {strings} from '../../util/Strings';

const Tab2 = ({navigation, user}) => {
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
          {user && user.name ? user.name : strings.profileScreen.defName}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.5)', 'rgba(255, 255, 255, 0.4)']}
        start={{x: 0, y: 0}} // Left side of the container
        end={{x: 1, y: 0}}
        style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.mailText}</Text>
        <Text style={styles.userInformation}>
          {user && user.email ? user.email : strings.profileScreen.defMail}
        </Text>
      </LinearGradient>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonText}>{strings.profileScreen.logoutbtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Tab2);
