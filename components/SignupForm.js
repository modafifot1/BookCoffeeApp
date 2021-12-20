import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MyTextInput, PasswordInput } from "../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDateToString } from "../ultils";
export default function LoginForm({ formData, setFormData, error, setError }) {
  const [showPassword, setShowPassWord] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  const onPickerDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setFormData({
      ...formData,
      birthday: currentDate,
    });
    setShowDatePicker(false);
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
      <MyTextInput
        label="Full Name"
        name="fullName"
        data={formData.fullName}
        error={error.fullName}
        isFocused={isInputFocused.fullName}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></MyTextInput>
      <MyTextInput
        label="Phone number"
        name="phoneNumber"
        data={formData.phoneNumber}
        error={error.phoneNumber}
        isFocused={isInputFocused.phoneNumber}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></MyTextInput>
      <MyTextInput
        label="Birthday"
        name="birthday"
        data={convertDateToString(formData.birthday)}
        error={error.birthday}
        isFocused={isInputFocused.birthday}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={() => setShowDatePicker(true)}
        onPress={() => setShowDatePicker(true)}
      ></MyTextInput>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={formData.birthday}
          onChange={onPickerDateChange}
        ></DateTimePicker>
      )}
      <MyTextInput
        label="Address"
        name="address"
        data={formData.address}
        error={error.address}
        isFocused={isInputFocused.address}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></MyTextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
});
