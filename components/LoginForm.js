import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { MyTextInput, PasswordInput } from "../components/TextInput";

export default function LoginForm({ formData, setFormData, error, setError }) {
  const [showPassword, setShowPassWord] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });
  const onInputChange = (name, e) => {
    const { text } = e.nativeEvent;
    setFormData({
      ...formData,
      [name]: text,
    });
  };
  const onInputFocus = (name) => {
    setError({
      ...error,
      [name]: "",
    });
    setIsInputFocused({
      ...isInputFocused,
      [name]: true,
    });
  };
  const onInputBlur = (name) => {
    setIsInputFocused({
      ...isInputFocused,
      [name]: false,
    });
  };
  return (
    <View style={styles.form}>
      <MyTextInput
        label="Email"
        name="email"
        data={formData.email}
        error={error.email}
        isFocused={isInputFocused.email}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
      ></MyTextInput>
      <PasswordInput
        label="Password"
        name="password"
        data={formData.password}
        error={error.password}
        isFocused={isInputFocused.password}
        showPassword={showPassword}
        setShowPassWord={setShowPassWord}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></PasswordInput>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
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
