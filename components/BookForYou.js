import { useIsFocused } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookListItemForYou } from "../components/BookListItemForYou";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");

const SPACING = 5;
const ITEM_LENGTH = width * 0.55; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;
// const data = [
//   {
//     id: 0,
//     uri: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
//     title: "Dahlia",
//   }, // https://unsplash.com/photos/Jup6QMQdLnM
//   {
//     id: 1,
//     uri: "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
//     title: "Sunflower",
//   }, // https://unsplash.com/photos/oO62CP-g1EA
//   {
//     id: 2,
//     uri: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
//     title: "Zinnia",
//   }, // https://unsplash.com/photos/gKMmJEvcyA8
//   {
//     id: 3,
//     uri: "https://images.unsplash.com/photo-1587814213271-7a6625b76c33",
//     title: "Tulip",
//   }, // https://unsplash.com/photos/N7zBDF1r7PM
//   {
//     id: 4,
//     uri: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4",
//     title: "Chrysanthemum",
//   }, // https://unsplash.com/photos/GsGZJMK0bJc
//   {
//     id: 5,
//     uri: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e",
//     title: "Hydrangea",
//   }, // https://unsplash.com/photos/coIBOiWBPjk
// ];

const data = [
  {
    rating: 2.470062133156512,
    numOfFeedback: 40719,
    _id: "6211be97e335d10c30be58d3",
    bookId: 105578,
    title: "One Night @ The Call Center",
    author: "Chetan Bhagat",
    yearOfPublication: 2005,
    imageUrl: "https://images.gr-assets.com/books/1320500924m/105578.jpg",
    quantity: 3,
    __v: 0,
  },
  {
    rating: 2.67,
    numOfFeedback: 28299,
    _id: "6211be98e335d10c30be5fb0",
    bookId: 783291,
    title: "The Almost Moon",
    author: "Alice Sebold",
    yearOfPublication: 2007,
    imageUrl: "https://images.gr-assets.com/books/1310421579m/783291.jpg",
    quantity: 3,
    __v: 0,
  },
  {
    rating: 2.67,
    numOfFeedback: 28299,
    _id: "6211be98e335d10cfdf30be5fb0",
    bookId: 783291,
    title: "The Almost Moon",
    author: "Alice Sebold",
    yearOfPublication: 2007,
    imageUrl: "https://images.gr-assets.com/books/1310421579m/783291.jpg",
    quantity: 3,
    __v: 0,
  },
  {
    rating: 2.67,
    numOfFeedback: 28299,
    _id: "6211be98e335d10c30434be5fb0",
    bookId: 783291,
    title: "The Almost Moon",
    author: "Alice Sebold",
    yearOfPublication: 2007,
    imageUrl: "https://images.gr-assets.com/books/1310421579m/783291.jpg",
    quantity: 3,
    __v: 0,
  },
];
export const BookForYou = ({ onclickDetail, onAddTocart }) => {
  const { relatedBooks } = useSelector((state) => state.book);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState([]);
  const currentIndex = useRef(0);
  const flatListRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const isFocused = useIsFocused();
  let timer;
  useEffect(() => {
    setDataWithPlaceholders([{ id: -1 }, ...data, { id: data.length }]);
    currentIndex.current = 1;
    setIsPrevDisabled(true);
  }, [data]);

  const handleOnViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      const itemsInView = viewableItems.filter(
        ({ item }) => item.uri && item.title
      );

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = itemsInView[0].index;
      console.log(currentIndex.current);
      setIsNextDisabled(currentIndex.current === data.length);
      setIsPrevDisabled(currentIndex.current === 1);
    },
    [data]
  );

  const handleOnPrev = () => {
    if (currentIndex.current === 1) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current - 1,
      });
    }
  };
  const handleOnNext = () => {
    if (currentIndex.current === data.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current + 1,
      });
    }
  };
  let direction = 0; //left to right
  useEffect(() => {
    if (isFocused) {
      timer = setInterval(() => {
        if (direction === 0) {
          if (currentIndex.current === data.length) {
            direction = 1;
          } else {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                animated: true,
                index: currentIndex.current + 1,
              });
            }
            currentIndex.current++;
          }
        } else {
          if (currentIndex.current === 1) {
            direction = 0;
          } else {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                animated: true,
                index: currentIndex.current - 1,
              });
            }
            currentIndex.current--;
          }
        }
      }, 2000);
      return () => clearInterval(timer);
    } else {
      clearInterval(timer);
    }
  }, [isFocused]);

  // `data` perameter is not used. Therefore, it is annotated with the `any` type to merely satisfy the linter.
  const getItemLayout = (_data, index) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Sách dành cho bạn
      </Text>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({ item, index }) => {
          if (!item._id) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y * 0.2,
              CURRENT_ITEM_TRANSLATE_Y,
            ],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_LENGTH }}>
              <Animated.View
                style={[
                  {
                    transform: [{ translateY }],
                  },
                  styles.itemContent,
                ]}
              >
                <View style={styles.itemImage}>
                  {relatedBooks.loading ? (
                    <ActivityIndicator
                      size={"large"}
                      color={"#ea4335"}
                    ></ActivityIndicator>
                  ) : (
                    <BookListItemForYou
                      book={item}
                      onAddTocart={onAddTocart}
                      onclickDetail={onclickDetail}
                    ></BookListItemForYou>
                  )}
                </View>
              </Animated.View>
            </View>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  arrowBtn: {},
  arrowBtnText: {
    fontSize: 42,
    // fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 10,
  },
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y + ITEM_LENGTH,
    alignItems: "center",
    marginBottom: 10,
    padding: 0,
  },
  item: {},
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: "absolute",
    // bottom: SPACING * 2,
    right: SPACING * 2,
    color: "white",
    fontWeight: "600",
  },
  itemImage: {
    width: "100%",
    height: ITEM_LENGTH,
    justifyContent: "center",
  },
});
