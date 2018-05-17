import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Header } from './components/common';
import { RootStack } from './components/RootStack';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <View style={{ flex: 1 }}>
        <RootStack />
      </View>
    </Provider>
  );
};

export default App;
