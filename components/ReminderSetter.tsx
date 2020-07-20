import React, { useState } from 'react';
import { Switch, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsData, RowData, SettingsScreen } from 'react-native-settings-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { toggleReminder, setReminderTime } from '../actions/settings';
import { toggleRemiderAsync, setReminderTimeAsync } from '../utils/settings';
import {
  requestNotificationPermission,
  turnOffDailyReminder,
  scheduleDailyReminder
} from '../utils/notifications';
import Styles from '../styles/stylesheet';

export default function ReminderSetter() {
  const [pickerVisible, changePickerVis] = useState(false);
  const dispatch = useDispatch();
  const { dailyReminder, reminderTime } = useSelector(({ settings }) => settings);
  const { hh, mm } = reminderTime;

  const toggleSwitch = () => {
    const turningOn = !dailyReminder;

    // optimistically update state on UI
    dispatch(toggleReminder());

    if (turningOn) {  // need to check and request permission
      requestNotificationPermission()
        .then(() => {  // permission granted, update setting storage and then schedule
          console.log('ui: permission granted');
          toggleRemiderAsync().then(scheduleDailyReminder);
        })
        .catch(() => {  // permission not granted
          console.log('ui: permission not granted');
          // switch state back
          dispatch(toggleReminder());
        });
    } else {
      turnOffDailyReminder();
    }
  }

  const showTimePicker = () => {
    changePickerVis(true);
  }

  const hideTimePicker = () => {
    changePickerVis(false);
  }

  const confirmTime = (date) => {
    hideTimePicker();
    const hh = date.getHours(), mm = date.getMinutes();
    dispatch(setReminderTime(hh, mm));
    setReminderTimeAsync(hh, mm).then(scheduleDailyReminder);
  }

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: '',
      rows: [
        {
          title: 'Daily quiz reminder',
          renderAccessory: () => (
            <Switch
              value={dailyReminder}
              onValueChange={toggleSwitch}
            />
          ),
        },
      ],
    },
  ];

  const timePicker: RowData = {
    title: 'Remind me at',
    renderAccessory: () => (
      <Text style={Styles.menuValue}>
        {hh.toString().padStart(2, '0')}:{mm.toString().padStart(2, '0')}
      </Text>
    ),
    onPress: showTimePicker,
  };

  if (dailyReminder) {
    data[0].rows.push(timePicker);
  }

  return (
    <View style={Styles.container}>
      <SettingsScreen data={data} />
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="time"
        onConfirm={confirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
}