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
import { addDeck } from "../actions/decks";

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
        <Text style={styles.heading}>What's the name of your new deck?</Text>
        <TextInput
          placeholder="Name..."
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

            // Add to AsyncStorage and then to redux state
            submitDeck(deck).then(() => {
              this.props.createDeck(deck);
              this.displaySuccessMessage();
            });
          }}
        >
          <Text style={styles.btnText}>ADD DECK</Text>
        </TouchableOpacity>
        {this.state.successMessage && (
          <Text style={styles.successMessage}>Deck successfully added</Text>
        )}
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
    alignItems: "center"
  },
  heading: {
    fontSize: 20,
    padding: 20,
    textAlign: "center"
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
    fontSize: 15,
    marginTop: 20
  }
});
