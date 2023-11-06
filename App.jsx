// src/App.js

import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './src/store/authReducer';
import authSaga from './src/store/authSaga';
import listReducer from './src/store/reducers/ListingReducer';
import watchFetchListData from './src/store/sagas/ListingSaga';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import rootReducer from './src/store/reducers/rindex';
// const rootReducer = combineReducers({
//   auth: authReducer,
//   list: listReducer, // Add the new reducer
// });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);
sagaMiddleware.run(watchFetchListData);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
