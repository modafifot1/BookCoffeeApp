import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import CategoryListItem from "../components/CategoryListItem";
import TopBar from "../components/TopBar";
import TopBanner from "../assets/images/topBanner.jpg";
import { vh } from "../ultils";
import { getProductsPerPage, resetPage } from "../reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { Toast } from "../components/Toast";
import { SwipeablePanel } from "rn-swipeable-panel";
import { SwipperDetail } from "../components/SwipperDetail";

export default function ProductsScreen({ navigation }) {
  const [swipperActive, setSwipperActive] = useState(false);
  const { products, loading, page, isLimited } = useSelector(
    (state) => state.product
  );
  const [nextPage, setNextPage] = useState(1);
  const dispatch = useDispatch();
  const childRef = useRef();
  const onCloseWipper = () => {
    setSwipperActive(false);
  };
  const onClickCart = () => {
    setSwipperActive(true);
  };
  const onclickDetail = (productId) => {
    navigation.navigate("productDetail", {
      productId,
    });
  };
  const renderFooter = () => {
    return (
      loading && (
        <ActivityIndicator size={"large"} color={"#ea4335"}></ActivityIndicator>
      )
    );
  };
  const onScrollEnd = (e) => {
    if (!loading && !isLimited) {
      setNextPage(nextPage + 1);
    }
  };
  useEffect(() => {
    dispatch(getProductsPerPage(nextPage));
  }, [dispatch, nextPage]);
  useEffect(() => {
    if (page !== nextPage - 1) {
      setNextPage(page + 1);
    }
  }, [page]);
  return (
    <View>
      <TopBar ref={childRef} />
      <FlatList
        data={products.data}
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
          <ProductListItem
            product={item}
            onAddTocart={onClickCart}
            onclickDetail={onclickDetail}
          ></ProductListItem>
        )}
        keyExtractor={(item) => `${item._id}`}
        onScroll={(e) => childRef.current.onScrollBar(e)}
        onEndReachedThreshold={0.01}
        onEndReached={onScrollEnd}
      ></FlatList>
      <Toast
        title={products.status >= 400 ? "Fail" : "Succesfully"}
        message={products.msg || ""}
        isError={products.status >= 400 ? true : false}
      ></Toast>

      <SwipeablePanel
        isActive={swipperActive}
        onClose={() => onCloseWipper()}
        closeOnTouchOutside={onCloseWipper}
        fullWidth
      >
        <SwipperDetail
          navigation={navigation}
          onClose={onCloseWipper}
        ></SwipperDetail>
      </SwipeablePanel>
    </View>
  );
}

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
  },
});
