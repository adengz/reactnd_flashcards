import React from 'react';
import { StatusBar, View } from 'react-native';
import Constants from 'expo-constants';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import StackNavigator from './navigators/StackNavigator';
import Themes from './styles/themes';

const GeneralStatusBar = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function App() {
  const theme = Themes.THU;
  const statusBarProps = {
    backgroundColor: theme.colors.primary,
    barStyle: 'light-content'
  };

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <GeneralStatusBar {...statusBarProps} />
        <StackNavigator />
      </View>
    </Provider>
  );
}