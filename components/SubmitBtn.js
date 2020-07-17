import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import sharedStyles from '../utils/stylesheet';
import { purple, white } from '../utils/colors';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity
    style={[
      sharedStyles.button,
      { borderColor: purple, backgroundColor: purple }
    ]}
    onPress={onPress}
  >
    <Text style={{ fontSize: 30, color: white }}>Submit</Text>
  </TouchableOpacity>
);

export default SubmitBtn;