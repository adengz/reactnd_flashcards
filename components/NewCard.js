import React, { useState }  from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCard } from '../actions/data';
import { addCardAsync } from '../utils/data';
import SubmitBtn from './SubmitBtn';
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
      <Text style={styles.label}>Question</Text>
      <TextInput
        style={Styles.textInput}
        onChangeText={question => setQuestion(question)}
        value={question}
      />
      <Text style={styles.label}>Answer</Text>
      <TextInput
        style={Styles.textInput}
        onChangeText={answer => setAnswer(answer)}
        value={answer}
      />
      <SubmitBtn
        onPress={submit}
        disabled={(question === '') || (answer === '')}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 25,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
});