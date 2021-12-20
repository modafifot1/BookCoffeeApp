import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { CartItem } from "../components/CartItem";
import { vh, vw } from "../ultils";
import CheckBox from "@react-native-community/checkbox";
import {
  SaveButton,
  DeleteButton,
  BuyButton,
  SelectButton,
} from "../components/MyButton";
import { Dialog } from "react-native-simple-dialogs";
import { SelectTable } from "../components/SelectTable";
import { LoadingPage } from "../components/LoadingPage";

const carts = [
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
export default function CartsScreen({ navigation }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const onBuy = () => {
    navigation.navigate("Selectedcarts");
  };
  return (
    <View style={styles.cartContainer}>
      <View style={styles.header}>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: "auto",
          }}
        >
          {`Giỏ hàng (${carts.length})`}
        </Text>
        <DeleteButton></DeleteButton>
      </View>
      <View style={styles.controlButton}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            tintColors={{ true: "#ea4335", false: "#ea0000" }}
            value={allChecked}
            disabled={false}
            onChange={() => setAllChecked(!allChecked)}
          ></CheckBox>
          <Text>Tất cả</Text>
        </View>
        <View style={styles.selectTable}>
          <Text style={{ fontWeight: "bold" }}>Chọn bàn: </Text>
          <SelectButton onPress={() => setDialogVisible(true)}></SelectButton>
        </View>
      </View>
      <FlatList
        data={carts}
        renderItem={({ item, index }) => (
          <CartItem item={item} allChecked={allChecked}></CartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: "76%" }}
        ListFooterComponentStyle={{ paddingHorizontal: 20 }}
      ></FlatList>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <Text>Tổng cộng: </Text>
          <Text style={styles.price}>
            {`200000`}{" "}
            <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
          </Text>
        </View>
        <BuyButton label="Thanh toán" onPress={onBuy}></BuyButton>
      </View>
      <Dialog
        visible={dialogVisible}
        title="Chọn bàn"
        onTouchOutside={() => setDialogVisible(false)}
        animationType={"fade"}
        titleStyle={{ textAlign: "center", fontWeight: "bold" }}
      >
        <SelectTable></SelectTable>
      </Dialog>
      {/* <LoadingPage></LoadingPage> */}
    </View>
  );
}
const styles = StyleSheet.create({
  cartContainer: {},
  header: {
    height: vh(8),
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingRight: 20,
  },
  selectTable: {
    height: 40,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
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
  price: {
    color: "#e83e52",
    fontSize: 18,
  },
});
