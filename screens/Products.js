import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import TopBar from "../components/TopBar";
import TopBanner from "../assets/images/topBanner.jpg";
import { vh } from "../ultils";
import { getProductsPerPage, resetPage } from "../reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { Toast } from "../components/Toast";
import { SwipeablePanel } from "rn-swipeable-panel";
import { SwipperDetail } from "../components/SwipperDetail";
import { useIsFocused } from "@react-navigation/native";
import { LoadingPage } from "../components/LoadingPage";

export default function ProductsScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [swipperActive, setSwipperActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, isLimited, nextPage } = useSelector(
    (state) => state.product
  );
  const { loading: loadingPage } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const childRef = useRef();
  const onCloseWipper = () => {
    setSwipperActive(false);
  };
  const onClickCart = (productId) => {
    setSelectedProduct(products.data.find((item) => productId === item._id));
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
      dispatch(getProductsPerPage(nextPage));
    }
  };
  useEffect(() => {
    if (isFocused && nextPage > 1) {
      dispatch(resetPage());
      dispatch(getProductsPerPage(1));
    }
  }, [isFocused]);
  useEffect(() => {
    dispatch(getProductsPerPage(nextPage));
  }, []);
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
          item={selectedProduct}
        ></SwipperDetail>
      </SwipeablePanel>
      {loadingPage && <LoadingPage></LoadingPage>}
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
    height: 270,
  },
});
