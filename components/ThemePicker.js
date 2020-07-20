import React from 'react';
import { Platform, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Themes from '../styles/themes';
import { white } from '../styles/palette';
import Styles from '../styles/stylesheet';

export default function ThemePicker() {
  const currentTheme = useSelector(({ settings }) => settings.theme);
  const dispatch = useDispatch();
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