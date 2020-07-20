import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import Themes from '../styles/themes';

export default function () {
  const theme = Themes.THU;
  const themeColor = theme.colors.primary;
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