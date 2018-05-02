export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";
export const SET_DECKS = "SET_DECKS";
export const DELETE_DECK = "DELETE_DECK";

// action creators
export const addDeck = deck => ({
  type: ADD_DECK,
  deck
});

export const deleteDeck = key => ({
  type: DELETE_DECK,
  key
});

export const getDesks = () => ({
  type: GET_DECKS
});

export const setDecks = decks => ({
  type: SET_DECKS,
  decks
});


