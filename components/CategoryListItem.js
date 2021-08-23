import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SkiiImage from "../assets/ski.png";

export default function CateGoryListItem(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Skii Image</Text>
      <Image style={styles.categotyImage} source={SkiiImage}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryImage: {
    width: 64,
    height: 64,
  },
  container: {
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    backgroundColor: "#28ba93",
    shadowColor: "#ff00ff",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    marginTop: 16,
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700",
  },
});
