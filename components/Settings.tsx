import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SettingsData, SettingsScreen } from 'react-native-settings-screen';
import { clearData } from '../actions/data';
import { resetDataAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';

export default function Settings() {
  const navigation = useNavigation();
  const themeColor = useTheme().colors.primary;
  const dispatch = useDispatch();

  const preResetData = () => (
    createTwoButtonnAlert({
      title: 'CLEAR DATA',
      msg: 'Are you sure you want to clear all data?' + 
        '\nThis operation cannot be undone.',
      confirmText: 'Confirm',
      confirmOnPress: resetData
    })
  );

  const resetData = () => {
    resetDataAsync();
    dispatch(clearData());
  }

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Appearances',
      rows: [
        {
          title: 'Theme',
          renderAccessory: () => (
            <View style={[styles.colorPad, { backgroundColor: themeColor }]} />
          ),
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('ThemePicker'),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Danger Zone',
      rows: [
        {
          title: 'CLEAR DATA',
          titleStyle: Styles.menuDangerTitle,
          onPress: preResetData,
        },
      ],
    },
  ];

  return (
    <View style={Styles.container}>
      <SettingsScreen data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  colorPad: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});