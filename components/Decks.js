import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Deck from "./Deck";
import { setDecks, deleteDeck } from "../actions";
import { fetchDecks, removeEntry } from "../utils/api";
class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.removeDeck = this.removeDeck.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks().then(decks => dispatch(setDecks(JSON.parse(decks))));
  }

  removeDeck = key => {
    // remove from redux state
    this.props.dispatch(deleteDeck(key));
    // remove from Async Storage
    removeEntry(key);
  };

  keyExtractor = (item, index) => item.title;

  onPressItem = item => {
    console.log(item);
    const { navigation } = this.props;
    navigation.navigate("DeckView", { deck: item });
  };

  render() {
    const { decks, navigation } = this.props;
    const deckNames = Object.keys(decks);
    const decksArray = [];
    deckNames.map(deck => decksArray.push(decks[deck]));
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>MY DECKS</Text>
        {deckNames.length === 0 && <Text>Please Add some decks....</Text>}
        <FlatList
          data={decksArray}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <Deck
              deck={item}
              deleteDeck={() => this.removeDeck(item.title)}
              onPress={() => this.onPressItem(item)}
            />
          )}
        />
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
    alignItems: "stretch"
  },
  h1: {
    alignSelf: "center",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 50
  }
});
