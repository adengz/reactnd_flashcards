import {
  RECEIVE_SETTINGS,
  SET_THEME,
  TOGGLE_REMINDER,
  SET_REMINDER_TIME
} from '../actions/settings';

export default function settings(state={}, action) {
  switch(action.type) {
    case RECEIVE_SETTINGS:
      return {
        ...state,
        ...action.settings
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case TOGGLE_REMINDER:
      return {
        ...state,
        dailyReminder: !state.dailyReminder
      };
    case SET_REMINDER_TIME:
      return {
        ...state,
        reminderTime: {
          hh: action.hh,
          mm: action.mm
        }
      };
    default:
      return state;
  }
}