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
        <Tabs />
      </Provider>
    );
  }
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: "HOME"
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "DECK VIEW"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "ADD CARD"
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "QUIZ"
    }
  }
});

const CreateDeckNavigator = StackNavigator({
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      title: "ADD DECK"
    }
  }
});

const Tabs = TabNavigator(
  {
    Home: {
      screen: MainNavigator,
      navigationOptions: {
        tabBarIcon: () => <Ionicons name="ios-albums-outline" size={25} />,
        title: "DECK LIST"
      }
    },
    CreateDeck: {
      screen: CreateDeckNavigator,
      navigationOptions: {
        tabBarIcon: () => <Ionicons name="ios-create-outline" size={25} />,
        title: "CREATE DECK"
      }
    }
  },
  {
    initalRouteName: "Home",
    animationEnabled: true,
    swipeEnabled: true,
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
