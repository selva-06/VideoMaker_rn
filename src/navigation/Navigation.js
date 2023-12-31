/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import ModelVideoScreen from '../screens/ModelVideoScreen';
import AttachScreen from '../screens/AttachScreen';
import {Image} from 'react-native';
import DeleteModal from '../components/DeleteModal';
import {useRoute} from '@react-navigation/native';
import HeaderLeft from '../components/BackArrow';
// import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        // Set the appropriate icon based on the route name
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
          color = '#C3E82F';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
          color = '#C3E82F';
        }

        // Return the vector icon component
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        borderTopWidth: 0,
        borderTopColor: 'transparent', // Reset border color
        elevation: 0,
      },

      tabBarShowLabel: false,
      tabBarActiveBackgroundColor: '#444444',
      tabBarInactiveBackgroundColor: '#444444',
      tabBarActiveTintColor: '#C3E82F',
      tabBarInactiveTintColor: '#C3E82F',
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        headerShown: true,
        tabBarIconStyle: {justifyContents: 'center', alignItems: 'center'},

        headerStyle: {
          backgroundColor: '#444444',
        },
        headerTintColor: 'white',
        headerLeft: () => null,
      })}
    />

    <Tab.Screen
      name="Scan"
      component={MenuComponent}
      options={({navigation}) => ({
        headerShown: true,
        tabBarLabel: 'Scan',
        headerStyle: {
          backgroundColor: '#444444',
        },
        headerTintColor: 'white',
        headerLeft: () => null,
        tabBarButton: () => <MenuComponent navigation={navigation} />,
      })}
    />
    <Tab.Screen
      name="Profile"
      component={Tab2}
      options={({navigation}) => ({
        headerShown: true,
        tabBarLabel: '',
        headerStyle: {
          backgroundColor: '#444444',
        },
        headerTintColor: 'white',
        headerLeft: () => null,
      })}
    />
  </Tab.Navigator>
);

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
      <Stack.Screen
        name="ModelVideoScreen"
        component={ModelVideoScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#444444',
          },
          headerTitle: 'Model',
          headerTitleAlign: 'left',
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainTab', {screen: 'Home'});
              }}
              style={{paddingRight: 10}}>
              <Icon name={'arrow-back'} size={26} color={'#C3E82F'} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <DeleteModal />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebView"
        component={AttachScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#444444',
          },
          headerTitle: 'WebView',
          headerTitleAlign: 'left',
          headerTintColor: 'white',
          headerLeft: () => (
            <HeaderLeft navigation={navigation} route={route} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
