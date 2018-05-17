import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import RootStack from './src/components/RootStack';

const App = () => {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <View style={{ flex: 1 }}>
        <RootStack />
      </View>
    </Provider>
  )
};

export default App;
