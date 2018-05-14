import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import Deck from "./Deck";
import { setDecks, deleteDeck } from "../actions/decks";
import { fetchDecks, removeEntry } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";
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
        <View style={styles.title}>
          <Text style={styles.h1}>AVAILABLE DECKS</Text>
        </View>
        {/* Case when localStorage returns an empty Deck array */}
        {deckNames.length === 0 && (
          <View style={styles.container}>
            <Text style={styles.h1}>No decks available</Text>
            <Text style={styles.h1}>Please create some decks</Text>
            <TouchableOpacity
              style={styles.btnDefault}
              onPress={() => this.props.navigation.navigate("CreateDeck")}
            >
              <Text style={styles.btnText}>CREATE NEW DECK</Text>
            </TouchableOpacity>
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
  btnDefault: {
    alignSelf: "center",
    backgroundColor: "#2089dc",
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    width: 200
  },
  btnText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold"
  },
  title: {
    alignItems: "stretch",
    backgroundColor: "gainsboro",
    padding: 15,
    marginBottom: 20
  },
  h1: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  center: {
    alignSelf: "center"
  }
});
