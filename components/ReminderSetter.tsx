import React, { useState } from 'react';
import { Switch, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsData, RowData, SettingsScreen } from 'react-native-settings-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { toggleReminder } from '../actions/settings';
import Styles from '../styles/stylesheet';

export default function ReminderSetter() {
  const [pickerVisible, changePickerVis] = useState(false);
  const dispatch = useDispatch();
  const { dailyReminder, reminderTime } = useSelector(({ settings }) => settings);
  const { hh, mm } = reminderTime;

  const showTimePicker = () => {
    changePickerVis(true);
  }

  const hideTimePicker = () => {
    changePickerVis(false);
  }

  const submit = (date) => {
    // dispatch blah blah
    console.log(date);
    hideTimePicker();
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
              onValueChange={() => dispatch(toggleReminder())} 
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
        onConfirm={submit}
        onCancel={hideTimePicker}
      />
    </View>
  );
}