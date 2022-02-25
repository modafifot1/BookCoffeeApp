import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { vh } from "../ultils";
import { AddButton, BuyButton, VolunmButton } from "../components/MyButton";
import { Feedback } from "../components/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetDetailPage } from "../reducers/productSlice";
import { LoadingPage } from "../components/LoadingPage";
import { addCartItem } from "../reducers/cartsSlice";
import { FeedbackInput } from "../components/FeedbackInput";

export const ProductDetailScreen = ({ route, navigation }) => {
  const { product, loading } = useSelector((state) => state.product);
  const { feedbacks } = useSelector((state) => state.feedback);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const getProductByIdCallback = (res) => {
    setData(res.food);
  };

  useEffect(() => {
    dispatch(resetDetailPage());
    dispatch(
      getProductById({
        productId: route.params.productId,
        resolve: getProductByIdCallback,
      })
    );
  }, [route.params.productId]);
  const [quantity, setQuantity] = useState(0);
  const onCart = () => {
    dispatch(
      addCartItem({
        cartItems: { [route.params.productId]: quantity },
        resovle: () => {},
      })
    );
  };
  const onBuyNow = () => {
    if (quantity) {
      dispatch(
        addCartItem({
          cartItems: { [route.params.productId]: quantity },
          resovle: (res) => {
            if (res.status < 300) {
              navigation.navigate("CartStack", {
                screen: "Cart",
                params: { selectedItemId: route.params.productId },
              });
            }
          },
        })
      );
    }
  };
  return loading || !data ? (
    <LoadingPage></LoadingPage>
  ) : (
    <ScrollView style={styles.productDetailContainer}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: data.imageUrl }}
            style={{
              width: "100%",
              height: vh(40),
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          ></Image>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.productDetailName}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {data.name}
            </Text>
            {Number(data?.discountOff) > 0 && (
              <View style={styles.discount}>
                <Text style={{ color: "#ea4335", fontSize: 12 }}>
                  {`-${data.discountOff} %`}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.productDetailPrice}>
              <Text style={styles.price}>
                {`${data.unitPrice}`}{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                    // backgroundColor: "yellow",
                  }}
                >
                  đ
                </Text>{" "}
              </Text>
              {data?.discountOff > 0 && (
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontSize: 14,
                    // alignSelf: "flex-end",
                    color: "grey",
                    // marginLeft: 10,
                  }}
                >
                  {`${data.unitPrice}`}{" "}
                  <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
                </Text>
              )}
            </View>
            <View style={styles.controlButton}>
              <VolunmButton
                quantity={quantity}
                setQuantity={setQuantity}
              ></VolunmButton>
              <AddButton onPress={onCart}></AddButton>
            </View>
          </View>
          <BuyButton label={"Mua ngay"} onPress={onBuyNow}></BuyButton>
        </View>
      </View>
      <View style={styles.feedback}>
        <View style={styles.topFeedback}>
          <Text>{`Đánh giá & nhận xét (${feedbacks.data.length || 0})`}</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={data.numOfStars || 0}
              fullStarColor={"#e0dc00"}
              starSize={18}
              starStyle={{ marginLeft: 5 }}
            ></StarRating>
            <View style={{ marginLeft: 10 }}>
              <Text>{`${data.numOfStars.toFixed(2) || 0}/5 sao`}</Text>
            </View>
          </View>
        </View>
        <FeedbackInput foodId={data._id}></FeedbackInput>
        {feedbacks.data?.map((item) => (
          <Feedback feedback={item} key={item._id}></Feedback>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  productDetailContainer: {},
  productDetailPrice: {
    alignSelf: "baseline",
  },
  productDetailName: {
    textAlign: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
  },
  price: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    backgroundColor: "#ea4335",
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  starRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 16,
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
    marginLeft: 20,
  },
  addToCartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "50%",
  },
  topFeedback: {},
  feedback: {
    borderTopWidth: 4,
    borderTopColor: "#ccd6dd",
    paddingTop: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
