import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useStore } from 'react-redux';
import DeckCover from './DeckCover';
import sharedStyles from '../utils/stylesheet';
import { gray } from '../utils/colors';

export default function DeckList() {
  const decks = useStore().getState();

  return (
    <View style={sharedStyles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <TouchableOpacity style={styles.deckBtn}>
              <DeckCover id={item.id} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deckBtn: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: gray
  }
});