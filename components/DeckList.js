import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Deck from "./Deck";
import { setDecks, deleteDeck } from "../actions/decks";
import { fetchDecks, removeEntry } from "../utils/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
class DeckList extends React.Component {
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
    // remove from AsyncStorage and then from redux
    removeEntry(key).then(() => this.props.dispatch(deleteDeck(key)));
  };

  keyExtractor = (item, index) => item.title;

  onPressItem = item => {
    const { navigation } = this.props;
    navigation.navigate("DeckView", {
      key: item.title
    });
  };

  render() {
    const { decks, navigation } = this.props;

    const deckNames = Object.keys(decks);
    const decksArray = [];
    // Add all the decks to the Array. We need the Array
    // in the FlatList component
    deckNames.map(deck => decksArray.push(decks[deck]));

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Available Decks</Text>

        {/* Case when localStorage returns an empty Deck array */}
        {deckNames.length === 0 && (
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="cards"
              size={50}
              style={styles.center}
            />
            <Text style={styles.h1}>No decks available</Text>
            <Text style={styles.h1}>Please create some decks</Text>
          </View>
        )}

        {/* Normal case when some decks are available */}
        <FlatList
          data={decksArray}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <Deck
              deck={item}
              deleteDeck={() => this.removeDeck(item.title)}
              onPress={() => this.onPressItem(item)}
              reducedView={true}
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

export default connect(mapStateToProps)(DeckList);

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
    marginTop: 30
  },
  center: {
    alignSelf: "center"
  }
});
