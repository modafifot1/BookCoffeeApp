import { axiosClient } from "./axiosClient";

export const profileApi = {
  getProfile() {
    return axiosClient.get("/profile");
  },
  updateProfile(data) {
    return axiosClient.put("/profile", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateAvatar(formData) {
    return axiosClient.put(`/profile/avatar`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  changePassword(data) {
    return axiosClient.put("/auth/changePassword", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
