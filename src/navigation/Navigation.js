/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import Tab2 from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuComponent from '../components/MenuComponent/MenuComponent';
import Cameraa from '../screens/CameraScreen/VisionCameraScreen';
import RecordedVideoScreen from '../screens/RecordedScreen/Recorded';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({navigation}) => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'; // Adjust icon names as per the icon pack
          color = '#C3E82F';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline'; // Adjust icon names as per the icon pack
          color = '#C3E82F';
        }

        // Return the vector icon component
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveBackgroundColor: '#444444',
      tabBarInactiveBackgroundColor: '#444444',
      tabBarActiveTintColor: '#C3E82F',
      tabBarInactiveTintColor: '#C3E82F',
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerStyle: {
          backgroundColor: '#444444',
        },
        headerTintColor: '#C3E82F',
        headerRight: () => <MenuComponent navigation={navigation} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Tab2}
      options={{
        headerStyle: {
          backgroundColor: '#444444',
        },
        headerTintColor: '#C3E82F',
      }}
    />
  </Tab.Navigator>
);
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTabNavigator}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
