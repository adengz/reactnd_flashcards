import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { darkGray } from '../styles/palette';

export default function DeckCover({ id, scale=1, style={} }) {
  const deck = useSelector(({ data }) => data[id]);

  if (typeof deck === 'undefined') {
    return null;
  }

  const { title } = deck;
  const count = deck.questions.length;

  return (
    <View style={style}>
      <Text 
        style={[
          styles.title,
          { marginVertical: 12 * scale, fontSize: 24 * scale }
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.stats,
          { marginBottom: 9 * scale, fontSize: 15 * scale }
        ]}
      >
        {count} card{count !== 1 && 's'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  stats: {
    color: darkGray,
    textAlign: 'center',
  },
});