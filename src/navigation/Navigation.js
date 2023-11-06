/* eslint-disable prettier/prettier */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Tab2 from '../screens/Tab2';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Create the Tab Navigator

const MainTabNavigator = () => (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 16, }, // Set the desired font size here
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Tab2} options={{ headerShown: false}} />
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
