/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import Tab2 from '../screens/Profile';
import MenuComponent from '../components/MenuComponent/MenuComponent';
import Cameraa from '../screens/CameraScreen/VisionCameraScreen';
import RecordedVideoScreen from '../screens/RecordedScreen/Recorded';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity} from 'react-native';
import LoadingScreen from '../screens/Loading';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Loading" headerMode="none">
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'Home',
          headerStyle: {
            backgroundColor: '#444444',
          },
          headerTintColor: '#C3E82F',
          headerLeft: () => '',
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MenuComponent navigation={navigation} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}
                style={{marginLeft: 10}}>
                <Icon name="person" size={22} color="#C3E82F" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Tab2}
        options={({navigation}) => ({
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#444444',
          },
          // headerLeft: () => '',
          headerTintColor: '#C3E82F',
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MenuComponent navigation={navigation} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}
                style={{marginLeft: 10}}>
                <Icon name="home" size={22} color="#C3E82F" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Cameraa"
        component={Cameraa}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recorded"
        component={RecordedVideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
