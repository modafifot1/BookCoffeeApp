import React, { useImperativeHandle, useState, forwardRef } from "react";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import { SearchInput } from "./TextInput";
import Ionicon from "react-native-vector-icons/Ionicons";
import { vh, vw } from "../ultils";
const TopBar = forwardRef((props, ref) => {
  const [opacity, setOpacity] = useState(0);
  const onScrollBar = (e) => {
    const { contentOffset } = e.nativeEvent;
    setOpacity(contentOffset.y / vh(25));
  };
  useImperativeHandle(ref, () => ({ onScrollBar }));
  return (
    <View
      style={[
        styles.topBarContainer,
        { backgroundColor: `rgba(255, 255, 255, ${opacity})` },
      ]}
    >
      <View
        style={[
          styles.searchContainer,
          { marginTop: StatusBar.currentHeight / 2 },
        ]}
      >
        <SearchInput name={"search"} style={styles.searchInput}></SearchInput>
        <TouchableOpacity>
          <Ionicon name={"search-outline"} style={styles.searchIcon}></Ionicon>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default TopBar;
// export default function TopBar({ ref }) {
//   const [opacity, setOpacity] = useState(0);
//   useImperativeHandle(ref, () => ({
//     onScrollBar(e) {
//       const { contentOffset } = e.nativeEvent;
//       setOpacity(contentOffset.y / vh(25));
//     },
//   }));
//   return (
//     <View
//       style={[
//         styles.topBarContainer,
//         { backgroundColor: `rgba(255, 255, 255, ${opacity})` },
//       ]}
//     >
//       <View
//         style={[
//           styles.searchContainer,
//           { marginTop: StatusBar.currentHeight / 2 },
//         ]}
//       >
//         <SearchInput name={"search"} style={styles.searchInput}></SearchInput>
//         <TouchableOpacity>
//           <Ionicon name={"search-outline"} style={styles.searchIcon}></Ionicon>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
const styles = StyleSheet.create({
  topBarContainer: {
    width: "100%",
    height: vh(10),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: vh(4),
    paddingHorizontal: 15,
  },
  searchInput: {
    backgroundColor: "rgba(234, 67, 53, 0.8)",
    height: "100%",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "90%",
  },
  searchIcon: {
    fontSize: vh(3),
    paddingLeft: 5,
    color: "#ea4335",
  },
});
