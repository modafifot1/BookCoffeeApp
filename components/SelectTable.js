import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
const tables = [
  {
    _id: "212121",
    status: 0,
  },
  {
    _id: "2121sdsd21",
    status: 1,
  },
  {
    _id: "21fgdww2121",
    status: 0,
  },
  {
    _id: "21sgfbdv2121",
    status: 0,
  },
  {
    _id: "21sgfbdv2cxc121",
    status: 1,
  },
  {
    _id: "21sgfbdv212dfdfdfyu1",
    status: 1,
  },
  {
    _id: "21sgferrbdv2121",
    status: 0,
  },
];
export const SelectTable = () => {
  return (
    <FlatList
      //   horizontal={true}
      numColumns={4}
      data={tables}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity disabled={item.status}>
            <Table status={item.status}></Table>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => `${item._id}`}
      style={styles.selectTableContainer}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    ></FlatList>
  );
};

const Table = ({ status }) => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(status ? 0.6 : 1);
  }, [status]);
  return (
    <View
      style={[styles.table, { borderColor: `rgba(232, 62, 82, ${opacity})` }]}
    >
      <View
        style={{
          backgroundColor: `rgba(229, 84, 101, ${opacity})`,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          3
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  selectTableContainer: {
    height: 150,
    width: "100%",
  },
  table: {
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "tomato",
    borderWidth: 2,
    // borderRadius: 100,
  },
});
