import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { CartItem } from "../components/CartItem";
import { vh, vw } from "../ultils";
import CheckBox from "@react-native-community/checkbox";
import {
  SaveButton,
  DeleteButton,
  BuyButton,
  SelectButton,
} from "../components/MyButton";
import { Dialog } from "react-native-simple-dialogs";
import { SelectTable } from "../components/SelectTable";
import { LoadingPage } from "../components/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, deleteCartItems } from "../reducers/cartsSlice";
import {
  useIsFocused,
  CommonActions,
  CommonNavigationAction,
} from "@react-navigation/native";
import { Loading } from "../components/LoadingMore";
import { calTotalPrice } from "../ultils/ProductUtils";
import { Toast } from "../components/Toast";
import { order } from "../reducers/orderSlice";

export default function CartsScreen({ navigation, route }) {
  const [toastContent, setToastContent] = useState({
    title: "",
    messsage: "",
    isError: false,
  });
  const [tableCode, setTableCode] = useState(null);
  const checkedId = route.params?.selectedItemId;
  const { numOfItems, loading, updateLoading } = useSelector(
    (state) => state.cart
  );
  const { loading: orderLoading } = useSelector((state) => state.order);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (isFocused) {
      navigation.dispatch(CommonActions.setParams({ selectedItemId: "" }));
      setAllChecked(-1);
      setTableCode(null);
      dispatch(
        getCartItems((res) => {
          setCarts(
            res.cartItems.map((item) => {
              const isChecked = checkedId === item?.foodId;
              return {
                ...item,
                isChecked,
              };
            })
          );
        })
      );
    }
  }, [isFocused]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [allChecked, setAllChecked] = useState(-1);
  const onBuy = () => {
    const selectedCarts = carts.filter((item) => item.isChecked);
    const cartItems = selectedCarts.map((item) => item._id);
    if (!selectedCarts) {
      setToastContent({
        title: "L???i",
        message: "Vui l??ng ch???n s???n ph???m",
        isError: true,
      });
      return;
    }
    if (!tableCode) {
      setToastContent({
        title: "L???i",
        messsage: "Vui l??ng ch???n b??n!",
        isError: true,
      });
      return;
    }
    dispatch(
      order({
        cartItems,
        tableCode,
        resolve: (res) => {
          if (res.status < 300) {
            navigation.navigate("Selectedcarts", {
              selectedCarts,
              tableCode,
              total: res.total,
            });
          } else {
            setToastContent({
              title: "L???i",
              messsage: res.msg,
              isError: true,
            });
          }
        },
      })
    );
  };
  const onDelete = () => {
    const cartItems = carts.reduce((pre, cur) => {
      if (cur.isChecked) {
        pre.push(cur._id);
      }
      return pre;
    }, []);
    dispatch(
      deleteCartItems({
        cartItems: { cartItems },
        resolve: (res) => {
          setCarts([
            ...carts.filter((item) => !res.cartItems?.includes(item._id)),
          ]);
        },
      })
    );
  };
  return (
    <View style={styles.cartContainer}>
      {orderLoading && <LoadingPage></LoadingPage>}
      {
        <Toast
          title={toastContent.title}
          message={toastContent.messsage}
          isError={toastContent.isError}
        ></Toast>
      }
      <View style={styles.header}>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: "auto",
          }}
        >
          {`Gi??? h??ng (${numOfItems})`}
        </Text>
        <DeleteButton onPress={onDelete}></DeleteButton>
      </View>
      <View style={styles.controlButton}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            tintColors={{ true: "#ea4335", false: "#ea0000" }}
            value={allChecked === 1 ? true : false}
            disabled={false}
            onChange={() =>
              setAllChecked(allChecked === -1 || allChecked === 0 ? 1 : 0)
            }
          ></CheckBox>
          <Text>T???t c???</Text>
        </View>
        <View style={styles.selectTable}>
          <Text style={{ fontWeight: "bold" }}>Ch???n b??n: </Text>
          <SelectButton onPress={() => setDialogVisible(true)}></SelectButton>
        </View>
      </View>
      {loading ? (
        <Loading></Loading>
      ) : (
        <View>
          <FlatList
            data={carts}
            renderItem={({ item, index }) => (
              <CartItem
                item={item}
                index={index}
                allChecked={allChecked}
                setCarts={setCarts}
                carts={carts}
              ></CartItem>
            )}
            keyExtractor={(item) => `${item._id}`}
            style={{ height: "75%" }}
            ListFooterComponentStyle={{ paddingHorizontal: 20 }}
          ></FlatList>
          <View style={styles.footer}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>{`B??n: `}</Text>
                <Text>{tableCode || "ch??a ch???n"}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>T???ng c???ng: </Text>
                <Text style={styles.price}>
                  {`${calTotalPrice(carts)}`}{" "}
                  <Text style={{ textDecorationLine: "underline" }}>??</Text>{" "}
                </Text>
              </View>
            </View>
            <BuyButton label="?????t h??ng" onPress={onBuy}></BuyButton>
          </View>
        </View>
      )}
      <Dialog
        visible={dialogVisible}
        title="Ch???n b??n"
        onTouchOutside={() => setDialogVisible(false)}
        animationType={"fade"}
        titleStyle={{ textAlign: "center", fontWeight: "bold" }}
      >
        <SelectTable
          setTableCode={setTableCode}
          tableCode={tableCode}
        ></SelectTable>
      </Dialog>
      {updateLoading && <LoadingPage></LoadingPage>}
    </View>
  );
}
const styles = StyleSheet.create({
  cartContainer: {},
  header: {
    height: vh(8),
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  selectTable: {
    height: 40,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: vh(10),
    borderTopWidth: 1,
    borderTopColor: "#ccd6dd",
  },
  price: {
    color: "#e83e52",
    fontSize: 16,
  },
});
