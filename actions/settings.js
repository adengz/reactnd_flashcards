export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const SET_THEME = 'SET_THEME';

export const receiveSettings = (settings) => ({
  type: RECEIVE_SETTINGS,
  settings
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
});