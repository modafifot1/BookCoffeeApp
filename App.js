import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CategoryListItem from "./components/CategoryListItem";
export default function App() {
  return (
    <View>
      <ScrollView>
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
