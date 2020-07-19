import { RECEIVE_DATA, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions';

export default function decks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        ...action.data
      };
    case ADD_DECK:
      return {
        ...state,
        [action.uid]: {
          id: action.uid,
          title: action.title,
          questions: []
        }
      };
    case DELETE_DECK:
      return Object.assign(
        {},
        ...Object.entries(state)
          .filter(([k]) => k !== action.uid)
          .map(([k, v]) => ({[k]: v}))
      );
    case ADD_CARD:
      return {
        ...state,
        [action.uid]: {
          ...state[action.uid],
          questions: state[action.uid].questions.concat([{
            question: action.question,
            answer: action.answer
          }])
        }
      };
    default: 
      return state;
  }
}