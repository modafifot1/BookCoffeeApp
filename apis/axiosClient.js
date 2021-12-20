import axios from "axios";
import { useDispatch } from "react-redux";
// const baseURL = "https://obscure-inlet-52224.herokuapp.com/api/v1";
const baseURL = "http:192.168.1.117:8000/api/v1";

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
    // const dispatch = useDispatch();
    console.log("Error: ", err.response.data);
    throw err;
  }
);
