import axios from "axios";
import { useDispatch } from "react-redux";
// const baseURL = "https://hidden-citadel-92766.herokuapp.com/api/v1";

const baseURL = "http:192.168.1.238:8000/api/v1";

// const baseURL = "https://260b-183-80-136-227.ngrok.io/api/v1";

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use((config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);
