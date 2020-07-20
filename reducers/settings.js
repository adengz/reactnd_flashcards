import {
  RECEIVE_SETTINGS,
  SET_THEME,
  TOGGLE_REMINDER,
  SET_REMINDER_TIME
} from '../actions/settings';

const defaultState = {
  theme: 'THU',
  dailyReminder: false,
  reminderTime: {
    hh: 20,
    mm: 0
  }
};

export default function settings(state=defaultState, action) {
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