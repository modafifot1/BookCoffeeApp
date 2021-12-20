import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../components/SignupForm";
import { MyButton } from "../components/MyButton";
import { signup } from "../reducers/authSlice";
import { validateSignupData } from "../ultils";
import { LineDotsLoader } from "react-native-indicator";
export default function SignupScreen({ navigation }) {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    birthday: new Date(Date.now()),
    address: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onSignup = () => {
    if (validateSignupData(formData, error, setError)) {
      dispatch(signup(formData));
    }
  };

  return loading ? (
    <View style={styles.containerLoader}>
      <Text>Singing up...</Text>
      <LineDotsLoader></LineDotsLoader>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.headerBackground,
          {
            transform: [{ rotate: "120deg" }],
          },
        ]}
      ></View>
      <View style={styles.header}>
        <Text style={styles.headerLarge}>Welcome!</Text>
        <Text style={styles.headerSmall}>Please sign in to continue!</Text>
      </View>
      <SignupForm
        formData={formData}
        setFormData={setFormdata}
        error={error}
        setError={setError}
      ></SignupForm>
      <View style={styles.footer}>
        <MyButton onPress={onSignup} label="Signup"></MyButton>
        <View style={{ flexDirection: "row" }}>
          <Text>Have an account?</Text>
          <TouchableOpacity
            style={{ justifyContent: "flex-end" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.signup}>Sign-in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const commonStyle = {};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  headerBackground: {
    backgroundColor: "#89c6b6",
    width: 550,
    height: 550,
    borderRadius: 380,
    marginTop: -220,
    marginLeft: -120,
  },
  header: {
    position: "absolute",
    top: 180,
    paddingLeft: 50,
  },
  headerLarge: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  headerSmall: {
    color: "white",
  },
  footer: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 120,
  },
  signup: {
    marginLeft: 5,
    color: "#89c6b6",
  },
  containerLoader: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    opacity: 0.3,
  },
});
