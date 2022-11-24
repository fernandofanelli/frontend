import create from "zustand";
import {
  getBooks,
  getBook,
  getUserBooks,
  getAllUserBooks,
  getMatchingBooks,
  getAllUserBorrowingBooks,
} from "../api/books";

const useBooksStore = create((set) => ({
  books: [],
  userBooks: [],
  allUserBooks: [],
  bookView: {},
  searchedBooks: [],
  isLoading: false,
  errMsg: "",
  getBooks: async (data) => {
    set({ isLoading: true });
    const res = await getBooks(data);
    const json = await res.json().then((d) => d);
    set({
      books: [...json.books],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      userBooks: [...json.books],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getBook: async (data) => {
    set({ isLoading: true });
    const res = await getBook(data);
    const json = await res.json().then((d) => d);
    set({
      bookView: json.data,
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  searchBooks: async (data) => {
    set({ isLoading: true });
    const res = await getMatchingBooks(data);
    const json = await res.json().then((d) => d);
    console.log("results", json);
    set({
      searchedBooks: [...json.data],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBooks(data);
    const json = await res.json().then((d) => d);
    set({
      allUserBooks: [...json.books],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  getAllUserBorrowingBooks: async (data) => {
    set({ isLoading: true });
    const res = await getAllUserBorrowingBooks(data);
    const json = await res.json().then((d) => d);
    set({
      allUserBooks: [...json.books],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
  cleanSearchBooks: () => set({ searchedBooks: [] }),
}));

export default useBooksStore;
