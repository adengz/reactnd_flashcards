import React, { useState }  from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCard } from '../actions/data';
import { addCardAsync } from '../utils/data';
import { ThemedTouchableOpacityDark } from './Themed';
import Styles from '../styles/stylesheet';

export default function NewCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;

  const submit = () => {
    addCardAsync(id, question, answer);

    dispatch(addCard(id, question, answer));

    setQuestion('');
    setAnswer('');
    
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView 
      style={Styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TextInput
        style={Styles.textInput}
        onChangeText={question => setQuestion(question)}
        value={question}
        placeholder="question"
      />
      <TextInput
        style={Styles.textInput}
        onChangeText={answer => setAnswer(answer)}
        value={answer}
        placeholder="answer"
      />
      <ThemedTouchableOpacityDark
        text="Submit"
        onPress={submit}
        disabled={(question === '') || (answer === '')}
      />
    </KeyboardAvoidingView>
  );
}