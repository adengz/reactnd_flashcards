import { RECEIVE_DATA, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions/data';

export default function data(state={}, action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        ...action.data
      };
    case ADD_DECK:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          title: action.title,
          timestamp: action.timestamp,
          questions: []
        }
      };
    case DELETE_DECK:
      return Object.assign(
        {},
        ...Object.entries(state)
          .filter(([k]) => k !== action.id)
          .map(([k, v]) => ({[k]: v}))
      );
    case ADD_CARD:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat([{
            question: action.question,
            answer: action.answer
          }])
        }
      };
    default: 
      return state;
  }
}