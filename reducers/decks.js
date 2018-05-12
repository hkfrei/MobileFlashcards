import {
  ADD_DECK,
  DELETE_DECK,
  GET_DECKS,
  SET_DECKS,
  ADD_CARD
} from "../actions/types";

const initialDecks = {
  deck1: {
    title: "Deck 1",
    questions: []
  }
};

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case DELETE_DECK:
      const decks = Object.assign({}, state);
      delete decks[action.key];
      return decks;
    case GET_DECKS:
      return state;
    case SET_DECKS:
      if (action.decks) {
        return action.decks;
      } else {
        return state;
      }
    case ADD_CARD:
      const oldQuestions = state[action.key].questions;
      newQuestions = oldQuestions.concat([action.card]);
      //console.log(newQuestions);
      return {
        ...state,
        [action.key]: {
          title: action.key,
          questions: newQuestions
        }
      };

    default:
      return state;
  }
};

export default decks;
