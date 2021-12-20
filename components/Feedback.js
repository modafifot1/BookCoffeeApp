import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import { convert2HistoryTime } from "../ultils";
// const feedback = {
//   _id: "60a63775ee375d0015b91b3d",
//   userId: "6076b2ecf8402efee33463c9",
//   userName: "Tiến Ngô Văn",
//   avataUrl:
//     "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//   content:
//     "Nước bổ dưỡng dfdfdffdfsf dsfs sdsdf dsc kjsjd kjdkjf kjsjdf kjskjc kjuiw lkljalda dcsfsdf dsfdsfsdf dfsfs eeeeee",
//   numOfStars: 5,
//   createAt: "2021-05-20T10:18:29.902Z",
//   reply: [
//     {
//       _id: "61290c3f8d975c00168225b7",
//       userName: "Admin Do an CNPM",
//       content: "Cám ơn tiến đã ủng hộ!",
//       createAt: "2021-08-27T16:01:03.952Z",
//     },
//     {
//       _id: "61298a315b6609001683fafd",
//       userName: "Admin Do an CNPM",
//       content: "Cam on ban",
//       createAt: "2021-08-28T00:58:25.203Z",
//     },
//   ],
// };
export const Feedback = ({ feedback }) => {
  return (
    <View style={styles.feedbackContainer}>
      <View style={styles.avata}>
        <Image
          source={{ uri: feedback.avataUrl }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        ></Image>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold" }}>{feedback.userName}</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={feedback.numOfStars || 0}
            fullStarColor={"#e0dc00"}
            starSize={12}
            containerStyle={{
              justifyContent: "flex-start",
            }}
            starStyle={{
              paddingLeft: 5,
            }}
          ></StarRating>
        </View>
        <View style={styles.content}>
          <Text>{feedback.content}</Text>
        </View>
        <View style={styles.belowControl}>
          <View style={styles.time}>
            <Text style={{ fontSize: 12, fontStyle: "italic", color: "gray" }}>
              {convert2HistoryTime(feedback.createAt)}
            </Text>
          </View>
          {/* <View style={styles.replyButton}>
            <TouchableOpacity>
              <Text style={{ fontWeight: "bold" }}>Reply</Text>
            </TouchableOpacity>
          </View> */}
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
    marginLeft: 30,
  },
});
