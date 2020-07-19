import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
import Styles from '../styles/stylesheet';

export default function Settings() {
  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Appearances',
      rows: [
        {
          title: 'Theme',
          renderAccessory: () => (
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'blue',
              }}
            />
          ),
          showDisclosureIndicator: true,
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
          titleStyle: {
            color: 'red',
            fontWeight: 'bold',
          },
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