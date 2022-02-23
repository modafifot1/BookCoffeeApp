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
import { SelectedBookCartItem } from "../components/SelectedBookCartItem";
import IonIcons from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
import moment from "moment";

export const BorrowedBookDetailScreen = ({ route, navigation }) => {
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
  const { borrowedBookItems, tableCode, createAt, status, updateAt } =
    route.params;

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
          Chi tiết thông tin sách mượn
        </Text>
      </View>

      <FlatList
        data={borrowedBookItems}
        renderItem={({ item, index }) => (
          <SelectedBookCartItem item={item}></SelectedBookCartItem>
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
                <Text>{` Số lượng sách mượn ${borrowedBookItems.reduce(
                  (pre, cur) => pre + cur.quantity,
                  0
                )}`}</Text>
              </View>
            </View>
            <View style={{ alignSelf: "flex-start" }}>
              <Text style={{ color: "#e83e52" }}>{`${
                status === 0
                  ? "Chờ xác nhận"
                  : status === 1
                  ? "Đang mượn"
                  : "Đã trả"
              }`}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ color: "gray", fontStyle: "italic" }}>
                  Ngày mượn:
                </Text>
                <Text
                  style={{ color: "gray", marginLeft: 10, fontStyle: "italic" }}
                >
                  {`${moment(createAt).format("DD - MM - YYYY", "hh:mm:ss")}`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ color: "gray", fontStyle: "italic" }}>
                  Ngày trả:
                </Text>
                <Text
                  style={{ color: "gray", marginLeft: 10, fontStyle: "italic" }}
                >
                  {`${
                    updateAt && status == 2
                      ? moment(createAt).format("DD - MM - YYYY", "hh:mm:ss")
                      : "Chưa trả"
                  }`}
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
