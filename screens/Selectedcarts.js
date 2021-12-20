import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SelectedCartItem } from "../components/SelectedCartItem";
import IonIcons from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
import { BuyButton } from "../components/MyButton";

const orderItems = [
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baaf",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baas",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf78gfhfjj0015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cfjhhj780015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf78001gfg5b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
];
export const SelectedcartsScreen = () => {
  const onBuy = () => {};
  return (
    <View style={styles.orderContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: "auto" }}>
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity>
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Kiểm tra đơn hàng
        </Text>
      </View>
      <View style={styles.selectedTableContainer}>
        <View style={styles.selectedTable}>
          <Text>Bàn số: </Text>
          <Text
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#e83e52",
              color: "white",
              backgroundColor: "#e83e52",
              textAlign: "center",
              lineHeight: 18,
              fontSize: 12,
            }}
          >
            {5}
          </Text>
        </View>
      </View>
      <FlatList
        data={orderItems}
        renderItem={({ item, index }) => (
          <SelectedCartItem item={item}></SelectedCartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: "73%" }}
      ></FlatList>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <Text>Tổng thanh toán: </Text>
          <Text style={{ color: "#e83e52" }}>
            {`200000`}{" "}
            <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
          </Text>
        </View>
        <BuyButton label="Thanh toán" onPress={onBuy}></BuyButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  selectedTableContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: vh(8),
    alignItems: "center",
    paddingBottom: 10,
  },
  selectedTable: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: vw(95),
    borderWidth: 1,
    borderColor: "#e83e52",
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: vh(10),
    borderTopWidth: 1,
    borderTopColor: "#ccd6dd",
  },
});
