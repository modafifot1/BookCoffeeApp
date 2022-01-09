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
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { getListTable } from "../reducers/tableSlice";

export const SelectTable = ({ setTableCode, tableCode }) => {
  const [tables, setTables] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getListTable((res) => {
        let temp = res.tables;
        temp = temp.map((item, index) => {
          if (index == tableCode - 1) {
            return { ...item, isSelected: true };
          }
          return item;
        });
        setTables(temp);
      })
    );
  }, []);
  const selectTable = (selectedIndex) => {
    let temp = [...tables];
    temp = temp.map((item, index) => {
      if (index != selectedIndex) {
        return { ...item, isSelected: false };
      }
      return item;
    });
    temp[selectedIndex].isSelected = !temp[selectedIndex].isSelected;
    setTables(temp);
    setTableCode(
      temp[selectedIndex].isSelected ? temp[selectedIndex].tableCode : null
    );
  };
  return (
    <View>
      <FlatList
        numColumns={4}
        data={tables}
        renderItem={({ item, index }) => {
          return (
            <Table index={index} item={item} selectTable={selectTable}></Table>
          );
        }}
        keyExtractor={(item) => `${item._id}`}
        style={styles.selectTableContainer}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          flexGrow: 1,
        }}
      ></FlatList>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(232, 62, 82, 0.6)",
              width: 10,
              height: 10,
            }}
          ></View>

          <Text style={styles.text}>Có khách</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(229, 84, 101, 1)",
              width: 10,
              height: 10,
            }}
          ></View>
          <Text style={styles.text}>Còn trống</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgb(216, 21, 21)",
              width: 10,
              height: 10,
            }}
          ></View>
          <Text style={styles.text}>Đang chọn</Text>
        </View>
      </View>
    </View>
  );
};

const Table = ({ item, selectTable, index }) => {
  const [color, setColor] = useState("yellow");
  const [backgroundColor, setBackgroundColor] = useState("yellow");
  useEffect(() => {
    setColor(
      item.isSelected
        ? "rgb(216, 21, 21)"
        : item.status
        ? "rgba(229, 84, 101, 0.6)"
        : "rgba(229, 84, 101, 1)"
    );
    setBackgroundColor(
      item.isSelected
        ? "rgb(216, 21, 21)"
        : item.status
        ? "rgba(232, 62, 82, 0.6)"
        : "rgba(229, 84, 101, 1)"
    );
  }, [item.isSelected]);

  return (
    <TouchableOpacity disabled={item.status} onPress={() => selectTable(index)}>
      <View style={[styles.table, { borderColor: `${color}` }]}>
        <View
          style={{
            backgroundColor: `${backgroundColor}`,
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
            {item.tableCode}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  text: {
    fontSize: 12,
    marginLeft: 5,
  },
});
