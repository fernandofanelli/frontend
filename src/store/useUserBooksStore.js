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
  isLoading: false,
  errMsg: "",
  getUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      userBooks: [...json.data],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      allUserBooks: [...json.data],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBorrowingBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBorrowingBooks(data);
    const json = await res.json().then((d) => d);
    set({
      borrowedBooks: [...json.data],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  orderBook: async (data) => {
    set({ isLoading: true });
    const res = await postOrderBook(data);
    const json = await res.json().then((d) => d);
    set({
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  returnBook: async (data) => {
    set({ isLoading: true });
    const res = await returnOrderBook(data);
    const json = await res.json().then((d) => d);
    set({
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useUserBooksStore;
