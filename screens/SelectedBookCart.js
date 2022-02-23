import React, { useState } from "react";
import {
  NativeModules,
  NativeEventEmitter,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SelectedBookCartItem } from "../components/SelectedBookCartItem";
import IonIcons from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
import { BuyButton } from "../components/MyButton";
import IonIcon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";
import {} from "../reducers/borrowedBookSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../components/LoadingPage";
import { calTotalBook } from "../ultils/ProductUtils";
import moment from "moment";
export const SelectedBookCartsScreen = ({ navigation, route }) => {
  moment.locale("vi");
  const dispatch = useDispatch();
  const bookItems = route.params.selectedCarts;
  const tableCode = route.params.tableCode;
  const createAt = route.params.createAt;
  const onBack = () => {
    navigation.goBack();
  };
  const { loading } = useSelector((state) => state.order);
  const { newOrder } = useSelector((state) => state.order);

  return (
    <View style={styles.orderContainer}>
      {loading && <LoadingPage></LoadingPage>}
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: "auto" }} onPress={onBack}>
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity>
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Thông tin sách mượn
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
        data={bookItems}
        renderItem={({ item, index }) => (
          <SelectedBookCartItem item={item}></SelectedBookCartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: "70%" }}
      ></FlatList>
      <View style={styles.footer}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Tổng số sách đăng ký mượn: </Text>
            <Text style={{ color: "#e83e52" }}>
              {`${calTotalBook(bookItems)} quyển`}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Ngày mượn </Text>
            <Text style={{ color: "#e83e52" }}>
              {moment(createAt).format("DD - MM - YYYY, h:mm:ss")}
            </Text>
          </View>
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
    height: vh(6),
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: "black",
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
