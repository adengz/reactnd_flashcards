import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsScreen, SettingsData, RowData } from 'react-native-settings-screen';
import { toggleReminder } from '../actions/settings';
import { clearData } from '../actions/data';
import { resetDataAsync } from '../utils/data';
import { createTwoButtonnAlert } from '../utils/alerts';
import Styles from '../styles/stylesheet';
import { gray, red } from '../styles/palette';

export default function Settings() {
  const navigation = useNavigation();
  const themeColor = useTheme().colors.primary;
  const dispatch = useDispatch();
  const { dailyReminder, reminderTime } = useSelector(({ settings }) => settings);
  const { hh, mm } = reminderTime;

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
    value: {
      color: gray,
      marginRight: 6,
      fontSize: 18,
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
          renderAccessory: () => (
            <Switch
              value={dailyReminder}
              onValueChange={() => dispatch(toggleReminder())} 
            />
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
          onPress: preResetData,
        },
      ],
    },
  ];

  const timePicker: RowData = {
    title: 'Remind me at',
    renderAccessory: () => (
      <Text style={styles.value}>
        {hh.toString().padStart(2, '0')}:{mm.toString().padStart(2, '0')}
      </Text>
    ),
    showDisclosureIndicator: true,
    onPress: () => navigation.navigate('TimePicker'),
  };

  if (dailyReminder) {
    data[1].rows.push(timePicker);
  }

  return (
    <View style={Styles.container}>
      <SettingsScreen data={data} />
    </View>
  );
}