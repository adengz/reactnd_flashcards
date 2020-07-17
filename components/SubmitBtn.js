import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import sharedStyles from '../utils/stylesheet';
import { purple, white } from '../utils/colors';

export default function SubmitBtn({ onPress }) {
  const styles = StyleSheet.create({
    submitBtn: {
      ...sharedStyles.button,
      borderColor: purple,
      backgroundColor: purple,
      margin: 20
    },
    submitBtnText: {
      ...sharedStyles.buttonText,
      color: white
    }
  });

  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>
        Submit
      </Text>
    </TouchableOpacity>
  );
}