import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { PasswordInput } from "../components/TextInput";
import { changePassword } from "../reducers/profileSlice";

export const ChangePasswordForm = ({ isEdit }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const dispatch = useDispatch();

  const onChangePassword = () => {
    if (!formData.oldPassword) {
      setError({
        ...error,
        oldPassword: "Vui lòng nhập mật khẩu cũ!",
      });
      return;
    }
    if (!formData.newPassword) {
      setError({
        ...error,
        oldPassword: "Vui lòng nhập mật khẩu mới!",
      });
      return;
    }
    if (!formData.confirmPassword) {
      setError({
        ...error,
        oldPassword: "Vui lòng xác nhận mật khẩu mới!",
      });
      return;
    }
    dispatch(changePassword(formData));
  };
  return (
    <View style={styles.form}>
      <PasswordInput
        label="Mật khẩu cũ"
        name="oldPassword"
        data={formData.oldPassword}
        error={error.oldPassword}
        isFocused={isInputFocused.oldPassword}
        showPassword={showOldPassword}
        setShowPassWord={setShowOldPassword}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></PasswordInput>
      <PasswordInput
        label="Mật khẩu mới"
        name="newPassword"
        data={formData.newPassword}
        error={error.newPassword}
        isFocused={isInputFocused.newPassword}
        showPassword={showNewPassword}
        setShowPassWord={setShowNewPassword}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></PasswordInput>
      <PasswordInput
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        data={formData.confirmPassword}
        error={error.confirmPassword}
        isFocused={isInputFocused.confirmPassword}
        showPassword={showConfirmPassword}
        setShowPassWord={setShowConfirmPassword}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
      ></PasswordInput>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#89c6b6",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            // alignSelf: "baseline",
          }}
          onPress={onChangePassword}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
});
