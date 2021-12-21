import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { OrderItem } from "../components/OrderItem";
import { vh } from "../ultils";
import IonIcons from "react-native-vector-icons/Ionicons";
import TopTab from "../components/TopTab";

const orders = [
  {
    _id: "60a5ecdd98cf780015b07baaf",
    item: {
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
  },
  {
    _id: "wwww",
    item: {
      confirmed: true,
      _id: "wwww",
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
  },
  {
    _id: "60a5ecdd98cf780tyyty015b07baaf",
    item: {
      confirmed: true,
      _id: "60a5ecdd98cf780tyyty015b07baaf",
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
  },
];
export default function OrdersScreen({ navigation }) {
  return (
    <View style={{ height: vh(100) }}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: "auto" }}>
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity>
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Đơn mua
        </Text>
      </View>
      <TopTab navigation={navigation}></TopTab>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: vh(6),
    paddingBottom: 10,
  },
});
