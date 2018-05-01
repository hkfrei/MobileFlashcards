import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Decks = () => {
  return (
    <View style={styles.container}>
      <Text>Decks View</Text>
    </View>
  );
};

export default Decks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e76e63",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#e76e63",
    margin: 10
  }
});
