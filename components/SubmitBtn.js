import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Styles from '../styles/stylesheet';

export default function SubmitBtn({ onPress, disabled }) {
  const themeColor = useTheme().colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.submitBtn,
        { backgroundColor: themeColor, opacity: disabled ? 0.6 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={Styles.buttonText}>
        Submit
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    ...Styles.button,
    margin: 20,
  },
});