import { json } from "react-router-dom";
import create from "zustand";
import {
  getUserBooks,
  getAllUserBooks,
  getAllUserBorrowingBooks,
  postOrderBook,
  returnOrderBook,
} from "../api/userBooks";

const useUserBooksStore = create((set) => ({
  userBooks: [],
  allUserBooks: [],
  borrowedBooks: [],
  bookOrdered: false,
  bookReturned: false,
  isLoading: false,
  userBookErrMsg: "",
  getUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      userBooks: res.ok ? [...json.data] : [],
      isLoading: false,
      userBookErrMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      allUserBooks: res.ok ? [...json.data] : [],
      isLoading: false,
      userBookErrMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBorrowingBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBorrowingBooks(data);
    const json = await res.json().then((d) => d);
    set({
      borrowedBooks: json.data.length !== 0 ? [...json.data] : [],
      isLoading: false,
      userBookErrMsg: res.ok ? "" : json.message,
    });
  },
  orderBook: async (data) => {
    set({ isLoading: true });
    const res = await postOrderBook(data);
    const json = await res.json().then((d) => d);
    set({
      bookOrdered: res.ok ? true : false,
      isLoading: false,
      userBookErrMsg: res.ok ? "" : json.message,
    });
  },
  returnBook: async (data) => {
    set({ isLoading: true });
    const res = await returnOrderBook(data);
    const json = await res.json().then((d) => d);
    set({
      bookReturned: res.ok ? true : false,
      isLoading: false,
      userBookErrMsg: res.ok ? "" : json.message,
    });
  },
  cleanUserBooks: () => set({ userBooks: [] }),
  cleanBookReturned: () => set({ bookReturned: false }),
  cleanBookOrdered: () => set({ bookOrdered: false }),
  cleanUserBookErrMsg: () => set({ userBookErrMsg: "" }),
}));

export default useUserBooksStore;
