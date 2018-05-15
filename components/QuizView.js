import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import StatisticView from "./StatisticView";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/notification";

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

  componentWillMount() {
    // create a new new Value which can be animated
    this.animatedValue = new Animated.Value(0);

    // store the initial value = card displays question
    this.value = 0;

    // every time the animatedValue changes also this.value must change
    this.animatedValue.addListener(({ value }) => (this.value = value));

    // create the animation for flipping to front
    // the value 0 is maped to "0deg" 180 to "180deg"
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    // create the animation for flipping to back
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
      this.toggleAnswer();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
      this.toggleAnswer();
    }
  };

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

  backToDeck = () => {
    this.resetQuiz();
    this.props.navigation.goBack();
    /*
    * remove scheduled notification for today
    * and add a new notification for tomorrow
    */
    clearLocalNotification().then(setLocalNotification);
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
        score: state.score + point,
        finished: true,
        modalVisible: true,
        percents: this.calcPercents(state.score + point, this.questionsCount)
      }));
      return;
    }
    // Not the last question

    // flip the card if answer is visible
    if (!this.state.question) {
      this.flipCard();
    }
    this.setState(state => ({
      ...state,
      ["question"]: true, // always display the question
      ["score"]: state.score + point,
      ["attempt"]: state.attempt + 1,
      ["percents"]: this.calcPercents(state.score, this.questionsCount)
    }));
  };

  calcPercents = (score, questionsCount) => {
    return parseInt(score / questionsCount * 100, 10);
  };

  render() {
    // the calculated (interpolated) styles to add to the Animated.View
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    const { questions } = this.props.deck;

    return (
      <View style={styles.quizContainer}>
        <Text>
          Question: {this.state.attempt + 1} / {questions.length}
        </Text>
        <Text>Remaining: {questions.length - this.state.attempt - 1}</Text>
        <Text>Correct answers: {this.state.score}</Text>
        <Text>
          {this.calcPercents(this.state.score, this.questionsCount)} % correct
        </Text>
        <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
          <Text style={styles.question}>
            {questions[this.state.attempt].question}
          </Text>
        </Animated.View>
        <Animated.View
          style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}
        >
          <Text style={styles.question}>
            {questions[this.state.attempt].answer}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={this.flipCard}>
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
          backToDeck={this.backToDeck}
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
  flipCard: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    backfaceVisibility: "hidden",
    minHeight: 250,
    marginTop: 30,
    padding: 15,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },

  flipCardBack: {
    position: "absolute",
    top: 85
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
