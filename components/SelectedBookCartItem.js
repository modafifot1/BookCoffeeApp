import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { calRealPrice } from "../ultils/ProductUtils";

export const SelectedBookCartItem = ({ item, SubComponent }) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ccd6dd",
        marginHorizontal: 3,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 120,
          // backgroundColor: "yellow",
        }}
      >
        <View style={styles.img}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          ></Image>
        </View>
        <View style={styles.content}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={styles.author}>
            <Text style={styles.price}>{item.author}</Text>
          </View>
          <View style={styles.quantity}>
            <Text style={{ color: "black" }}>Số lượng: </Text>
            <Text>{item.quantity}</Text>
          </View>
        </View>
      </View>
      {SubComponent && <SubComponent></SubComponent>}
    </View>
  );
};
const styles = StyleSheet.create({
  checkbox: { width: 64, height: 64 },
  orderItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  img: {
    width: 100,
    height: 100,
  },
  content: {
    justifyContent: "space-between",
    height: "60%",
    marginLeft: 40,
    width: "50%",
  },
  quantity: {
    flexDirection: "row",
  },
  price: {
    alignSelf: "baseline",
    paddingHorizontal: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#e83e52",
    color: "#e83e52",
  },
  discount: {
    width: 45,
    height: 25,
    backgroundColor: "rgba(234, 67, 53, 0.3)",
    borderWidth: 1,
    borderColor: "rgb(234, 67, 53)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
