import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Easing,
  FlatList,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
export const Toast = ({ title, message, isError }) => {
  const messageBoxAnimation = useRef(new Animated.Value(-vh(30))).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const zIndex = useRef(new Animated.Value(999)).current;
  const closeToast = () => {
    Animated.timing(containerOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
      // easing: Easing.bounce,
    }).start();
    Animated.timing(zIndex, {
      toValue: -999,
      duration: 100,
      useNativeDriver: false,
    }).start();
    // setTimeout(() => {

    // }, 100);
  };
  useEffect(() => {
    Animated.spring(messageBoxAnimation, {
      toValue: vh(5),
      duration: 700,
      friction: 2,
      tension: 10,
      useNativeDriver: false,
    }).start(closeToast);
  }, [messageBoxAnimation]);

  if (message) {
    return (
      <Animated.View
        style={[styles.toastContainer, { opacity: containerOpacity, zIndex }]}
      >
        <Animated.View
          style={[
            styles.toastBox,
            {
              transform: [{ translateY: messageBoxAnimation }],
            },
          ]}
        >
          <Ionicon
            name={isError ? "close-circle-sharp" : "checkmark-done-circle"}
            style={[styles.icon, { color: isError ? "red" : "green" }]}
          ></Ionicon>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingTop: 10 }}>
            {title}
          </Text>
          <Text style={styles.toastMessage}>{message}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    width: vw(100),
    height: vh(100),
    zIndex: 999,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  toastBox: {
    backgroundColor: "white",
    maxWidth: vw(50),
    maxHeight: vh(30),
    zIndex: 9999,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,

    justifyContent: "space-around",
    alignItems: "center",
    fontSize: 32,
  },
  toastMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  icon: {
    fontSize: 42,
  },
});
