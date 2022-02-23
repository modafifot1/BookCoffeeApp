import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { vw } from "../ultils";
import { SelectedBookCartItem } from "./SelectedBookCartItem";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
// import { getOrderById } from "../reducers/orderSlice";
import { getBorrowdBookedById } from "../reducers/borrowedBookSlice";
import { calTotalBook } from "../ultils/ProductUtils";
const statusMap = {
  0: "Chờ xác nhận",
  1: "Đang chuẩn bị",
  2: "Hoàn thành",
};

export const BorrowedBookItem = ({ navigation, borrowedBook }) => {
  const dispatch = useDispatch();
  const onDetail = () => {
    dispatch(
      getBorrowdBookedById({
        borrowedBookId: borrowedBook._id,
        resolve: (res) => {
          if (res.status < 300) {
            navigation.navigate("BorowedBookDetail", {
              borrowedBookItems: res.borrowedBookItems,
              tableCode: res.tableCode,
              status: res.statusId,
              createAt: res.createAt,
              updateAt: res.updateAt,
            });
          }
        },
      })
    );
  };
  return (
    <View style={{ paddingTop: 20 }}>
      <View
        style={{
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: vw(100),
        }}
      >
        <View>
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
              {borrowedBook.tableCode}
            </Text>
          </View>
          <View>
            <Text>{` Số lượng sách ${borrowedBook.borrowedBookItems.reduce(
              (pre, cur) => pre + cur.quantity,
              0
            )}`}</Text>
          </View>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={{ color: "#e83e52" }}>{`${
            statusMap[borrowedBook.statusId]
          }`}</Text>
        </View>
      </View>
      <SelectedBookCartItem
        item={borrowedBook.item}
        SubComponent={() => {
          return (
            <View
              colors={["rgba(232, 62, 82,0.8)", "rgba(232, 62, 82, 1)"]}
              style={styles.viewDetailsContainer}
            >
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={onDetail}
              >
                <Text style={{ color: "gray" }}>Xem thêm sách</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></SelectedBookCartItem>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTable: {
    paddingBottom: 10,
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
