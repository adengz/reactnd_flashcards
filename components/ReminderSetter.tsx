import React, { useState } from 'react';
import { Switch, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsData, RowData, SettingsScreen } from 'react-native-settings-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { toggleReminder, setReminderTime } from '../actions/settings';
import { toggleRemiderAsync, setReminderTimeAsync } from '../utils/settings';
import {
  requestNotificationPermission,
  turnOffDailyReminder
} from '../utils/notifications';
import Styles from '../styles/stylesheet';

export default function ReminderSetter() {
  const [pickerVisible, changePickerVis] = useState(false);
  const dispatch = useDispatch();
  const { dailyReminder, reminderTime } = useSelector(({ settings }) => settings);
  const { hh, mm } = reminderTime;

  const toggleSwitch = () => {
    const needPermission = !dailyReminder;
    const updateState = () => {
      toggleRemiderAsync();
      dispatch(toggleReminder());
    }

    // optimistically update UI
    updateState();

    if (needPermission) {  // need to check and request permission
      requestNotificationPermission()
        .then(() => console.log('ui: schedule notification here'))
        .catch(() => {
          console.log('ui: permission not granted');
          // switch state back
          updateState();
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
    setReminderTimeAsync(hh, mm);
    dispatch(setReminderTime(hh, mm));
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