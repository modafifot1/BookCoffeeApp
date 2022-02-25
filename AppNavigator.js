import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ProductsScreen,
  CartsScreen,
  OrdersScreen,
  MyProfileScreen,
  CategoryScreen,
  LoginScreen,
  SignupScreen,
  SelectedcartsScreen,
  ProductDetailScreen,
  OrderDetailScreen,
  OrderResultScreen,
  BooksScreen,
  BookDetailScreen,
  BookCartsScreen,
  SelectedBookCartsScreen,
  BorrowedBooksScreen,
  BorrowedBookDetailScreen,
} from "./screens";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./ultils";
import { setToken } from "./reducers/authSlice";
import { getCartItems } from "./reducers/cartsSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TopOrderStackScreen } from "./components/TopTab";
import IonIcons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { vw } from "./ultils";

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={ProductsScreen}
        options={{ title: "Home" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="productDetail"
        component={ProductDetailScreen}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const CartStack = createNativeStackNavigator();
const CartStackScreen = () => {
  return (
    <CartStack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="OrderResult"
    >
      <CartStack.Screen name="Cart" component={CartsScreen}></CartStack.Screen>
      <CartStack.Screen
        name="Selectedcarts"
        component={SelectedcartsScreen}
      ></CartStack.Screen>
      <CartStack.Screen
        name="OrderResult"
        component={OrderResultScreen}
      ></CartStack.Screen>
    </CartStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

const headerComponent = () => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          marginTop: "auto",
          marginLeft: 20,
          fontWeight: "bold",
        }}
      >
        Quản lý đơn hàng
      </Text>
    </View>
  );
};
const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Order"
        component={TopOrderStackScreen}
        options={{
          // title: "Quản lý đơn hàng",
          // headerTitleStyle: { fontSize: 16 },
          // headerStyle: { backgroundColor: "yellow" },
          headerTitle: headerComponent,
        }}
      ></OrderStack.Screen>
      <OrderStack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      ></OrderStack.Screen>
    </OrderStack.Navigator>
  );
};
const MyProfileStack = createNativeStackNavigator();
const MyProfileStackScreen = () => {
  return (
    <MyProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <MyProfileStack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ title: "My profile" }}
      ></MyProfileStack.Screen>
    </MyProfileStack.Navigator>
  );
};
const BookStack = createNativeStackNavigator();
const BookStackScreen = () => {
  return (
    <BookStack.Navigator screenOptions={{ headerShown: false }}>
      <BookStack.Screen name="Book" component={BooksScreen}></BookStack.Screen>
      <BookStack.Screen
        name="BookDetail"
        component={BookDetailScreen}
      ></BookStack.Screen>
      <BookStack.Screen
        name="BookCart"
        component={BookCartsScreen}
      ></BookStack.Screen>
      <BookStack.Screen
        name="SelectedBookCarts"
        component={SelectedBookCartsScreen}
      ></BookStack.Screen>
    </BookStack.Navigator>
  );
};
const BorrowedBookStack = createNativeStackNavigator();
const BorrowedBookStackScreeen = () => {
  return (
    <BorrowedBookStack.Navigator screenOptions={{ headerShown: false }}>
      <BorrowedBookStack.Screen
        name="BorrowedBooks"
        component={BorrowedBooksScreen}
      ></BorrowedBookStack.Screen>
      <BorrowedBookStack.Screen
        name="BorowedBookDetail"
        component={BorrowedBookDetailScreen}
      ></BorrowedBookStack.Screen>
    </BorrowedBookStack.Navigator>
  );
};
const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { token } = useSelector((state) => state.auth);
  const { numOfItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getCartItems((res) => {}));
    }
  }, [token]);
  useEffect(() => {
    async function fetchData() {
      const newToken = await getData("token");
      dispatch(setToken(newToken));
    }
    fetchData();
  }, [dispatch]);
  return (
    <NavigationContainer>
      {!token ? (
        <LoginStack.Navigator screenOptions={{ headerShown: false }}>
          <LoginStack.Screen
            name="Login"
            component={LoginScreen}
          ></LoginStack.Screen>
          <LoginStack.Screen
            name="Signup"
            component={SignupScreen}
          ></LoginStack.Screen>
        </LoginStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "HomeStack":
                  iconName = focused ? "home" : "home-outline";
                  break;
                case "CartStack":
                  iconName = focused ? "cart" : "cart-outline";
                  break;
                case "OrderStack":
                  iconName = focused
                    ? "ios-clipboard"
                    : "ios-clipboard-outline";
                  break;
                case "MyProfileStack":
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                  break;
                case "BookStack":
                  iconName = focused ? "book" : "book-outline";
                  break;
                case "BorrowedBookStack":
                  iconName = focused
                    ? "ios-bookmarks"
                    : "ios-bookmarks-outline";
              }
              return <Ionicons name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: "#ea4335",
            tabBarInactiveTintColor: "gray",
          })}
          barStyle={{
            backgroundColor: "white",
          }}
        >
          <Tab.Screen name="HomeStack" component={HomeStackScreen}></Tab.Screen>
          <Tab.Screen
            name="CartStack"
            component={CartStackScreen}
            options={{
              tabBarBadge: numOfItems,
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="OrderStack"
            component={OrderStackScreen}
          ></Tab.Screen>
          <Tab.Screen name="BookStack" component={BookStackScreen}></Tab.Screen>
          <Tab.Screen
            name="BorrowedBookStack"
            component={BorrowedBookStackScreeen}
          ></Tab.Screen>
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStackScreen}
          ></Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // paddingHorizontal: 20,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    width: vw(100),
    marginLeft: -20,
  },
});
