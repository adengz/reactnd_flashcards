import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteDeck } from '../actions/data';
import { deleteDeckAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import DeckCover from './DeckCover';
import { ThemedTouchableOpacityLight, ThemedTouchableOpacityDark } from './Themed';
import TextBtn from './TextBtn';
import Styles from '../styles/stylesheet';
import { black, red } from '../styles/palette';

export default function Deck() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, title } = route.params;
  const dispatch = useDispatch();

  const preRemove = () => (
    createTwoButtonnAlert({
      title: `Delete ${title}`,
      msg: 'Are you sure you want to delete ' + title +
        '?\nThis operation cannot be undone.',
      confirmText: 'Confirm',
      confirmOnPress: remove
    })
  );

  const remove = () => {
    deleteDeckAsync(id);

    dispatch(deleteDeck(id));
    
    navigation.navigate('Home');
  }

  return (
    <View style={Styles.container}>
      <DeckCover style={styles.cover} id={id} scale={2} />
      <View style={Styles.buttonGroup}>
        <ThemedTouchableOpacityLight
          text="Add Card"
          onPress={() => navigation.navigate('NewCard', { id })}
        />
        <ThemedTouchableOpacityDark
          text="Start Quiz"
          onPress={() => navigation.navigate('Quiz', { id })}
        />
        <TextBtn
          style={{ color: red }}
          text="DELETE DECK"
          onPress={preRemove}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    marginBottom: 100,
  },
});