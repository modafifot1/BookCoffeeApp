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
const product = {
  confirmed: true,
  _id: "60a5ecdd98cf780015b07baal",
  typeId: 2,
  name: "Soda bạc hà6",
  unitPrice: 20001,
  imageUrl:
    "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
  discountOff: 5,
  description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
  discountMaximum: 5000,
  createAt: "2021-05-20T05:00:13.401Z",
  __v: 0,
  numOfFeedbacks: 1,
  numOfStars: 5,
  quantity: 2,
  feedbacks: [
    {
      _id: "60a63775ee375d0015b91b3d",
      userId: "6076b2ecf8402efee33463c9",
      userName: "Tiến Ngô Văn",
      content: "Nước bổ dưỡng",
      numOfStars: 5,
      avataUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
      createAt: "2021-05-20T10:18:29.902Z",
      reply: [
        {
          _id: "61290c3f8d975c00168225b7",
          userName: "Admin Do an CNPM",
          content: "Cám ơn tiến đã ủng hộ!",
          createAt: "2021-08-27T16:01:03.952Z",
        },
        {
          _id: "61298a315b6609001683fafd",
          userName: "Admin Do an CNPM",
          content: "Cam on ban",
          createAt: "2021-08-28T00:58:25.203Z",
        },
      ],
    },
    {
      _id: "60a63775ee375d00sss15b91b3d",
      userId: "6076b2ecf8402efee33463c9",
      userName: "Tiến Ngô Văn",
      content: "Nước bổ dưỡng",
      numOfStars: 5,
      avataUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
      createAt: "2021-05-20T10:18:29.902Z",
      reply: [
        {
          _id: "61290c3f8d975c00168225b7",
          userName: "Admin Do an CNPM",
          content: "Cám ơn tiến đã ủng hộ!",
          createAt: "2021-08-27T16:01:03.952Z",
        },
        {
          _id: "61298a315b6609001683fafd",
          userName: "Admin Do an CNPM",
          content: "Cam on ban",
          createAt: "2021-08-28T00:58:25.203Z",
        },
      ],
    },
  ],
};

export const ProductDetailScreen = ({ route }) => {
  console.log(route.params.productId);
  const [quantity, setQuantity] = useState(0);
  const onBuyNow = () => {
    navigation.navigate("CartStack");
  };
  const onCart = () => {};
  return (
    <ScrollView style={styles.productDetailContainer}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: product.imageUrl }}
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
              {product.name}
            </Text>
            {Number(product?.discountOff) > 0 && (
              <View style={styles.discount}>
                <Text style={{ color: "#ea4335", fontSize: 12 }}>
                  {`-${product.discountOff} %`}
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
                {`${product.unitPrice}`}{" "}
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
              {product?.discountOff > 0 && (
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontSize: 14,
                    // alignSelf: "flex-end",
                    color: "grey",
                    // marginLeft: 10,
                  }}
                >
                  {`${product.unitPrice}`}{" "}
                  <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
                </Text>
              )}
            </View>

            {/* <View style={styles.starRating}>
            <View style={styles.addToCartContainer}></View>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={product.numOfStars || 0}
              fullStarColor={"#e0dc00"}
              starSize={18}
              containerStyle={{
                width: "60%",
              }}
            ></StarRating>
          </View> */}
            <View style={styles.controlButton}>
              <VolunmButton
                quantity={quantity}
                setQuantity={setQuantity}
              ></VolunmButton>
              <AddButton onPress={onCart}></AddButton>
            </View>
          </View>
          <BuyButton label={"Mua ngay"}></BuyButton>
        </View>
      </View>
      <View style={styles.feedback}>
        <View style={styles.topFeedback}>
          <Text>{`Đánh giá & nhận xét (${product.numOfFeedbacks})`}</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={product.numOfStars || 0}
              fullStarColor={"#e0dc00"}
              starSize={18}
              starStyle={{ marginLeft: 5 }}
            ></StarRating>
            <View style={{ marginLeft: 10 }}>
              <Text>{`${product.numOfStars}/5 sao`}</Text>
            </View>
          </View>
        </View>
        {product.feedbacks.map((item) => (
          <Feedback feedback={item} key={item._id}></Feedback>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  productDetailContainer: {},
  productDetailPrice: {
    // flexDirection: "row",
    // alignItems: "center",
    // marginTop: 10,
    // justifyContent: "space-between",
    // paddingHorizontal: 10,
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
