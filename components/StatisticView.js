import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const StatisticView = props => {
  const { modalVisible, resetQuiz, statistic } = props;
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        alert("Modal has been closed.");
      }}
    >
      <View style={styles.statistic}>
        <View>
          <Ionicons style={styles.statImage} name="ios-stats" size={50} />
          <Text style={styles.titleh1}>STATISTIC</Text>
          <Text style={styles.statisticText}>
            Total: {statistic.attempt + 1} questions
          </Text>
          <Text style={styles.statisticText}>Score: {statistic.score}</Text>
          <Text style={styles.statisticText}>
            {statistic.percents} % correct
          </Text>
          <Text style={styles.statisticText}>
            {statistic.percents >= 50 && (
              <Entypo name="emoji-happy" color="green" size={18}>
                <Text> Great, well done!</Text>
              </Entypo>
            )}
            {statistic.percents < 50 && (
              <Entypo name="emoji-neutral" size={18} color="orange">
                <Text> There's room for improvement...</Text>
              </Entypo>
            )}
          </Text>

          <TouchableOpacity style={styles.btnDefault} onPress={resetQuiz}>
            <Text style={styles.btnText}>BACK TO QUIZ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StatisticView;

const styles = StyleSheet.create({
  btnDefault: {
    alignSelf: "center",
    backgroundColor: "#2089dc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 200
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
  statImage: {
    alignSelf: "center"
  },
  titleh1: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  statisticText: {
    alignSelf: "center",
    fontSize: 16,
    paddingBottom: 10
  }
});
