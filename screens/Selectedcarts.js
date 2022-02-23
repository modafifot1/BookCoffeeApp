import React, { useState } from "react";
import {
  Platform,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SelectedCartItem } from "../components/SelectedCartItem";
import IonIcons from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
import { BuyButton } from "../components/MyButton";
import IonIcon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";
import { purchase, paymentMomo } from "../reducers/orderSlice";
import RNMomosdk from "react-native-momosdk";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../components/LoadingPage";
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);

const merchantname = "BCoffee";
const merchantcode = "MOMOBFGB20211225";
const merchantNameLabel = "Bcoffee";
const billdescription = "Thanh toán BCoffee";
const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION

// const orderItems = [
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   }
// ];
export const SelectedcartsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const orderItems = route.params.selectedCarts;
  const tableCode = route.params.tableCode;
  const total = route.params.total;
  const onBack = () => {
    navigation.goBack();
  };
  const { loading } = useSelector((state) => state.order);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const radioData = [
    {
      id: 1,
      label: "Tiền mặt",
      value: "COD",
      size: 18,
      color: "tomato",
      selected: true,
    },
    { id: 2, label: "Ví momo", value: "WAL", size: 18, color: "tomato" },
  ];
  const onSelectPaymentMethod = (value) => {
    value = value.filter((item) => item.selected);
    setPaymentMethod(value[0].value);
  };
  const { newOrder } = useSelector((state) => state.order);
  let fromapp; //ALWAYS:: fromapp==momotransfer
  let momoToken;
  let phonenumber;
  let message;
  let orderId;
  EventEmitter.addListener(
    "RCTMoMoNoficationCenterRequestTokenReceived",
    (response) => {
      try {
        if (response && response.status == 0) {
          //SUCCESS: continue to submit momoToken,phonenumber to server
          fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
          momoToken = response.data;
          phonenumber = response.phonenumber;
          message = response.message;
          orderId = response.refOrderId;
        } else {
          //let message = response.message;
          //Has Error: show message here
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  );
  //OPTIONAL
  EventEmitter.addListener(
    "RCTMoMoNoficationCenterRequestTokenState",
    (response) => {
      // status = 1: Parameters valid & ready to open MoMo app.
      // status = 2: canOpenURL failed for URL MoMo app
      // status = 3: Parameters invalid
    }
  );

  const onBuy = async () => {
    const ids = orderItems.map((item) => item._id);
    dispatch(
      purchase({
        cartItems: ids,
        tableCode,
        total,
        paymentMethod,
        resolve: (res) => {
          if (res.status < 300 && paymentMethod === "COD") {
            navigation.navigate("OrderResult", {
              orderItems,
              total,
              tableCode,
              status: 0,
              paymentMethod,
              createAt: res.createAt,
              isPaid: false,
            });
          }
        },
      })
    );
    if (paymentMethod === "COD") {
      return;
    }
    let jsonData = {};
    jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = merchantname; //edit your merchantname here
    jsonData.merchantcode = merchantcode; //edit your merchantcode here
    jsonData.merchantnamelabel = merchantNameLabel;
    jsonData.description = billdescription;
    jsonData.amount = parseInt(total); //order total amount
    jsonData.orderId = newOrder.orderId;
    jsonData.orderLabel = "Ma don hang";

    let dataPayment = await RNMomosdk.requestPayment(jsonData);
    momoHandleResponse(dataPayment);
  };
  const momoHandleResponse = async (response) => {
    try {
      let isPaid = false;
      console.log("Response from momo: ", response);
      if (response && response.status == 0) {
        //SUCCESS continue to submit momoToken,phonenumber to server
        let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        let message = response.message;
        let partnerRefId = response.orderId;
        if (message === "Successful") {
          const data = {
            partnerCode: merchantcode,
            amount: parseInt(total),
            customerNumber: phonenumber,
            appData: momoToken,
            version: 2.0,
            payType: 3,
            orderId: newOrder.orderId,
            partnerRefId,
          };
          dispatch(paymentMomo(data));
          isPaid = true;
        }
      }
      navigation.navigate("OrderResult", {
        orderItems,
        total,
        tableCode,
        status: 0,
        paymentMethod,
        createAt: newOrder.createAt,
        isPaid,
      });
    } catch (ex) {}
  };
  return (
    <View style={styles.orderContainer}>
      {loading && <LoadingPage></LoadingPage>}
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: "auto" }} onPress={onBack}>
          <IonIcons name="chevron-back" style={{ fontSize: 18 }}></IonIcons>
        </TouchableOpacity>
        <Text style={{ marginTop: "auto", marginLeft: 20, fontWeight: "bold" }}>
          Kiểm tra đơn hàng
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
        data={orderItems}
        renderItem={({ item, index }) => (
          <SelectedCartItem item={item}></SelectedCartItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        style={{ height: "70%" }}
      ></FlatList>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                color: "tomato",
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "tomato",
                width: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <IonIcon name="dollar" style={{ color: "tomato" }}></IonIcon>
            </View>

            <Text>Phương thức thanh toán</Text>
          </View>
          <RadioGroup
            containerStyle={{ flexDirection: "row" }}
            radioButtons={radioData}
            onPress={onSelectPaymentMethod}
          ></RadioGroup>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Tổng thanh toán: </Text>
            <Text style={{ color: "#e83e52" }}>
              {`${
                Math.round(total)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " "
              }`}{" "}
              <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
            </Text>
          </View>
          <BuyButton label="Thanh toán" onPress={onBuy}></BuyButton>
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
