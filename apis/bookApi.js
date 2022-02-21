import { axiosClient } from "./axiosClient";

export const bookApi = {
  getBooksPerPage(page) {
    return axiosClient.get(`/books?page=${page}`);
  },
  getBookById(bookId) {
    return axiosClient.get(`/books/${bookId}`);
  },
  updateBookById(bookId) {
    return axiosClient.put(`/books/${bookId}`);
  },
};
