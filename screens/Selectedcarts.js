import React, { useState } from "react";
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
import IonIcon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";
const radioData = [
  { id: 1, label: "Tiền mặt", value: 1, size: 18, color: "tomato" },
  { id: 2, label: "Ví momo", value: 2, size: 18, color: "tomato" },
];
// const orderItems = [
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   }
// ];
export const SelectedcartsScreen = ({ navigation, route }) => {
  console.log(route.params);
  const orderItems = route.params.selectedCarts;
  const tableCode = route.params.tableCode;
  const total = route.params.total;
  const onBuy = () => {};
  const onBack = () => {
    navigation.goBack();
  };
  const [paymentMethod, setPaymentMethod] = useState(1);
  const onSelectPaymentMethod = (value) => {
    setPaymentMethod(value);
  };
  return (
    <View style={styles.orderContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: "auto" }} onPress={onBack}>
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
            {tableCode}
          </Text>
        </View>
      </View>
      <FlatList
        data={orderItems}
        renderItem={({ item, index }) => (
          <SelectedCartItem item={item}></SelectedCartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: "71%" }}
      ></FlatList>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                color: "tomato",
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "tomato",
                width: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <IonIcon name="dollar" style={{ color: "tomato" }}></IonIcon>
            </View>

            <Text>Phương thức thanh toán</Text>
          </View>
          <RadioGroup
            containerStyle={{ flexDirection: "row" }}
            radioButtons={radioData}
            onPress={onSelectPaymentMethod}
          ></RadioGroup>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Tổng thanh toán: </Text>
            <Text style={{ color: "#e83e52" }}>
              {`${total}`}{" "}
              <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
            </Text>
          </View>
          <BuyButton label="Thanh toán" onPress={onBuy}></BuyButton>
        </View>
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
    paddingHorizontal: 10,
    paddingTop: 10,
    height: vh(10),
    borderTopWidth: 1,
    borderTopColor: "#ccd6dd",
  },
});
