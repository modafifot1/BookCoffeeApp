import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import {
  VolunmButton,
  AddButton,
  BuyButton,
  BorrowButton,
} from "../components/MyButton";
import { addCartItem } from "../reducers/borrowedBookCartSlice";

export const SwipperBookDetail = ({ navigation, onClose, item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const onBuyNow = () => {
    if (quantity) {
      dispatch(
        addCartItem({
          bookCartItems: { [item._id]: quantity },
          resovle: (res) => {
            if (res.status < 300) {
              navigation.navigate("BookStack", {
                screen: "BookCart",
                params: { selectedItemId: item._id },
              });
            }
          },
        })
      );
    }

    onClose();
  };
  const onCart = () => {
    if (quantity) {
      dispatch(
        addCartItem({
          bookCartItems: { [item._id]: quantity },
          resovle: () => {},
        })
      );
    }
    onClose();
  };
  return (
    <View style={styles.swipper}>
      <View style={styles.SwipperContainer}>
        <View style={styles.img}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          ></Image>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </View>
          <View style={styles.controlButton}>
            <VolunmButton
              quantity={quantity}
              setQuantity={setQuantity}
            ></VolunmButton>
            <BorrowButton onPress={onCart}></BorrowButton>
          </View>
          <View></View>
        </View>
      </View>
      <BuyButton label="Mượn ngay" onPress={onBuyNow}></BuyButton>
    </View>
  );
};

const styles = StyleSheet.create({
  swipper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 50,
  },
  SwipperContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: "flex-start",
  },
  content: {
    justifyContent: "space-between",
    height: "auto",
    marginLeft: 40,
    width: "50%",
    marginBottom: 20,
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  bookPrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    textAlign: "center",
    fontSize: 16,
  },
  discount: {
    width: 45,
    height: 25,
    backgroundColor: "rgba(234, 67, 53, 0.3)",
    borderWidth: 1,
    borderColor: "rgb(234, 67, 53)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
