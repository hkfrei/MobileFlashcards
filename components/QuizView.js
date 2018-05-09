import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import StatisticView from "./StatisticView";

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.questionsCount = props.deck.questions.length;
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.processAnswer = this.processAnswer.bind(this);
    this.state = {
      attempt: 0,
      question: true,
      score: 0,
      finished: false,
      modalVisible: false
    };
  }
  toggleAnswer = () => {
    this.setState(state => ({
      ...state,
      ["question"]: !state.question
    }));
  };

  resetQuiz = () => {
    this.setState({
      attempt: 0,
      question: true,
      score: 0,
      finished: false,
      modalVisible: false
    });
  };

  processAnswer = correct => {
    // All questions ansered
    if (this.state.finished) {
      return;
    }
    const attempt = this.state.attempt + 1;
    const point = correct ? 1 : 0;

    // The last question
    if (attempt === this.questionsCount) {
      this.setState(state => ({
        ...state,
        ["score"]: state.score + point,
        ["finished"]: true,
        ["modalVisible"]: true,
        ["percents"]: this.calcPercents(
          state.score + point,
          this.questionsCount
        )
      }));
      return;
    }
    // Not the last question
    this.setState(state => ({
      ...state,
      ["score"]: state.score + point,
      ["attempt"]: state.attempt + 1,
      ["percents"]: this.calcPercents(state.score, this.questionsCount)
    }));
  };

  calcPercents = (score, questionsCount) => {
    return score / questionsCount * 100;
  };

  render() {
    console.log(this.props);
    const { questions } = this.props.deck;
    return (
      <View style={styles.quizContainer}>
        <Text>
          Question: {this.state.attempt + 1} / {questions.length}
        </Text>
        <Text>Remaining: {questions.length - this.state.attempt}</Text>
        <Text>Correct answers: {this.state.score}</Text>
        <Text>
          {this.calcPercents(this.state.score, this.questionsCount)} % correct
        </Text>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {this.state.question && questions[this.state.attempt].question}
            {!this.state.question && questions[this.state.attempt].answer}
          </Text>
        </View>
        <TouchableOpacity onPress={this.toggleAnswer}>
          {this.state.question && (
            <Text style={styles.answer}>Show answer</Text>
          )}
          {!this.state.question && (
            <Text style={styles.answer}>Show question</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnDefault, styles.btnCorrect]}
          onPress={() => this.processAnswer(true)}
        >
          <Text style={styles.btnText}>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnDefault, styles.btnIncorrect]}
          onPress={() => this.processAnswer(false)}
        >
          <Text style={styles.btnText}>INCORRECT</Text>
        </TouchableOpacity>

        <StatisticView
          statistic={this.state}
          modalVisible={this.state.modalVisible}
          resetQuiz={this.resetQuiz}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks[props.navigation.state.params.key]
});

export default connect(mapStateToProps)(QuizView);

const styles = StyleSheet.create({
  quizContainer: {
    padding: 20
  },
  questionContainer: {
    alignSelf: "center",
    alignItems: "center",
    minHeight: 150,
    marginTop: 30
  },
  question: {
    fontSize: 20
  },
  answer: {
    alignSelf: "center",
    color: "#0070ff",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    marginBottom: 50
  },
  btnDefault: {
    alignSelf: "center",
    backgroundColor: "#2089dc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 200
  },
  btnCorrect: {
    backgroundColor: "#249d3d"
  },
  btnIncorrect: {
    backgroundColor: "#d72e3d"
  },
  btnText: {
    color: "white",
    alignSelf: "center"
  },
  statistic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleh1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  statisticText: {
    fontSize: 16,
    paddingBottom: 10
  }
});
