export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";
export const SET_DECKS = "SET_DECKS";

// action creators
export const addDeck = deck => ({
  type: ADD_DECK,
  deck
});

export const getDesks = () => ({
  type: GET_DECKS
});

export const setDecks = decks => ({
  type: SET_DECKS,
  decks
});
