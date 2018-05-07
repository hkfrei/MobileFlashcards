import { AsyncStorage } from "react-native";

export const FLASHCARD_STORAGE_KEY = "MobileFlashcards:Decks";

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(
    FLASHCARD_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: deck
    })
  );
}

export function removeEntry(key) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
}

export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[title].questions.push(card);
    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
}
