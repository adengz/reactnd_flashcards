import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteDeck } from '../actions';
import DeckCover from './DeckCover';
import TextBtn from './TextBtn';
import sharedStyles from '../utils/stylesheet';
import { purple, white, red } from '../utils/colors';

export default function Deck() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, title } = route.params;
  const dispatch = useDispatch();

  const remove = () => {
    // update redux
    dispatch(deleteDeck(id));
    
    // go home
    navigation.navigate('Home');

    // update DB
  }

  const styles = StyleSheet.create({
    addBtn: {
      ...sharedStyles.button,
      borderColor: purple
    },
    quizBtn: {
      ...sharedStyles.button,
      borderColor: purple,
      backgroundColor: purple
    },
    quizBtnText: {
      ...sharedStyles.buttonText,
      color: white
    }
  });

  return (
    <View style={sharedStyles.container}>
      <DeckCover id={id} scale={2} />
      <View style={sharedStyles.buttonGroup}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('NewCard', { id })}
        >
          <Text style={sharedStyles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => navigation.navigate('Quiz', { id })}
        >
          <Text style={styles.quizBtnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TextBtn text="Delete Deck" color={red} onPress={remove}/>
      </View>
    </View>
  );
}