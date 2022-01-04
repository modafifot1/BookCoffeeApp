import React from "react";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import store from "./store";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden></StatusBar>
      <AppNavigator></AppNavigator>
    </Provider>
  );
}
