import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";

class CreateDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: ""
    };
  }

  addDeck() {
    console.log("add deck");
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="PLEASE ENTER A DECK NAME"
          autoFocus
          clearButtonMode="always"
          style={styles.deckName}
          onChangeText={deckName => this.setState({ deckName })}
          value={this.state.deckName}
        />
        <TouchableOpacity style={styles.btnDefault} onPress={this.addDeck}>
          <Text style={styles.btnText}>ADD DECK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreateDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 20
  },
  deckName: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 40,
    marginTop: 20,
    width: 300
  },
  btnDefault: {
    backgroundColor: "#2089dc",
    borderRadius: 5,
    padding: 10,
    marginTop: 50
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});
