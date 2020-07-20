import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchSettingsAsync } from './settings';

const REMINDER_STORAGE_KEY = 'FlashCards:reminder';

export const requestNotificationPermission = () => {
  const PERMISSION_TYPE = Permissions.NOTIFICATIONS;
  return Permissions.getAsync(PERMISSION_TYPE)
    .then(({ status }) => {
      console.log('notification: check permission');
      console.log('notification: ' + status);
      return status !== 'granted' ? Permissions.askAsync(PERMISSION_TYPE) : { status };
    })
    .then(({ status }) => {
      console.log('notification: request permission');
      console.log('notification: ' + status);
      if (status !== 'granted') {
        console.log('notification: permission not granted, throw an error');
        console.log('notification: ' + status);
        throw new Error('Notification permission not granted');
      }
    });
}

export const turnOffDailyReminder = () => {
  return AsyncStorage.getItem(REMINDER_STORAGE_KEY)
    .then((identifier) => {
      if (identifier !== null) { // a notification has been scheduled
        return Notifications.cancelScheduledNotificationAsync(identifier)
          .then(AsyncStorage.removeItem(REMINDER_STORAGE_KEY));
      }
    });
}

export const scheduleDailyReminder = () => {
  const reminderContent = {
    title: 'Take a quiz today',
    body: "Don't forget to take your daily quiz today!"
  };

  return fetchSettingsAsync()
    .then(({ reminderTime }) => {
      const { hh, mm } = reminderTime;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(hh);
      tomorrow.setMinutes(mm);

      Notifications.scheduleNotificationAsync(
        reminderContent,
        { time: tomorrow, repeat: 'day' }
      ).then((identifier) => AsyncStorage.setItem(REMINDER_STORAGE_KEY, identifier));
    });
}