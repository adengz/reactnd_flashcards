import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DeckCover from './DeckCover';
import sharedStyles from '../utils/stylesheet';
import { purple, white } from '../utils/colors';

export default function Deck() {
  const route = useRoute();
  const { id } = route.params;

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
        <TouchableOpacity style={styles.addBtn}>
          <Text style={sharedStyles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizBtn}>
          <Text style={styles.quizBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}