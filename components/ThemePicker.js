import React from 'react';
import { Platform, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../actions/settings';
import { Ionicons } from '@expo/vector-icons';
import Themes from '../styles/themes';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

export default function ThemePicker() {
  const currentTheme = useSelector(({ settings }) => settings.theme);
  const dispatch = useDispatch();

  const changeTheme = (theme) => {
    dispatch(setTheme(theme));
  }

  const themes = JSON.parse(JSON.stringify(Themes));
  for (let k in themes) {
    themes[k].key = k;
  }

  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

  const styles = StyleSheet.create({
    btn: {
      height: 160,
      width: 160,
      margin: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  return (
    <View style={Styles.container}>
      <FlatList
        data={Object.values(themes)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: item.colors.primary }]}
              onPress={() => changeTheme(item.key)}
            >
              {item.key === currentTheme && <Ionicons
                                              name={`${iconPrefix}-checkmark`}
                                              size={100}
                                              color={white}
                                            />}
            </TouchableOpacity>
          );
        }}
        numColumns={2}
      />
    </View>
  );
}