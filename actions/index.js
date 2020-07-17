export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export const addDeck = (uid, title) => ({
  type: ADD_DECK,
  uid,
  title
});

export const deleteDeck = (uid) => ({
  type: DELETE_DECK,
  uid
});