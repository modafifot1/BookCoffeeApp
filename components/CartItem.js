import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AddButton, VolunmButton } from "./MyButton";
import CheckBox from "@react-native-community/checkbox";
import Ionicon from "react-native-vector-icons/Ionicons";
export const CartItem = ({ item, allChecked }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const onCart = () => {};
  const [check, setCheck] = useState(allChecked);
  useEffect(() => {
    setCheck(allChecked);
  }, [allChecked]);
  return (
    <View style={styles.cartItem}>
      <CheckBox
        style={{ marginRight: 10 }}
        value={check}
        onValueChange={() => {
          setCheck(!check);
        }}
        disabled={false}
        tintColors={{ true: "#ea4335", false: "#ea0000" }}
      />
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
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
              {`${item.unitPrice}`}
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
        <View style={styles.controlButton}>
          <VolunmButton
            quantity={quantity}
            setQuantity={setQuantity}
          ></VolunmButton>
        </View>
        <View></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  checkBoxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: { width: 64, height: 64 },
  cartItem: {
    display: "flex",
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
    height: "70%",
    marginLeft: 40,
    width: "50%",
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
