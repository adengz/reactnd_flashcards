import { ADD_DECK } from '../actions';

const defaultState = {
  ec2ire7ksi49n7zxchwg7e: {
    id: 'ec2ire7ksi49n7zxchwg7e',
    title: 'React Native',
    questions: [
      {
        question: 'Is React Native garbage?',
        answer: 'probably'
      }
    ]
  },
  swn1bg3tgpgb71h3alp9u6: {
    id: 'swn1bg3tgpgb71h3alp9u6',
    title: 'React',
    questions: [
      {
        question: 'In which version were Hooks introduced?',
        answer: '16.8'
      },
      {
        question: 'Which feature made React standing out when it was first released?',
        answer: 'virtual DOM'
      }
    ]
  }
};

export default function decks(state=defaultState, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.uid]: {
          id: action.uid,
          title: action.title,
          questions: []
        }
      };
    default: 
      return state;
  }
}