import { ADD_DECK, GET_DECKS, SET_DECKS, DELETE_DECK, ADD_CARD } from "./types";
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

export const addCard = (key, card) => ({
  type: ADD_CARD,
  key: key,
  card
});
