import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Tab2 = ({navigation, user}) => {
 
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Welcome</Text>
      <Text style={styles.myProfileText}>My Profile:</Text>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.5)', 'rgba(255, 255, 255, 0.4)']}
        start={{x: 0, y: 0}} // Left side of the container
        end={{x: 1, y: 0}}
        style={{
          flexDirection: 'row',
          padding: 15,
          borderRadius: 10,
          width: 320,
          marginTop: 15,
        }}>
        <Text style={styles.userDetails}>Name:</Text>
        <Text style={styles.userInformation}>
          {user && user.name ? user.name : 'Guest'}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={['rgba(195, 232, 47, 0.5)', 'rgba(255, 255, 255, 0.4)']}
        start={{x: 0, y: 0}} // Left side of the container
        end={{x: 1, y: 0}}
        style={{
          flexDirection: 'row',
          padding: 15,
          borderRadius: 10,
          width: 320,
          marginTop: 15,
        }}>
        <Text style={styles.userDetails}>Email:</Text>
        <Text style={styles.userInformation}>
          {user && user.email ? user.email : 'XX@g.c'}
        </Text>
      </LinearGradient>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Tab2);

