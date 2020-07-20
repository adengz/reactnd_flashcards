export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const SET_THEME = 'SET_THEME';
export const TOGGLE_REMINDER = 'TOGGLE_REMINDER';
export const SET_REMINDER_TIME = 'SET_REMINDER_TIME';

export const receiveSettings = (settings) => ({
  type: RECEIVE_SETTINGS,
  settings
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
});

export const toggleReminder = () => ({
  type: TOGGLE_REMINDER
});

export const setReminderTime = (hh, mm) => ({
  type: SET_REMINDER_TIME,
  hh,
  mm
});