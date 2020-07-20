import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
import Styles from '../styles/stylesheet';

export default function Settings() {
  const navigation = useNavigation();
  const themeColor = useTheme().colors.primary;

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
          onPress: () => navigation.navigate('ThemePicker')
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