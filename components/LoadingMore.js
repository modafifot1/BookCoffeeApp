import React, { forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPerPage } from "../reducers/productSlice";

const LoadingMore = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { loading, isLimited, page } = useSelector((state) => state.product);
  const onScrollEnd = () => {
    if (!loading) {
      dispatch(getProductsPerPage(page + 1));
    }
  };
  useImperativeHandle(ref, () => ({ onScrollEnd }));
  return loading ? (
    <ActivityIndicator
      size={"large"}
      color={"tomato"}
      style={{ marginTop: 20, backgroundColor: "black" }}
    ></ActivityIndicator>
  ) : (
    <View></View>
  );
});
export default LoadingMore;
