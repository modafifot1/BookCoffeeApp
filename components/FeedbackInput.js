import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import StarRating from "react-native-star-rating";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../assets/images/notImage.png";
import { getProfile } from "../reducers/profileSlice";
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-fast-toast";
import { addFeedback } from "../reducers/feedbackSlice";
import LoadingMore from "../components/LoadingMore";

const feedback = {
  _id: "60a63775ee375d0015b91b3d",
  userId: "6076b2ecf8402efee33463c9",
  userName: "Tiến Ngô Văn",
  avataUrl:
    "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
  content:
    "Nước bổ dưỡng dfdfdffdfsf dsfs sdsdf dsc kjsjd kjdkjf kjsjdf kjskjc kjuiw lkljalda dcsfsdf dsfdsfsdf dfsfs eeeeee",
  numOfStars: 5,
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
};
export const FeedbackInput = ({ foodId, bookId }) => {
  const [seletedStars, setSelectedStars] = useState(0);
  const { profile } = useSelector((state) => state.profile);
  const { feedbacks } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [content, setContent] = useState("");
  const toast = useToast();
  useEffect(() => {
    if (!profile.data.imageUrl) dispatch(getProfile());
  }, [isFocused]);
  const onTextChange = (e) => {
    setContent(e.nativeEvent.text);
  };
  const onFeedback = () => {
    if (seletedStars === 0 || !content) {
      toast.show("Vui lòng nhập nội dung đánh giá!", {
        type: "danger",
        duration: 2000,
        animationType: "zoom-in",
      });
      return;
    }
    let data = {
      content,
      numOfStars: seletedStars,
      bookId,
      foodId,
    };
    if (foodId) data = { ...data, feedbackType: 1 };
    else data = { ...data, feedbackType: 2 };
    dispatch(addFeedback(data));
  };
  return feedbacks.loading ? (
    <ActivityIndicator size={"large"} color={"#ea4335"}></ActivityIndicator>
  ) : (
    <View style={styles.feedbackContainer}>
      <View style={styles.avata}>
        <Image
          source={
            profile.data.imageUrl ? { uri: profile.data.imageUrl } : NoImage
          }
          style={{ width: 30, height: 30, borderRadius: 50 }}
        ></Image>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold" }}>
            {profile.data.fullName || "Đang cập nhật"}
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={seletedStars}
            fullStarColor={"#e0dc00"}
            starSize={16}
            containerStyle={{
              justifyContent: "flex-start",
            }}
            starStyle={{
              paddingLeft: 5,
            }}
            selectedStar={(rating) => setSelectedStars(rating)}
          ></StarRating>
        </View>
        <View style={styles.content}>
          <TextInput
            multiline
            numberOfLines={3}
            style={{
              borderColor: "#cbcbcb",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            onChange={onTextChange}
          ></TextInput>
        </View>
        <View style={styles.belowControl}>
          <View style={styles.replyButton}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(234, 67, 53)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
              onPress={onFeedback}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Đánh giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  rightContainer: {
    marginLeft: 20,
    width: "80%",
  },
  header: {
    marginBottom: 10,
  },
  belowControl: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "baseline",
  },
  replyButton: {
    marginLeft: "auto",
  },
});
