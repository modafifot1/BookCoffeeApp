import { axiosClient } from "./axiosClient";

export const productApi = {
  getProductsPerPage(page) {
    return axiosClient.get(`/foods?page=${page}`);
  },
  getProductById(productId) {
    return axiosClient.get(`/foods/${productId}`);
  },
};
