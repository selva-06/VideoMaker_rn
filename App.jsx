import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { StatusBar, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/store/Store';
import AppNavigator from './src/navigation/Navigation';
import { navigationRef } from './src/navigation/navFunctions';

const App = () => {

  const renderMain = () => {
    return (
      <>
        <StatusBar backgroundColor="#444444" />
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </>
    )
  }

  const renderMainContent = () => {
    if(Platform.os === 'android') {
      return(
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: 'white',
          }}>
            {renderMain()}
        </SafeAreaView>
      )
    }

    return renderMain()
  }

  return (
    <PaperProvider>
      <Provider store={store}>
        {renderMainContent()}
      </Provider>
    </PaperProvider>
  );
};

export default App;
