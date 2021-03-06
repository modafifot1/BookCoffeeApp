import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import { SelectedCartItem } from "../components/SelectedCartItem";
import IonIcons from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import PaidIcon from "../assets/images/paid.png";
import UnPaidIcon from "../assets/images/unpaid.png";
export const OrderDetailScreen = ({ route, navigation }) => {
  useEffect(() => {
    const backCustom = BackHandler.addEventListener(
      "hardwareBackPress",
      backScreen
    );
    return () => backCustom.remove();
  }, []);
  const backScreen = () => {
    navigation.pop(1);
  };
  const {
    orderItems,
    total,
    tableCode,
    status,
    paymentMethod,
    createAt,
    isPaid,
  } = route.params;

  return (
    <View style={styles.orderContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => {
            navigation.pop(2);
          }}
        >
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity>
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Chi tiết đơn hàng
        </Text>
      </View>

      <FlatList
        data={orderItems}
        renderItem={({ item, index }) => (
          <SelectedCartItem item={item}></SelectedCartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: vh(86) }}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingHorizontal: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              width: vw(100),
            }}
          >
            <Image
              source={isPaid ? PaidIcon : UnPaidIcon}
              style={{
                width: 150,
                height: 70,
                position: "absolute",
                zIndex: 999,
                top: 0,
                right: 100,
                resizeMode: "center",
              }}
            ></Image>
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
                  {tableCode}
                </Text>
              </View>
              <View>
                <Text>{` Số lượng sản phẩm ${orderItems.length}`}</Text>
              </View>
            </View>
            <View style={{ alignSelf: "flex-start" }}>
              <Text
                style={{ color: "#e83e52" }}
              >{`${status ===0 ?"Chờ xác nhận":status ===1?"Đang chuẩn bị":"Hoàn thành"}`}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text>Tổng thanh toán: </Text>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#e83e52",
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                {`${
                  Math.round(total)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " "
                }`}{" "}
                <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
              </Text>
            </View>
            <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <MaterialIcon
                    name="payments"
                    style={{ fontSize: 16, color: "#e83e52" }}
                  ></MaterialIcon>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    Phương thức thanh toán
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "gray", marginLeft: 25 }}>{`${
                    paymentMethod === "COD" ? "Tiền mặt" : "Ví momo"
                  }`}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ color: "gray", fontStyle: "italic" }}>
                  Ngày tạo đơn
                </Text>
                <Text
                  style={{ color: "gray", marginLeft: 10, fontStyle: "italic" }}
                >
                  {`${new Date(createAt).toLocaleString()}`}
                </Text>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  orderContainer: {
    position: "relative",
  },
  selectedTableContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: vh(6),
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  selectedTable: {
    paddingBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: "flex-end",
    height: vh(20),
    paddingVertical: 10,
    width: vw(100),
  },
});
