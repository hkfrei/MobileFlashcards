import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { setDecks } from "../actions";
import { fetchDecks } from "../utils/api";
class Decks extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(decks => dispatch(setDecks(JSON.parse(decks))));
  }
  render() {
    const { decks } = this.props;
    const deckNames = Object.keys(decks);
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>MY DECKS</Text>
        {deckNames.length === 0 && <Text>Please Add some decks....</Text>}
        {deckNames.map(deck => (
          <TouchableOpacity key={deck} style={styles.deck}>
            <Text>{decks[deck].title}</Text>
          </TouchableOpacity>
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
  },
  deck: {
    width: 200,
    height: 100,
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderRadius: 20,
    borderWidth: 1
  }
});
