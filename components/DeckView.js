import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
    const { navigation } = this.props;
    navigation.navigate("AddCard", {
      key: this.key
    });
  };

  startQuiz = () => {
    // check if there are any questions
    if (!this.props.deck.questions.length) {
      Alert.alert(
        "No questions available",
        "Please add some cards to the deck."
      );
      return;
    }
    const { navigation } = this.props;
    navigation.navigate("QuizView", { key: this.key });
  };
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Deck deck={deck}>
          <View>
            <TouchableOpacity style={styles.btnAddCard} onPress={this.addCard}>
              <Text style={styles.btnText}>
                <FontAwesome name="plus" /> ADD CARD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStart} onPress={this.startQuiz}>
              <Text style={styles.btnText}>
                <FontAwesome name="play" /> START QUIZ
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
    marginTop: 20,
    padding: 10
  },
  btnStart: {
    backgroundColor: "#0070FF",
    borderRadius: 5,
    marginTop: 10,
    padding: 10
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});
