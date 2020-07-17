export const ADD_DECK = 'ADD_DECK';

export const addDeck = (uid, title) => ({
  type: ADD_DECK,
  uid,
  title
});