import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
// import { CartItem } from "../components/CartItem";
import { BookCartItem } from "../components/BookCartItem";
import { vh, vw } from "../ultils";
import CheckBox from "@react-native-community/checkbox";
import { DeleteButton, BuyButton } from "../components/MyButton";
import { LoadingPage } from "../components/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  deleteCartItems,
} from "../reducers/borrowedBookCartSlice";
import {
  useIsFocused,
  CommonActions,
  CommonNavigationAction,
} from "@react-navigation/native";
import { Loading } from "../components/LoadingMore";
import { calTotalBook } from "../ultils/ProductUtils";
import { Toast } from "../components/Toast";
import { createBorrowedBook } from "../reducers/borrowedBookSlice";
import { useToast } from "react-native-fast-toast";

export const BookCartsScreen = ({ navigation, route }) => {
  const [toastContent, setToastContent] = useState({
    title: "",
    messsage: "",
    isError: false,
  });
  const [tableCode, setTableCode] = useState(null);
  const checkedId = route.params?.selectedItemId;
  const { numOfItems, loading, updateLoading } = useSelector(
    (state) => state.borrowedBookCart
  );
  const { borrowedBooks } = useSelector((state) => state.borrowedBook);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  const toast = useToast();
  useEffect(() => {
    if (isFocused) {
      navigation.dispatch(CommonActions.setParams({ selectedItemId: "" }));
      setAllChecked(-1);
      setTableCode(null);
      dispatch(
        getCartItems((res) => {
          setCarts(
            res.borrowedBookCartItems.map((item) => {
              const isChecked = checkedId === item.bookId;
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
  const [allChecked, setAllChecked] = useState(-1);
  const onBuy = () => {
    const selectedCarts = carts.filter((item) => item.isChecked);
    // const cartItems = selectedCarts.map((item) => item._id);
    if (!selectedCarts.length) {
      toast.show("Vui lòng chọn sách để mượn!", {
        type: "danger",
        duration: 3000,
        animationType: "zoom-in",
      });
      return;
    }
    dispatch(
      createBorrowedBook({
        borrowedBookItems: selectedCarts,
        resolve: (res) => {
          if (res.status < 300) {
            toast.show("Đăng ký mượn sách thành công!", {
              type: "success",
              duration: 3000,
              animationType: "zoom-in",
            });
            navigation.navigate("SelectedBookCarts", {
              selectedCarts,
              tableCode: res.borowedBook.tableCode,
              createAt: res.borowedBook.createAt,
            });
          } else {
            toast.show(res.msg, {
              type: "danger",
              duration: 3000,
              animationType: "zoom-in",
            });
          }
        },
      })
    );
  };
  const onDelete = () => {
    const borrowedBookCartItems = carts.reduce((pre, cur) => {
      if (cur.isChecked) {
        pre.push(cur._id);
      }
      return pre;
    }, []);
    if (borrowedBookCartItems.length === 0) return;
    dispatch(
      deleteCartItems({
        borrowedBookCartItems: { borrowedBookCartItems },
        resolve: (res) => {
          setCarts([
            ...carts.filter(
              (item) => !res.borrowedBookCartItems?.includes(item._id)
            ),
          ]);
        },
      })
    );
  };

  return (
    <View style={styles.cartContainer}>
      {borrowedBooks.loading && <LoadingPage></LoadingPage>}
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
          {`Giỏ sách (${numOfItems})`}
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
          <Text>Tất cả</Text>
        </View>
      </View>
      {loading ? (
        <Loading></Loading>
      ) : (
        <View>
          <FlatList
            data={carts}
            renderItem={({ item, index }) => (
              <BookCartItem
                item={item}
                index={index}
                allChecked={allChecked}
                setCarts={setCarts}
                carts={carts}
              ></BookCartItem>
            )}
            keyExtractor={(item) => `${item._id}`}
            style={{ height: "75%" }}
            ListFooterComponentStyle={{ paddingHorizontal: 20 }}
          ></FlatList>
          <View style={styles.footer}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>{`Bàn: `}</Text>
                <Text>{tableCode || "chưa chọn"}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Số sách đã chọn: </Text>
                <Text style={styles.price}>{`${calTotalBook(carts)}`} </Text>
              </View>
            </View>
            <BuyButton label="Mượn sách" onPress={onBuy}></BuyButton>
          </View>
        </View>
      )}
      {updateLoading && <LoadingPage></LoadingPage>}
    </View>
  );
};
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
