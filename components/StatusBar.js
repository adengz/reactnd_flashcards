import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Themes from '../styles/themes';

export default function () {
  const { theme } = useSelector(({ settings }) => settings);
  const themeColor = Themes[theme].colors.primary;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor,
      height: Constants.statusBarHeight,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
    </View>
  );
}