import React from "react";
import { View, Text } from "react-native";
import { OrderItem } from "../components/OrderItem";

export default function OrdersScreen({ navigation }) {
  return (
    <View>
      <OrderItem></OrderItem>
    </View>
  );
}
