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
import { submitDeck, addCardToDeck } from "../utils/api";
import { addCard } from "../actions/decks";

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      successMessage: false
    };

    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
  }

  displaySuccessMessage() {
    this.setState({ successMessage: true, question: "", answer: "" });
    window.setTimeout(() => this.setState({ successMessage: false }), 2000);
  }

  render() {
    /*Read the key param from the navigation state */
    const { params } = this.props.navigation.state;
    const { key } = params;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Please enter question and answer</Text>
        <TextInput
          placeholder="question..."
          autoFocus
          clearButtonMode="always"
          multiline={true}
          style={styles.deckName}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          multiline={true}
          placeholder="answer..."
          clearButtonMode="always"
          style={styles.deckName}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity
          style={styles.btnDefault}
          onPress={() => {
            const card = {
              question: this.state.question,
              answer: this.state.answer
            };
            // add to AsyncStorate and then to redux state
            addCardToDeck(key, card).then(() => {
              this.props.createCard(key, card);
              this.displaySuccessMessage();
            });
          }}
        >
          <Text style={styles.btnText}>ADD CARD</Text>
        </TouchableOpacity>
        {this.state.successMessage && (
          <Text style={styles.successMessage}>Question successfully added</Text>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createCard: (key, card) => dispatch(addCard(key, card))
});

export default connect(null, mapDispatchToProps)(AddCard);

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
