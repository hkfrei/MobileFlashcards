import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Deck from "./Deck";
import { FontAwesome } from "@expo/vector-icons";
/*
* It is necessary to make this a statefull
* component because if we transport the
* desk via navigaton.state, it does not update
* every time the state changes.
*/
class DeckView extends React.Component {
  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.key = props.navigation.state.params.key;
  }

  addCard = () => {
    console.log(this.props);
    const { navigation } = this.props;
    navigation.navigate("AddCard", {
      key: this.key,
      deck: this.props.deck
    });
  };

  startQuiz = () => {
    console.log("start Quiz");
  };
  render() {
    return (
      <View style={styles.container}>
        <Deck deck={this.props.deck}>
          <View>
            <TouchableOpacity style={styles.btnAddCard} onPress={this.addCard}>
              <Text style={styles.deleteText}>
                <FontAwesome name="plus" /> Add Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStart} onPress={this.startQuiz}>
              <Text style={styles.deleteText}>
                <FontAwesome name="play" /> Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </Deck>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks[props.navigation.state.params.key]
});

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  btnAddCard: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    height: 30,
    marginTop: 20,
    padding: 5
  },
  btnStart: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    height: 30,
    marginTop: 10,
    padding: 5
  }
});
