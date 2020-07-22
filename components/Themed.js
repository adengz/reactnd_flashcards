import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Styles from '../styles/stylesheet';
import { black } from '../styles/palette';

export const CrossPlatformStatusBar = () => {
  const { theme } = useSelector(({ settings }) => settings);
  const themeColor = Themes[theme].colors.primary;

  return (
    <View style={[styles.statusBar, { backgroundColor: themeColor }]}>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
    </View>
  );
}

export const ThemedTouchableOpacityLight = ({ style={}, text, onPress, disabled=false }) => {
  const themeColor = useTheme().colors.primary;

  return (
    <TouchableOpacity
      style={[
        Styles.button,
        style,
        { borderColor: themeColor, opacity: disabled ? 0.6 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.lightButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export const ThemedTouchableOpacityDark = ({ style={}, text, onPress, disabled=false }) => {
  const themeColor = useTheme().colors.primary;

  return (
    <TouchableOpacity
      style={[
        Styles.button,
        style,
        { borderColor: themeColor, backgroundColor: themeColor, opacity: disabled ? 0.6 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={Styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export const ThemeColorPad = () => {
  const themeColor = useTheme().colors.primary;

  return <View style={[styles.colorPad, { backgroundColor: themeColor }]} />;
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  lightButtonText: {
    ...Styles.buttonText,
    color: black,
  },
  colorPad: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});