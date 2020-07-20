import AsyncStorage from '@react-native-community/async-storage';

const SETTING_STORAGE_KEY = 'FlashCards:settings';

export const initiateSettingsAsync = (defaultSettings) => {
  return AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
}

export const fetchSettingsAsync = () => {
  return AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
    .then((results) => JSON.parse(results));
}

const updateSettingsAsync = (newSettings) => {
  return AsyncStorage.mergeItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
}

export const setThemeAsync = (theme) => {
  return fetchSettingsAsync()
    .then((settings) => {
      settings.theme = theme;
      return updateSettingsAsync(settings);
    });
}

export const toggleRemiderAsync = () => {
  return fetchSettingsAsync()
    .then((settings) => {
      settings.dailyReminder = !settings.dailyReminder;
      return updateSettingsAsync(settings);
    });
}

export const setReminderTimeAsync = (hh, mm) => {
  return fetchSettingsAsync()
    .then((settings) => {
      settings.reminderTime = { hh, mm };
      return updateSettingsAsync(settings);
    });
}