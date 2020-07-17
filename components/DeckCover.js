import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { gray } from '../utils/colors';

export default function DeckCover({ id }) {
  const deck = useSelector(state => state[id]);
  const { title } = deck;
  const count = deck.questions.length;

  return (
    <View>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.stats}>
        {count} card{count !== 1 && 's'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
    textAlign: 'center'
  },
  stats: {
    marginBottom: 10,
    fontSize: 20,
    color: gray,
    textAlign: 'center'
  }
});