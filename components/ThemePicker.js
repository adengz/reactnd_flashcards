import React from 'react';
import {
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../actions/settings';
import { setThemeAsync } from '../utils/settings';
import { Ionicons } from '@expo/vector-icons';
import Themes from '../styles/themes';
import Styles from '../styles/stylesheet';
import { white } from '../styles/palette';

const themes = JSON.parse(JSON.stringify(Themes));
for (let k in themes) {
  themes[k].key = k;
}

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

export default function ThemePicker() {
  const currentTheme = useSelector(({ settings }) => settings.theme);
  const dispatch = useDispatch();

  const changeTheme = (theme) => {
    setThemeAsync(theme);
    dispatch(setTheme(theme));
  }

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

const size = Dimensions.get('window').width * 0.45;

const styles = StyleSheet.create({
  btn: {
    height: size,
    width: size,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});