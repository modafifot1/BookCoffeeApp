import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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
} from "./screens";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./ultils";
import { setToken } from "./reducers/authSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
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
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartsScreen}></CartStack.Screen>
      <CartStack.Screen
        name="Selectedcarts"
        component={SelectedcartsScreen}
      ></CartStack.Screen>
    </CartStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();
const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen
        name="Order"
        component={OrdersScreen}
        options={{ title: "Orders" }}
      ></OrderStack.Screen>
    </OrderStack.Navigator>
  );
};
const MyProfileStack = createNativeStackNavigator();
const MyProfileStackScreen = () => {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="My profile"
        component={MyProfileScreen}
        options={{ title: "My profile" }}
      ></MyProfileStack.Screen>
    </MyProfileStack.Navigator>
  );
};

const LoginStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
  const { loading, token, error } = useSelector((state) => state.auth);
  console.log("Token: ", token);

  const dispatch = useDispatch();
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
            headerTitleAlign: "center",
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
              }
              return <Ionicons name={iconName} size={24} color={color} />;
            },
          })}
          labeled={false}
          activeColor={"#ea4335"}
          inactiveColor={"gray"}
          barStyle={{
            backgroundColor: "white",
          }}
        >
          <Tab.Screen name="HomeStack" component={HomeStackScreen}></Tab.Screen>
          <Tab.Screen name="CartStack" component={CartStackScreen}></Tab.Screen>
          <Tab.Screen
            name="OrderStack"
            component={OrderStackScreen}
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
