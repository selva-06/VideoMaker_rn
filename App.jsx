import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {StatusBar, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store/Store';
import AppNavigator from './src/navigation/Navigation';

const App = () => {
  const navigationRef = useRef(null);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       console.log('HIAPP', token);
  //       const initialRoute = token ? 'Home' : 'Login';
  //       navigationRef.current?.navigate(initialRoute);
  //     } catch (error) {
  //       console.error('Error retrieving token:', error);
  //       navigationRef.current?.navigate('Login');
  //     }
  //   };

  //   checkToken();
  // }, []);

  return (
    <PaperProvider>
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: 'white',
          }}>
          <StatusBar backgroundColor="transparent" barStyle="default" />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </PaperProvider>
  );
};

export default App;
