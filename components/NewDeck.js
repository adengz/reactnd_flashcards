import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addDeck } from '../actions';
import { addDeckAsync } from '../utils/data';
import SubmitBtn from './SubmitBtn';
import Styles from '../styles/stylesheet';

export default function NewDeck() {
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const submit = () => {
    let uid = Math.random().toString(36).substring(2, 15);
    uid += Math.random().toString(36).substring(2, 15);

    addDeckAsync(uid, title);

    dispatch(addDeck(uid, title));

    setTitle('');
    
    navigation.navigate('Deck', { id: uid, title });
  }

  return (
    <KeyboardAvoidingView 
      style={Styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Text style={Styles.title}>
        Enter the title of{'\n'}your new deck
      </Text>
      <TextInput
        style={Styles.textInput}
        onChangeText={title => setTitle(title)}
        value={title}
      />
      <SubmitBtn onPress={submit} disabled={title === ''} />
    </KeyboardAvoidingView>
  );
}