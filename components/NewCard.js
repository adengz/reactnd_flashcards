import React, { useState }  from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput
} from 'react-native';
import SubmitBtn from './SubmitBtn';
import sharedStyles from '../utils/stylesheet';

export default function NewCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const styles = StyleSheet.create({
    label: {
      fontSize: 25,
      alignSelf: 'flex-start',
      marginLeft: 15
    }
  });

  return (
    <KeyboardAvoidingView 
      style={sharedStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Text style={styles.label}>Question</Text>
      <TextInput
        style={sharedStyles.textInput}
        onChangeText={question => setQuestion(question)}
        value={question}
      />
      <Text style={styles.label}>Answer</Text>
      <TextInput
        style={sharedStyles.textInput}
        onChangeText={answer => setAnswer(answer)}
        value={answer}
      />
      <SubmitBtn />
    </KeyboardAvoidingView>
  );
}