import { axiosClient } from "./axiosClient";

export const borrowedBookApi = {
  getBorrowedBooksByStatus(status) {
    return axiosClient.get(`/borrowedBooks/statuses/${status}`);
  },
  getBorrowdBookedById(borrowedBookId) {
    return axiosClient.get(`/borrowedBooks/${borrowedBookId}`);
  },
  createBorrowedBook(data) {
    return axiosClient.post(`/borrowedBooks`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
