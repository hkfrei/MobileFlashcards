import { ADD_DECK, GET_DECKS, SET_DECKS } from "../actions";

const initialDecks = {
  deck1: {
    title: "Deck 1",
    questions: []
  }
};

const decks = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case GET_DECKS:
      return state;
    case SET_DECKS:
      return action.decks;
    default:
      return state;
  }
};

export default decks;
