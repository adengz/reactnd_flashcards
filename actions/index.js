export const RECEIVE_DATA = 'RECEIVE_DATA';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';

export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data
});

export const addDeck = (uid, title) => ({
  type: ADD_DECK,
  uid,
  title
});

export const deleteDeck = (uid) => ({
  type: DELETE_DECK,
  uid
});

export const addCard = (uid, question, answer) => ({
  type: ADD_CARD,
  uid,
  question,
  answer
});