import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Deck from "./Deck";
import { setDecks, deleteDeck } from "../actions";
import { fetchDecks, removeEntry } from "../utils/api";
class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.removeDeck = this.removeDeck.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(decks => dispatch(setDecks(JSON.parse(decks))));
  }

  removeDeck(key) {
    // remove from redux state
    this.props.dispatch(deleteDeck(key));
    // remove from Async Storage
    removeEntry(key);
  }

  render() {
    const { decks } = this.props;
    const deckNames = Object.keys(decks);
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>MY DECKS</Text>
        {deckNames.length === 0 && <Text>Please Add some decks....</Text>}
        {deckNames.map(deck => (
          <Deck
            key={deck}
            deck={decks[deck]}
            deleteDeck={() => this.removeDeck(deck)}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  h1: {
    marginBottom: 30
  }
});
