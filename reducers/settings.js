import { RECEIVE_SETTINGS, SET_THEME } from '../actions/settings';

const defaultState = { theme: 'THU' };

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
    default:
      return state;
  }
}