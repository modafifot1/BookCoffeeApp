import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AddButton, VolunmButtonUpdate } from "./MyButton";
import CheckBox from "@react-native-community/checkbox";
import Ionicon from "react-native-vector-icons/Ionicons";
import { updateCart } from "../reducers/borrowedBookCartSlice";
import { useDispatch } from "react-redux";
import { calRealPrice } from "../ultils/ProductUtils";
export const BookCartItem = ({ item, allChecked, setCarts, carts, index }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);
  const [check, setCheck] = useState(item.isChecked);
  useEffect(() => {
    let temp = [...carts];
    temp[index].isChecked =
      allChecked === -1 ? item.isChecked : allChecked === 1;

    setCarts(temp);
    setCheck(item.isChecked);
  }, [allChecked]);
  const onPress = (updateQuantity) => {
    if (updateQuantity > 0 && updateQuantity <= 20) {
      dispatch(
        updateCart({
          borrowedBookCartId: item._id,
          quantity: updateQuantity,
          resolve: (res) => {
            if (res.status < 300) {
              setQuantity(updateQuantity);
            }
          },
        })
      );
    }
  };
  return (
    <View style={styles.cartItem}>
      <CheckBox
        style={{ marginRight: 10 }}
        value={check}
        onValueChange={(value) => {
          let temp = [...carts];
          temp[index].isChecked = value;

          setCheck(!check);
          setCarts(temp);
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
        <View style={styles.author}>
          <Text style={styles.price}>{item.author}</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {`C??n l???i`}
          </Text>
          <View
            style={{
              backgroundColor: "#ea4335",
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 50,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{ color: "white", textAlign: "center" }}
            >{`${item.bookQuantity}`}</Text>
          </View>
          <Text>Quy???n</Text>
        </View>
        <View style={styles.controlButton}>
          <VolunmButtonUpdate
            quantity={quantity}
            onPress={onPress}
          ></VolunmButtonUpdate>
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
    marginTop: 10,
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
  price: {
    alignSelf: "baseline",
    paddingHorizontal: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#e83e52",
    color: "#e83e52",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
