import React from "react";
import { StyleSheet, Text, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { vw } from "../ultils";
import { SelectedCartItem } from "./SelectedCartItem";
import { LinearGradient } from "expo-linear-gradient";
const order = {
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
};
export const OrderItem = () => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: vw(100),
        }}
      >
        <View style={styles.selectedTable}>
          <Text> Đơn hàng bàn số: </Text>
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
        <View>
          <Text>{`Số sản phẩm: ${5}`}</Text>
        </View>
      </View>
      <SelectedCartItem
        item={order.item}
        SubComponent={() => {
          return (
            <View
              colors={["rgba(232, 62, 82,0.8)", "rgba(232, 62, 82, 1)"]}
              style={styles.viewDetailsContainer}
            >
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={{ color: "gray" }}>Xem thêm sản phẩm</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></SelectedCartItem>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTable: {
    paddingVertical: 10,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  viewDetailsContainer: {
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
  viewDetailsButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
