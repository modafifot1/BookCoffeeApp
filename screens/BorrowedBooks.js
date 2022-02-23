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
// import TopTab from "../components/TopTab";
import { BorrowedBooksTopStackScreen } from "../components/BookTopTab";

export const BorrowedBooksScreen = ({ navigation }) => {
  return (
    <View style={{ height: vh(100) }}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={{ marginTop: "auto" }}>
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity> */}
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Danh Mượn trả sách
        </Text>
      </View>
      <BorrowedBooksTopStackScreen
        navigation={navigation}
      ></BorrowedBooksTopStackScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: vh(6),
    paddingBottom: 10,
  },
});
