import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { MyButton } from "../components/MyButton";
import { login, clearError } from "../reducers/authSlice";
import { validateLoginData } from "../ultils";
import { LineDotsLoader } from "react-native-indicator";
import { Toast } from "../components/Toast";

export default function LoginScreen({ navigation }) {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogin = () => {
    if (validateLoginData(formData, formError, setFormError)) {
      dispatch(login(formData));
    }
  };

  // useEffect(() => {
  //   dispatch(clearError());
  // }, [error]);
  return loading ? (
    <View style={styles.containerLoader}>
      <Text>Singing in...</Text>
      <LineDotsLoader></LineDotsLoader>
    </View>
  ) : (
    <View style={{ width: "100%", height: "100%" }}>
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
        <LoginForm
          formData={formData}
          setFormData={setFormdata}
          error={formError}
          setError={setFormError}
        ></LoginForm>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={{ color: "gray" }}>Forgot your password?</Text>
          </TouchableOpacity>
          <MyButton onPress={onLogin} label="Login"></MyButton>
          <View style={{ flexDirection: "row" }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              style={{ justifyContent: "flex-end" }}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signup}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast
        title={error ? "Login fail" : "Login succesfully"}
        message={error}
        isError={error ? true : false}
      ></Toast>
    </View>
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
  },
});
