/* eslint-disable prettier/prettier */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Tab2 from '../screens/Tab2';
import HomeIcon from '../assets/images/vid.png';
import { Image } from 'react-native';
import ProfileIcon from '../assets/images/pro.png';
import { Dimensions } from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const MainTabNavigator = () => (

    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 16, }, // Set the desired font size here
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: ({focused}) => (
            <Image
              source={focused ? HomeIcon : HomeIcon}
              style={{width: width * 0.085, height: height * 0.040, marginTop:5}}
            />
          ),}} />
      <Tab.Screen name="Profile" component={Tab2} options={{ headerShown: false, tabBarIcon: ({focused}) => (
            <Image
              source={focused ? ProfileIcon : ProfileIcon}
              style={{width: width * 0.07, height: height * 0.033, marginTop:3}}
            />
          ),}} />
    </Tab.Navigator>
  );
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
