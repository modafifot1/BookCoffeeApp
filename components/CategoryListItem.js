import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import SkiiImage from "../assets/ski.png";

export default function CateGoryListItem(props) {
  const { category, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{ paddingHorizontal: 15 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}> {category.name}</Text>
        <Image style={styles.categotyImage} source={SkiiImage}></Image>
      </View>
    </TouchableOpacity>
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
    elevation: 5,
    marginTop: 16,
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700",
  },
});
