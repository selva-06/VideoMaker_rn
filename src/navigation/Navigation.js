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

// import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Create the Tab Navigator
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
        // } else if (route.name === 'Scan') {
        //   iconName = focused ? 'add-circle' : 'add-circle-outline';

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
        // headerRight: () => (
        //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <MenuComponent navigation={navigation} />
        //   </View>
        // ),
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
        // tabBarIcon: ({ color, size }) => (
        //  <Icon name="add" size={size} color={color} />

        // ),
        // tabBarButton: (navigation) => <MenuComponent navigation={navigation} />,

        // headerRight: () => (
        //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <MenuComponent navigation={navigation} />
        //</View>
        //),
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
        // headerRight: () => (
        //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <MenuComponent navigation={navigation} />
        //   </View>
        // ),
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
      {/* <Stack.Screen
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
      /> */}
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
              style={{paddingRight:10}}>
              <Icon name={'arrow-back'} size={26} color={'#C3E82F'}/>

            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <DeleteModal />
              {/* <DeleteModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                handleDeleteBoth={handleDeleteBoth}
                handleDeleteModal={handleDeleteModal}
                handleDeleteVideo={handleDeleteVideo}></DeleteModal> */}
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
        name='WebView'
        component={AttachScreen}
        options={({navigation}) => ({headerShown:true,
          headerStyle: {
            backgroundColor: '#444444',
          },
          headerTitle: 'WebView',
          headerTitleAlign: 'left',
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainTab', {screen: 'Home'});
              }}
              style={{paddingRight:10}}>
              <Icon name={'arrow-back'} size={26} color={'#C3E82F'}/>

            </TouchableOpacity>
          ),})}
        />
    </Stack.Navigator>
  );
};

export default AppNavigator;
