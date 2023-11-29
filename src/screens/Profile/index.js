import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {strings} from '../../util/Strings';

const Tab2 = ({navigation, user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.profile}>
        <Image source={require('../../assets/images/Avatar.png') }
        style={styles.profileImage}/>
        <Text style={styles.myProfileText}>
        {strings.profileScreen.profileText}
      </Text>
      </View>
      </View>
      <View
        style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.nameText}</Text>
        <Text style={styles.userInformation}>
          {user && user.name ? user.name : strings.profileScreen.defName}
        </Text>
      </View>
      <View
        style={styles.lineargradient}>
        <Text style={styles.userDetails}>{strings.profileScreen.mailText}</Text>
        <Text style={styles.userInformation}>
          {user && user.email ? user.email : strings.profileScreen.defMail}
        </Text>
      </View>

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
