import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteDeck } from '../actions/data';
import { deleteDeckAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import DeckCover from './DeckCover';
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

  const themeColor = useTheme().colors.primary;

  return (
    <View style={Styles.container}>
      <DeckCover style={styles.cover} id={id} scale={2} />
      <View style={Styles.buttonGroup}>
        <TouchableOpacity
          style={[Styles.button, { borderColor: themeColor }]}
          onPress={() => navigation.navigate('NewCard', { id })}
        >
          <Text style={styles.addBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.button,
            { borderColor: themeColor, backgroundColor: themeColor }
          ]}
          onPress={() => navigation.navigate('Quiz', { id })}
        >
          <Text style={Styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TextBtn text="DELETE DECK" color={red} onPress={preRemove}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    marginBottom: 100,
  },
  addBtnText: {
    ...Styles.buttonText,
    color: black,
  },
});