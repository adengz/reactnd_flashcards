import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Styles from '../styles/stylesheet';

export default function SubmitBtn({ onPress, disabled }) {
  const themeColor = useTheme().colors.primary;
  const styles = StyleSheet.create({
    submitBtn: {
      ...Styles.button,
      borderColor: themeColor,
      backgroundColor: themeColor,
      margin: 20,
      opacity: disabled ? 0.6 : 1,
    },
  });

  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={Styles.buttonText}>
        Submit
      </Text>
    </TouchableOpacity>
  );
}