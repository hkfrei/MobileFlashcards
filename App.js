import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Decks from "./components/Decks";
import CreateDeck from "./components/CreateDeck";
import DeckView from "./components/DeckView";
import { Ionicons } from "@expo/vector-icons";

const store = createStore(reducer);

export default class App extends React.Component {
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
      screen: Decks,
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
  }
});
