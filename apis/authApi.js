import { axiosClient } from "./axiosClient";

export const authApi = {
  login(data) {
    return axiosClient.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  signup(data) {
    return axiosClient.post("/auth/register-customer", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
