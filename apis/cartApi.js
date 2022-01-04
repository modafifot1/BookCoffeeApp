import { axiosClient } from "./axiosClient";

export const cartApi = {
  addItem(cartItems) {
    return axiosClient.post("/carts", cartItems, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getCartItems() {
    return axiosClient.get("/carts");
  },
  updateCartItem(cartId, quantity) {
    return axiosClient.put(
      `/carts/${cartId}`,
      { quantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  deleteCartItem(cartItems) {
    console.log("CartItems: ", cartItems);

    return axiosClient.delete("/carts/", {
      headers: {
        "Content-Type": "application/json",
      },
      data: cartItems,
    });
  },
};
