import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { calRealPrice } from "../ultils/ProductUtils";

export const SelectedCartItem = ({ item, SubComponent }) => {
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
              {item.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.price}>
                {`${calRealPrice(item.unitPrice, item.discountOff)}`}
                <Text
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  đ
                </Text>
              </Text>
              {item?.discountOff > 0 && (
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontSize: 12,
                    alignSelf: "flex-end",

                    color: "grey",
                    marginLeft: 10,
                  }}
                >
                  {`${item.unitPrice}`}{" "}
                  <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
                </Text>
              )}
            </View>
            {Number(item?.discountOff) > 0 && (
              <View style={styles.discount}>
                <Text
                  style={{ color: "#ea4335", fontSize: 12 }}
                >{`- ${item.discountOff} %`}</Text>
              </View>
            )}
          </View>

          <View style={styles.quantity}>
            <Text style={{ color: "black" }}>Số lượng: </Text>
            <Text>{item.quantity}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          paddingRight: 20,
        }}
      >
        <Text>Tổng cộng: </Text>
        <Text
          style={{
            alignSelf: "baseline",
            paddingHorizontal: 5,
            color: "#e83e52",
          }}
        >
          {`${calRealPrice(item.unitPrice * item.quantity, item.discountOff)}`}
          <Text
            style={{
              textDecorationLine: "underline",
            }}
          >
            đ
          </Text>
        </Text>
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
});
