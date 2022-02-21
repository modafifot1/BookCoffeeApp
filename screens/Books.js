import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/TopBar";
import BookTopBar from "../components/BookTopBar";
import TopBanner from "../assets/images/bookTopBanner.jpg";
import { vh } from "../ultils";
import { getBooksPerPage, resetPage } from "../reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
// import BookListItem from "../components/";
import { Toast } from "../components/Toast";
import { SwipeablePanel } from "rn-swipeable-panel";
import { SwipperBookDetail } from "../components/SwipperBookDetail";
import { useIsFocused } from "@react-navigation/native";
import { LoadingPage } from "../components/LoadingPage";
import { BookListItem } from "../components/BookListItem";

export const BooksScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  // const [nextPage, setNextPage] = useState(1);
  const [swipperActive, setSwipperActive] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { books, isLimited } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const childRef = useRef();
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    dispatch(
      getBooksPerPage({
        page: books.nextPage,
        resolve: (res) => {},
      })
    );
  }, []);
  const onCloseWipper = () => {
    setSwipperActive(false);
  };
  const onClickCart = (bookId) => {
    setSelectedBook(books.data.find((item) => bookId === item._id));
    setSwipperActive(true);
  };
  const onclickDetail = (bookId) => {
    navigation.navigate("BookDetail", {
      bookId,
    });
  };
  const renderFooter = () => {
    return (
      loadingMore && (
        <ActivityIndicator size={"large"} color={"#ea4335"}></ActivityIndicator>
      )
    );
  };
  const onScrollEnd = (e) => {
    if (!books.loading && !isLimited) {
      setLoadingMore(true);
      dispatch(
        getBooksPerPage({
          page: books.nextPage,
          resolve: (res) => {
            setLoadingMore(false);
          },
        })
      );
    }
  };
  // useEffect(() => {
  //   if (isFocused && nextPage > 1) {
  //     dispatch(resetPage());
  //     dispatch(getBooksPerPage({ page: 1, resolve: (res) => {} }));
  //   }
  // }, [isFocused]);

  return (
    <View>
      <BookTopBar ref={childRef} navigation={navigation} />
      <FlatList
        data={books.data}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{ marginTop: 20 }}
        ListHeaderComponent={
          <Image
            source={TopBanner}
            style={{ width: "100%", height: vh(25), resizeMode: "stretch" }}
          />
        }
        renderItem={({ item, index }) => (
          <BookListItem
            book={item}
            onAddTocart={onClickCart}
            onclickDetail={onclickDetail}
          ></BookListItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        onScroll={(e) => childRef.current.onScrollBar(e)}
        onEndReachedThreshold={0.01}
        onEndReached={onScrollEnd}
      ></FlatList>
      <Toast
        title={books.status >= 400 ? "Fail" : "Succesfully"}
        message={books.msg || ""}
        isError={books.status >= 400 ? true : false}
      ></Toast>

      <SwipeablePanel
        isActive={swipperActive}
        onClose={() => onCloseWipper()}
        closeOnTouchOutside={onCloseWipper}
        fullWidth
      >
        <SwipperBookDetail
          navigation={navigation}
          onClose={onCloseWipper}
          item={selectedBook}
        ></SwipperBookDetail>
      </SwipeablePanel>
      {!loadingMore && books.loading && <LoadingPage></LoadingPage>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginVertical: 10,
    height: 270,
  },
});
