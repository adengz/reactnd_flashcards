export const RECEIVE_DATA = 'RECEIVE_DATA';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const CLEAR_DATA = 'CLEAR_DATA';

export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data
});

export const addDeck = (id, title, timestamp) => ({
  type: ADD_DECK,
  id,
  title,
  timestamp
});

export const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id
});

export const addCard = (id, question, answer) => ({
  type: ADD_CARD,
  id,
  question,
  answer
});

export const clearData = () => ({
  type: CLEAR_DATA
});