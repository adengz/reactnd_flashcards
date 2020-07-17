import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DeckCover from './DeckCover';
import sharedStyles from '../utils/stylesheet';
import { gray } from '../utils/colors';

export default function DeckList() {
  const decks = useSelector(state => state);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    deckBtn: {
      paddingBottom: 10,
      alignSelf: 'stretch',
      borderBottomWidth: 1,
      borderColor: gray
    }
  });

  return (
    <View style={sharedStyles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deckBtn}
            onPress={() =>
              navigation.navigate('Deck', { id: item.id, title: item.title })
            }
          >
            <DeckCover id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}