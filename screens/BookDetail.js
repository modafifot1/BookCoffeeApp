import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { vh } from "../ultils";
import { BorrowButton, BuyButton, VolunmButton } from "../components/MyButton";
import { Feedback } from "../components/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { getBookById, resetDetailPage } from "../reducers/bookSlice";
import { LoadingPage } from "../components/LoadingPage";
import { addCartItem } from "../reducers/borrowedBookCartSlice";
import { FeedbackInput } from "../components/FeedbackInput";
export const BookDetailScreen = ({ route, navigation }) => {
  const { book } = useSelector((state) => state.book);
  const { feedbacks } = useSelector((state) => state.feedback);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const getBookByIdCallback = (res) => {
    setData(res.book);
  };

  useEffect(() => {
    dispatch(resetDetailPage());
    dispatch(
      getBookById({
        bookId: route.params.bookId,
        resolve: getBookByIdCallback,
      })
    );
  }, [route.params.bookId]);
  const [quantity, setQuantity] = useState(0);
  const onCart = () => {
    dispatch(
      addCartItem({
        bookCartItems: { [route.params.bookId]: quantity },
        resovle: () => {},
      })
    );
  };
  const onBuyNow = () => {
    if (quantity) {
      dispatch(
        addCartItem({
          bookCartItems: { [route.params.bookId]: quantity },
          resovle: (res) => {
            if (res.status < 300) {
              navigation.navigate("BookStack", {
                screen: "BookCart",
                params: { selectedItemId: route.params.bookId },
              });
            }
          },
        })
      );
    }
  };
  return book.loading || !data ? (
    <LoadingPage></LoadingPage>
  ) : (
    <ScrollView>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: "#ccd6dd",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: data.imageUrl }}
            style={{
              width: "70%",
              height: vh(40),
            }}
          ></Image>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.bookDetailName}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
              numberOfLines={2}
            >
              {data.title}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {`Xuất bản năm: ${data.yearOfPublication}`}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {`Tác giả: ${data.author}`}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {`Còn lại`}
              </Text>
              <View
                style={{
                  backgroundColor: "#ea4335",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 50,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center" }}
                >{`${data.quantity}`}</Text>
              </View>
              <Text>Quyển</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.controlButton}>
              <VolunmButton
                quantity={quantity}
                setQuantity={setQuantity}
              ></VolunmButton>
              <BorrowButton onPress={onCart}></BorrowButton>
            </View>
          </View>
          <BuyButton label={"Mượn ngay"} onPress={onBuyNow}></BuyButton>
        </View>
      </View>

      <View style={styles.feedback}>
        <View style={styles.topFeedback}>
          <Text>{`Đánh giá & nhận xét (${feedbacks.data.length || 0})`}</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={data.rating || 0}
              fullStarColor={"#e0dc00"}
              starSize={18}
              starStyle={{ marginLeft: 5 }}
            ></StarRating>
            <View style={{ marginLeft: 10 }}>
              <Text>{`${data.rating.toFixed(2) || 0}/5 sao`}</Text>
            </View>
          </View>
        </View>
        <FeedbackInput bookId={data._id}></FeedbackInput>
        {feedbacks.data?.map((item) => (
          <Feedback feedback={item} key={item._id}></Feedback>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  bookDetailContainer: {},
  bookDetailPrice: {
    alignSelf: "baseline",
  },
  bookDetailName: {
    textAlign: "center",
    width: "100%",
    flexDirection: "column",
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
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
