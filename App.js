import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator } from "react-navigation";
import Decks from "./components/Decks";
import CreateDeck from "./components/CreateDeck";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
  render() {
    return <Tabs />;
  }
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarIcon: () => <Ionicons name="ios-albums-outline" size={25} />
      }
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        title: "New Deck",
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
