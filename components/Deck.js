import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Deck = ({ deck, deleteDeck, onPress }) => {
  return (
    <TouchableOpacity style={styles.deck} onPress={onPress}>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text>{deck.questions.length} questions</Text>
      <TouchableOpacity style={styles.btnRemove} onPress={deleteDeck}>
        <Text style={styles.deleteText}>
          <FontAwesome name="trash" /> Delete
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default Deck;
const styles = StyleSheet.create({
  deck: {
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderRadius: 20,
    borderWidth: 1
  },
  btnRemove: {
    backgroundColor: "red",
    borderRadius: 5,
    marginTop: 20,
    padding: 5,
    width: 70
  },
  deleteText: {
    color: "white",
    fontWeight: "bold"
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
