import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
const CreateDeck = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What is the title of your deck?</Text>
      <TextInput autoFocus clearButtonMode="always" style={styles.deckName} />
    </View>
  );
};

export default CreateDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  deckName: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    width: 300
  }
});
