import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import sharedStyles from '../utils/stylesheet';
// import { purple, white } from '../utils/colors';

export default function TextBtn({ text, color, onPress }) {
  // const styles = StyleSheet.create({
  //   submitBtn: {
  //     ...sharedStyles.button,
  //     borderColor: purple,
  //     backgroundColor: purple,
  //     margin: 20
  //   },
  //   submitBtnText: {
  //     ...sharedStyles.buttonText,
  //     color: white
  //   }
  // });

  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 5 }}>
      <Text style={{ color, fontSize: 20 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}