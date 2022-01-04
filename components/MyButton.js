import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconAnt from "react-native-vector-icons/AntDesign";
const MyButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.loginButton}>
        <Text style={{ fontSize: 18 }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const AddButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="cart"
        style={{ fontSize: 36, color: "#ea4335" }}
      ></Ionicons>
    </TouchableOpacity>
  );
};
const BuyButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buyButton}>
        <Text style={{ fontSize: 16, color: "white" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SaveButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.saveButton}>
        <Text style={{ fontSize: 16, color: "white" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ marginTop: "auto" }} onPress={onPress}>
      <View style={styles.deleteButton}>
        <Ionicon
          name="trash"
          style={{ fontSize: 24, color: "black" }}
        ></Ionicon>
      </View>
    </TouchableOpacity>
  );
};
const VolunmButton = ({ quantity, setQuantity }) => {
  return (
    <View style={styles.VolunmButtonContainer}>
      <TouchableOpacity
        style={styles.subButton}
        onPress={() => quantity > 0 && setQuantity(quantity - 1)}
      >
        <IconAnt
          name="minuscircle"
          style={{ fontSize: 24, color: "#ea4335" }}
        ></IconAnt>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>{quantity}</Text>
      <TouchableOpacity
        style={styles.subButton}
        onPress={() => quantity < 20 && setQuantity(quantity + 1)}
      >
        <IconAnt
          name="pluscircle"
          style={{ fontSize: 24, color: "#ea4335" }}
        ></IconAnt>
      </TouchableOpacity>
    </View>
  );
};
const VolunmButtonUpdate = ({ onPress, quantity }) => {
  return (
    <View style={styles.VolunmButtonContainer}>
      <TouchableOpacity
        style={styles.subButton}
        onPress={() => onPress(quantity - 1)}
      >
        <IconAnt
          name="minuscircle"
          style={{ fontSize: 24, color: "#ea4335" }}
        ></IconAnt>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 20 }}>{quantity}</Text>
      <TouchableOpacity
        style={styles.subButton}
        onPress={() => onPress(quantity + 1)}
      >
        <IconAnt
          name="pluscircle"
          style={{ fontSize: 24, color: "#ea4335" }}
        ></IconAnt>
      </TouchableOpacity>
    </View>
  );
};
const SelectButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.selectButton}>
        <Ionicon
          name="archive"
          style={{ color: "#E42021", fontSize: 24, fontWeight: "bold" }}
        ></Ionicon>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 50,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89c6b6",
    fontSize: 24,
    height: 50,
  },
  addButton: {
    borderRadius: 50,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E42021",
    fontSize: 24,
    height: 50,
    // marginTop: 30
  },
  saveButton: {
    borderRadius: 8,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e83e52",
    fontSize: 24,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 30,
  },
  deleteButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    height: 30,
    width: 30,
  },
  buyButton: {
    borderRadius: 50,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ea4335",
    fontSize: 18,
    height: 40,
    paddingHorizontal: 15,
  },
  selectButton: {
    borderRadius: 100,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#E42021",
    borderWidth: 2,
    borderColor: "#E42021",
    fontSize: 24,
    width: 30,
    height: 30,
    // marginLeft: "auto",
  },
  VolunmButtonContainer: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e83e52",
    padding: 4,
    justifyContent: "space-between",
    width: "70%",
  },
  subButton: {
    // width: 30,
    // height: 30,
    // backgroundColor: "tomato"
  },
});

export {
  MyButton,
  VolunmButton,
  VolunmButtonUpdate,
  AddButton,
  BuyButton,
  SaveButton,
  DeleteButton,
  SelectButton,
};
