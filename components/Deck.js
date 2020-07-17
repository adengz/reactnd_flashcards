import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DeckCover from './DeckCover';
import sharedStyles from '../utils/stylesheet';

export default function Deck() {
  const route = useRoute();
  const { id } = route.params;

  return (
    <View style={sharedStyles.container}>
      <DeckCover id={id} scale={2} />
    </View>
  );
}