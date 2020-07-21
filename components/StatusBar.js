import React from 'react';
import { View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Themes from '../styles/themes';

export default function () {
  const { theme } = useSelector(({ settings }) => settings);
  const themeColor = Themes[theme].colors.primary;

  return (
    <View style={{ backgroundColor: themeColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
    </View>
  );
}