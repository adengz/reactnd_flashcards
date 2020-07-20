import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { darkGray } from '../styles/palette';

export default function DeckCover({ id, scale=1, style={} }) {
  const deck = useSelector(({ data }) => data[id]);

  if (typeof deck === 'undefined') {
    return null;
  }

  const { title } = deck;
  const count = deck.questions.length;

  const styles = StyleSheet.create({
    title: {
      marginVertical: 12 * scale,
      fontSize: 24 * scale,
      textAlign: 'center',
    },
    stats: {
      marginBottom: 9 * scale,
      fontSize: 15 * scale,
      color: darkGray,
      textAlign: 'center',
    },
  });

  return (
    <View style={style}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.stats}>
        {count} card{count !== 1 && 's'}
      </Text>
    </View>
  );
}