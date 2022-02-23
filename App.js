import React from "react";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import store from "./store";
import { StatusBar } from "react-native";
import { ToastProvider } from "react-native-fast-toast";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <StatusBar hidden></StatusBar>
        <AppNavigator></AppNavigator>
      </ToastProvider>
    </Provider>
  );
}
