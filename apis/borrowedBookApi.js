import { axiosClient } from ".";

export const borrowedBookApi = {
  getBorrowedBooks() {
    return axiosClient.get("/borrowedBooks");
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
