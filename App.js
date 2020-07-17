import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import Constants from 'expo-constants';
import { purple } from './utils/colors';

const GeneralStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GeneralStatusBar backgroundColor={purple} barStyle="light-content" />
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}