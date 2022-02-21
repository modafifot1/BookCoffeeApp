import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { OrderItem } from "./OrderItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getOrdersByStatus } from "../reducers/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/LoadingMore";
import { LoadingPage } from "./LoadingPage";
const SecondRoute = ({ status }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, orders, loadingDetail } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    if (isFocused) {
      dispatch(getOrdersByStatus(status));
    }
  }, [isFocused]);
  return loading ? (
    <Loading></Loading>
  ) : loadingDetail ? (
    <LoadingPage></LoadingPage>
  ) : (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem order={item} navigation={navigation}></OrderItem>
      )}
      keyExtractor={(order) => `${order._id}`}
    ></FlatList>
  );
};

const allOrder = () => <SecondRoute status={-1}></SecondRoute>;
const pendingOrder = () => <SecondRoute status={0}></SecondRoute>;
const preparingOrder = () => <SecondRoute status={1}></SecondRoute>;
const completeOrder = () => <SecondRoute status={2}></SecondRoute>;
const TopTab = createMaterialTopTabNavigator();
export const TopOrderStackScreen = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {
          alignItems: "center",
          justifyContent: "space-between",
        },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
        tabBarIndicatorStyle: { borderBottomColor: "red" },
      }}
    >
      <TopTab.Screen
        name="allOrder"
        component={allOrder}
        options={{ tabBarLabel: "Tất cả" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="pendingOrder"
        component={pendingOrder}
        options={{ tabBarLabel: "Chờ xác nhận" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="preparingOrder"
        component={preparingOrder}
        options={{ tabBarLabel: "Đang chuẩn bị" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="completedOrder"
        component={completeOrder}
        options={{ tabBarLabel: "Hoàn thành" }}
      ></TopTab.Screen>
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    maxHeight: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
