import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
import { clearData } from '../actions/data';
import { resetDataAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { red } from '../styles/palette';

export default function Settings() {
  const navigation = useNavigation();
  const themeColor = useTheme().colors.primary;
  const dispatch = useDispatch();

  const preClear = () => (
    createTwoButtonnAlert({
      title: 'Clear data',
      msg: 'Are you sure you want to clear all data?' + 
        '\nThis operation cannot be undone.',
      confirmText: 'Confirm',
      confirmOnPress: clear
    })
  );

  const clear = () => {
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
    dangerTitle: {
      color: red,
      fontWeight: 'bold',
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
          title: 'Daily quiz reminder',
          renderAccessory: () => <Switch value onValueChange={() => {}} />,
        },
        {
          title: 'Remind me at',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              20:00
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Danger Zone',
      rows: [
        {
          title: 'Clear data',
          titleStyle: styles.dangerTitle,
          onPress: preClear,
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