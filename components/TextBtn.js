import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { black } from '../styles/palette'

export default function TextBtn({ text, color=black, onPress }) {
  const styles = StyleSheet.create({
    btn: {
      margin: 5,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}