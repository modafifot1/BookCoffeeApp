import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../assets/images/notImage.png";
import moment from "moment";
import { getProfile, updateAvatar } from "../reducers/profileSlice";
import { ProfileForm } from "../components/ProfileForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { useToast } from "react-native-fast-toast";
import { useIsFocused } from "@react-navigation/native";
import { LoadingPage } from "../components/LoadingPage";
import Icons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary } from "react-native-image-picker";
const MyProfileScreen = () => {
  const { profile, password } = useSelector((state) => state.profile);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getProfile());
  }, [isFocused]);
  useEffect(() => {
    let message;
    let type;
    if (isFocused && profile.status) {
      message =
        profile.status < 300 ? profile.msg : "Cập nhập thông tin thất bại!";
      type = profile.status < 300 ? "success" : "danger";
      message &&
        toast.show(message, { type, duration: 2000, animationType: "zoom-in" });
    }
  }, [profile]);
  useEffect(() => {
    let type;
    if (isFocused && password.status) {
      type = password.status < 300 ? "success" : "danger";
      toast.show(password.msg, {
        type,
        duration: 2000,
        animationType: "zoom-in",
      });
    }
  }, [password]);
  const onChangeImage = async () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options).then((res) => {
      const data = new FormData();
      data.append("image", {
        uri: res.assets[0].uri,
        name: "test.jpg",
        type: "image/jpeg",
      });
      dispatch(updateAvatar(data));
    });
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.myProfileInfo}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={
                profile.data.imageUrl
                  ? {
                      uri: profile.data.imageUrl,
                    }
                  : NoImage
              }
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 10,
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
              }}
            ></Image>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={onChangeImage}>
              <Icons name="add-a-photo" style={{ fontSize: 24 }}></Icons>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={styles.headerInfo}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18 }}
                numberOfLines={2}
              >
                {profile.data.fullName || "Đang cập nhật"}
              </Text>
            </View>
            <View style={styles.additionalInfo}>
              <Text
                style={{ fontStyle: "italic", color: "grey", marginTop: 10 }}
              >
                {profile.data.email ? profile.data.email : "Đang cập nhật"}
              </Text>
            </View>
            <View style={styles.additionalInfo}>
              <Text
                style={{ fontStyle: "italic", color: "grey", marginTop: 10 }}
              >
                {profile.data.birthday
                  ? moment(profile.data.imageUrl).format("DD-MM-YYYY")
                  : "Đang cập nhật"}
              </Text>
            </View>
            <View style={{ alignSelf: "baseline" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(234, 67, 53)",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
                onPress={() => setIsEdit(!isEdit)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Cập nhật
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.myProfileInfoEdit}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Thông tin cá nhân
          </Text>
          <ProfileForm data={profile.data} isEdit={isEdit}></ProfileForm>
        </View>
        <View style={styles.myProfileInfoChangePassword}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Đổi mật khẩu
          </Text>
          <ChangePasswordForm
            data={profile.data}
            isEdit={isEdit}
          ></ChangePasswordForm>
        </View>
      </ScrollView>
      {(profile.loading || password.loading) && <LoadingPage></LoadingPage>}
    </View>
  );
};
export default MyProfileScreen;

const styles = StyleSheet.create({
  myProfileContainer: {},
  myProfileInfo: {
    flexDirection: "row",
    padding: 20,
    // justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 10,

    elevation: 10,
  },
  myProfileInfoEdit: {
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 10,

    elevation: 10,
  },
  myProfileInfoChangePassword: {
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 10,

    elevation: 10,
  },
});
