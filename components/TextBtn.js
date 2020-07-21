import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { black } from '../styles/palette'

export default function TextBtn({ style={}, text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={[styles.text, style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});