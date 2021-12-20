import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

const MyTextInput = ({
  label,
  name,
  data,
  error,
  isFocused,
  onInputFocus,
  onInputChange,
  onInputBlur,
  onPress,
}) => {
  return (
    <View style={styles.input}>
      <Text
        style={{
          color: error ? "red" : data || isFocused ? "white" : "#89c6b6",
          fontSize: 16,
        }}
      >
        {error ? error : label}
      </Text>
      <TextInput
        value={data}
        nativeID={name}
        style={styles.textInput}
        placeholder={isFocused ? "" : label}
        placeholderTextColor="white"
        onFocus={() => {
          onInputFocus(name);
        }}
        onChange={(e) => {
          onInputChange(name, e);
        }}
        onBlur={() => {
          onInputBlur(name);
        }}
        onPressIn={onPress}
      ></TextInput>
    </View>
  );
};
const PasswordInput = ({
  label,
  name,
  data,
  error,
  isFocused,
  showPassword,
  setShowPassWord,
  onInputFocus,
  onInputChange,
  onInputBlur,
}) => {
  return (
    <View style={styles.input}>
      <Text
        style={{
          color: error ? "red" : data || isFocused ? "white" : "#89c6b6",
          fontSize: 16,
        }}
      >
        {error ? error : label}
      </Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          secureTextEntry={!showPassword}
          value={data}
          nativeID={name}
          style={[styles.textInput, { flex: 1 }]}
          placeholder={isFocused ? "" : label}
          placeholderTextColor="white"
          onFocus={() => {
            onInputFocus(name);
          }}
          onChange={(e) => onInputChange(name, e)}
          onBlur={() => {
            onInputBlur(name);
          }}
        ></TextInput>
        <Ionicon
          name={showPassword == true ? "eye" : "eye-off"}
          style={styles.icon}
          onPress={() => {
            setShowPassWord(!showPassword);
          }}
        ></Ionicon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 12,
    backgroundColor: "#89c6b6",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
  },
  icon: {
    fontSize: 16,
    lineHeight: 16,
  },
});
const SearchInput = ({
  name,
  data,
  error,
  isFocused,
  onInputFocus,
  onInputChange,
  onInputBlur,
  style,
}) => {
  return (
    <TextInput
      nativeID={name}
      value={error ? error : data}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      onChange={onInputChange}
      style={style}
    ></TextInput>
  );
};
export { MyTextInput, PasswordInput, SearchInput };
