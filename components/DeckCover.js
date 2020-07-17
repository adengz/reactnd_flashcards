import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { gray } from '../utils/colors';

export default function DeckCover({ id, scale=1 }) {
  const deck = useSelector(state => state[id]);
  const { title } = deck;
  const count = deck.questions.length;

  const styles = StyleSheet.create({
    title: {
      marginTop: 12 * scale,
      marginBottom: 12 * scale,
      fontSize: 24 * scale,
      textAlign: 'center'
    },
    stats: {
      marginBottom: 9 * scale,
      fontSize: 15 * scale,
      color: gray,
      textAlign: 'center'
    }
  });

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