import React, { useEffect } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
// import { OrderItem } from "./OrderItem";
import { BorrowedBookItem } from "./BorrowedBookItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { getOrdersByStatus } from "../reducers/orderSlice";
import { getBorrowedBooksByStatus } from "../reducers/borrowedBookSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/LoadingMore";
import { LoadingPage } from "./LoadingPage";
import { vh } from "../ultils";
const SecondRoute = ({ status }) => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { borrowedBook, borrowedBooks } = useSelector(
    (state) => state.borrowedBook
  );
  useEffect(() => {
    if (isFocused) {
      dispatch(getBorrowedBooksByStatus(status));
    }
  }, [isFocused]);
  return borrowedBooks.loading ? (
    <Loading></Loading>
  ) : borrowedBook.loading ? (
    <LoadingPage></LoadingPage>
  ) : borrowedBooks.data.length == 0 ? (
    <Text
      style={{
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        fontWeight: "bold",
        marginTop: 20,
      }}
    >
      Hiện không có dữ liệu ở mục này!
    </Text>
  ) : (
    <View style={{ height: vh(78) }}>
      <FlatList
        data={borrowedBooks.data}
        renderItem={({ item }) => (
          <BorrowedBookItem
            borrowedBook={item}
            navigation={navigation}
          ></BorrowedBookItem>
        )}
        keyExtractor={(borrowedBook) => `${borrowedBook._id}`}
      ></FlatList>
    </View>
  );
};

const AllBorrowedBook = () => <SecondRoute status={-1}></SecondRoute>;
const PendingBorrowedBook = () => <SecondRoute status={0}></SecondRoute>;
const PreparingBorrowedBook = () => <SecondRoute status={1}></SecondRoute>;
const CompleteBorrowedBook = () => <SecondRoute status={2}></SecondRoute>;
const TopTab = createMaterialTopTabNavigator();
export const BorrowedBooksTopStackScreen = () => {
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
        name="allBorrowedBook"
        component={AllBorrowedBook}
        options={{ tabBarLabel: "Tất cả" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="pendingBorrowedBook"
        component={PendingBorrowedBook}
        options={{ tabBarLabel: "Chờ xác nhận" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="preparingBorrowedBook"
        component={PreparingBorrowedBook}
        options={{ tabBarLabel: "Đang mượn" }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="completedBorrowedBook"
        component={CompleteBorrowedBook}
        options={{ tabBarLabel: "Đã trả" }}
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
