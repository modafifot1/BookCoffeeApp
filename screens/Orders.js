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
