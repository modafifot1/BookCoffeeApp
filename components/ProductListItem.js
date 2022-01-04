import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { calRealPrice } from "../ultils/ProductUtils";

export default function ProductListItem(props) {
  const { product, onAddTocart, onclickDetail } = props;
  return (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() => onclickDetail(product._id)}
    >
      <View
        style={{
          // justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View style={{ alignItems: "center", height: "50%" }}>
          <Image
            source={{ uri: product.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          ></Image>
        </View>
        <View
          style={{
            height: "50%",
          }}
        >
          <View style={{ height: "80%" }}>
            <View style={styles.productName}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                }}
              >
                {product.name}
              </Text>
            </View>
            <View
              style={{
                marginTop: "auto",
                height: "50%",
              }}
            >
              <View style={styles.productPrice}>
                <Text style={styles.price}>
                  {calRealPrice(product.unitPrice, product.discountOff)}
                  <Text style={{ textDecorationLine: "underline" }}>
                    đ
                  </Text>{" "}
                </Text>

                {Number(product?.discountOff) > 0 && (
                  <View style={styles.discount}>
                    <Text style={{ color: "#ea4335", fontSize: 12 }}>
                      {`-${product.discountOff} %`}
                    </Text>
                  </View>
                )}
              </View>
              {product?.discountOff > 0 && (
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontSize: 12,
                    alignSelf: "flex-start",
                    color: "grey",
                    paddingLeft: 10,
                  }}
                >
                  {`${product.unitPrice}`}{" "}
                  <Text style={{ textDecorationLine: "underline" }}>đ</Text>{" "}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.starRating}>
            <View style={styles.addToCartContainer}>
              <TouchableOpacity onPress={() => onAddTocart(product._id)}>
                <Ionicon
                  name="cart"
                  style={{ fontSize: 24, color: "#ea4335" }}
                ></Ionicon>
              </TouchableOpacity>
            </View>
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
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCardContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
    margin: 20,
    textShadowOffset: { width: 0, height: 0 },
    height: "100%",
    borderRadius: 10,
    width: "48%",
  },
  productPrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productName: {
    textAlign: "center",
    width: "100%",
    paddingTop: 10,
  },
  price: {
    textAlign: "center",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  starRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 10,
    marginTop: "auto",
    height: "20%",
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
  addToCartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
