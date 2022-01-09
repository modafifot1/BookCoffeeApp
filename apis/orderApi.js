import { axiosClient } from ".";

export const orderApi = {
  order(cartItems, tableCode) {
    return axiosClient.post(
      "/orders",
      { cartItems, tableCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
