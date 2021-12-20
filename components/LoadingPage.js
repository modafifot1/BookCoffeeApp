import { create } from "lodash";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Loading from "../assets/images/coffee-loading.gif";
import { vh, vw } from "../ultils";

export const LoadingPage = () => {
  return (
    <View style={styles.containerLoader}>
      <Image source={Loading} style={{ width: vw(70), height: vw(70) }}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoader: {
    justifyContent: "center",
    alignItems: "center",
    height: vh(100),
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "rgba(204, 214, 221, 0.6)",
    width: vw(100),
  },
});
