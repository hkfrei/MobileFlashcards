import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Deck from "./Deck";
const DeckView = props => {
  /*Read the params from the navigation state */
  const { params } = props.navigation.state;
  const { deck } = params;
  console.log(deck);

  return (
    <View style={styles.container}>
      <Deck deck={deck} />
    </View>
  );
};
export default DeckView;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "stretch"
  }
});
