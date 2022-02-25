import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MyTextInput } from "../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertDateToString } from "../ultils";
import { updateProfile } from "../reducers/profileSlice";
import { useDispatch } from "react-redux";
export const ProfileForm = ({ data, isEdit }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });
  useEffect(() => {
    setFormData(data);
  }, [data]);
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
  const onChangeProfile = () => {
    dispatch(updateProfile(formData));
  };
  return (
    <View style={styles.form}>
      <MyTextInput
        label="Full Name"
        name="fullName"
        data={formData.fullName}
        error={error.fullName}
        isFocused={isInputFocused.fullName}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={onInputFocus}
        isDisabled={!isEdit}
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
        isDisabled={!isEdit}
      ></MyTextInput>
      <MyTextInput
        label="Birthday"
        name="birthday"
        data={
          formData.birthday
            ? convertDateToString(new Date(formData.birthday))
            : ""
        }
        error={error.birthday}
        isFocused={isInputFocused.birthday}
        onInputBlur={onInputBlur}
        onInputChange={onInputChange}
        onInputFocus={() => setShowDatePicker(true)}
        onPress={() => setShowDatePicker(true)}
        isDisabled={!isEdit}
      ></MyTextInput>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={new Date(formData.birthday)}
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
        isDisabled={!isEdit}
      ></MyTextInput>
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
          disabled={!isEdit}
          onPress={onChangeProfile}
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
