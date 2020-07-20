import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import StatusBar from './components/StatusBar';
import StackNavigator from './navigators/StackNavigator';

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <StackNavigator />
      </View>
    </Provider>
  );
}