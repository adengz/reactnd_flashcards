import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DeckCover from './DeckCover';

export default function Deck() {
  const route = useRoute();
  const { id } = route.params;

  return (
    <View>
      <DeckCover id={id} />
    </View>
  );
}