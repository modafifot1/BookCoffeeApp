import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import ProductListItem from "../components/ProductListItem";
export default function categoryScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const [products, setProducts] = useState([
    {
      id: 1,
      imageUrl: "http://dummyimage.com/181x74.png/dddddd/000000",
      name: "Wine - Two Oceans Cabernet",
      price: 95,
    },
    {
      id: 2,
      imageUrl: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      name: "Beef - Cow Feet Split",
      price: 3,
    },
    {
      id: 3,
      imageUrl: "http://dummyimage.com/168x100.png/5fa2dd/ffffff",
      name: "Fish - Base, Bouillion",
      price: 41,
    },
    {
      id: 4,
      imageUrl: "http://dummyimage.com/240x99.png/cc0000/ffffff",
      name: "Syrup - Monin - Granny Smith",
      price: 63,
    },
    {
      id: 5,
      imageUrl: "http://dummyimage.com/140x95.png/cc0000/ffffff",
      name: "Tomatoes Tear Drop Yellow",
      price: 43,
    },
    {
      id: 6,
      imageUrl: "http://dummyimage.com/98x83.png/ff4444/ffffff",
      name: "Appetizer - Crab And Brie",
      price: 45,
    },
    {
      id: 7,
      imageUrl: "http://dummyimage.com/112x78.png/ff4444/ffffff",
      name: "Bread - Pumpernickel",
      price: 34,
    },
    {
      id: 8,
      imageUrl: "http://dummyimage.com/225x81.png/cc0000/ffffff",
      name: "Capicola - Hot",
      price: 2,
    },
    {
      id: 9,
      imageUrl: "http://dummyimage.com/139x97.png/5fa2dd/ffffff",
      name: "Wine - Taylors Reserve",
      price: 77,
    },
    {
      id: 10,
      imageUrl: "http://dummyimage.com/169x64.png/dddddd/000000",
      name: "Tomatoes - Roma",
      price: 99,
    },
  ]);
  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <ProductListItem product={item}></ProductListItem>
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  wrapper: {
    flex: 1,
    margin: 8,
    height: 140,
  },
});
