import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import CreateDeck from "./components/CreateDeck";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import QuizView from "./components/QuizView";
import { Ionicons } from "@expo/vector-icons";
import { setLocalNotification } from "./utils/notification";

const store = createStore(reducer);

export default class App extends React.Component {
  componentDidMount() {
    // ask for permission to send notifications
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarIcon: () => <Ionicons name="ios-albums-outline" size={25} />,
        title: "Home"
      }
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        title: "Create Deck",
        tabBarIcon: () => <Ionicons name="ios-create-outline" size={25} />
      }
    }
  },
  {
    initalRouteName: "Decks",
    tabBarOptions: {
      activeTintColor: "tomato",
      style: {
        paddingTop: 5
      },
      labelStyle: {
        fontSize: 14
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck View"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card"
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "Quiz"
    }
  }
});
