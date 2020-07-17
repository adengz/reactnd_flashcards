import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import SubmitBtn from './SubmitBtn';
import sharedStyles from '../utils/stylesheet';

const NewDeck = () => {
  const [title, setTitle] = useState('');

  return (
    <KeyboardAvoidingView 
      style={sharedStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Text style={{ fontSize: 40, textAlign: 'center' }}>
        Enter the title of{'\n'}your new deck
      </Text>
      <TextInput
        style={sharedStyles.textInput}
        onChangeText={title => setTitle(title)}
        value={title}
      />
      <SubmitBtn />
    </KeyboardAvoidingView>
  );
}

export default NewDeck;