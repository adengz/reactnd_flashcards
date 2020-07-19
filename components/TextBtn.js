import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TextBtn({ text, color, onPress }) {
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