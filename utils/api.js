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
export function fetchDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
}
