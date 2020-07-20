import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
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
      title: 'Clear data',
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

  const styles = StyleSheet.create({
    colorPad: {
      width: 30,
      height: 30,
      backgroundColor: themeColor,
      borderRadius: 5,
    },
  });

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Appearances',
      rows: [
        {
          title: 'Theme',
          renderAccessory: () => <View style={styles.colorPad}/>,
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('ThemePicker'),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Notifications',
      rows: [
        {
          title: 'Daily Quiz Reminder',
          subtitle: 'Reminds you to take at least a quiz everyday',
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('ReminderSetter'),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Danger Zone',
      rows: [
        {
          title: 'Clear data',
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