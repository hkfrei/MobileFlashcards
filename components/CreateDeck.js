import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import { submitDeck } from "../utils/api";
import { addDeck } from "../actions";

class CreateDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      successMessage: false
    };

    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
  }

  displaySuccessMessage() {
    this.setState({ successMessage: true, deckName: "" });
    window.setTimeout(() => this.setState({ successMessage: false }), 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.successMessage && (
          <Text style={styles.successMessage}>Deck successfully added</Text>
        )}
        <TextInput
          placeholder="Enter a deck name..."
          autoFocus
          clearButtonMode="always"
          style={styles.deckName}
          onChangeText={deckName => this.setState({ deckName })}
          value={this.state.deckName}
        />
        <TouchableOpacity
          style={styles.btnDefault}
          onPress={() => {
            const deck = {
              title: this.state.deckName,
              questions: []
            };
            this.props.createDeck(deck);
            // to AsyncStorage
            submitDeck(deck);
            this.displaySuccessMessage();
          }}
        >
          <Text style={styles.btnText}>ADD DECK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  createDeck: deck => dispatch(addDeck(deck))
});

export default connect(null, mapDispatchToProps)(CreateDeck);

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
  },
  successMessage: {
    color: "green",
    fontSize: 15
  }
});
