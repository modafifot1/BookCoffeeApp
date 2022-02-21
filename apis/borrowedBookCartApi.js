import { axiosClient } from "./axiosClient";

export const borrowedBookCartApi = {
  addItem(cartItems) {
    return axiosClient.post("/bookCarts", cartItems, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getCartItems() {
    return axiosClient.get("/bookCarts");
  },
  updateCartItem(borrowedBookCartId, quantity) {
    return axiosClient.put(
      `/bookCarts/${borrowedBookCartId}`,
      { quantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  deleteCartItem(borrowedBookCartItems) {
    return axiosClient.delete("/bookCarts", {
      headers: {
        "Content-Type": "application/json",
      },
      data: borrowedBookCartItems,
    });
  },
};
