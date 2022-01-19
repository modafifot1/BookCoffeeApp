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
  purchase(cartItems, tableCode, total, paymentMethod) {
    console.log(cartItems);
    return axiosClient.post(
      "/orders/purchase",
      {
        cartItems: cartItems,
        tableCode,
        total,
        paymentMethod,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  paymentMomo(data) {
    return axiosClient.post("/orders/payment", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getOrdersByStatus(status) {
    return axiosClient.get(`/orders/statuses/${status}`);
  },
  getOrderById(orderId) {
    return axiosClient.get(`/orders/${orderId}`);
  },
};
