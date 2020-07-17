import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addDeck } from '../actions';
import SubmitBtn from './SubmitBtn';
import sharedStyles from '../utils/stylesheet';

export default function NewDeck() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const submit = () => {
    let uid = Math.random().toString(36).substring(2, 15);
    uid += Math.random().toString(36).substring(2, 15);

    // update redux
    dispatch(addDeck(uid, title));

    // reset title
    setTitle('');

    // update DB
    // redirect to created deck
  }

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
      <SubmitBtn onPress={submit}/>
    </KeyboardAvoidingView>
  );
}