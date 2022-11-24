import create from "zustand";
import { getBooks, getBook, getMatchingBooks, postBook } from "../api/books";

const useBooksStore = create((set) => ({
  books: [],
  bookView: {},
  searchedBooks: [],
  bookCreated: false,
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
    set({
      searchedBooks: [...json.data],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  postBook: async (data) => {
    set({ isLoading: true });
    const res = await postBook(data);
    const json = await res.json().then((d) => d);
    set({
      bookCreated: res.ok ? true : false,
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanBookCreated: () => set({ bookCreated: false }),
  cleanErrMsg: () => set({ errMsg: "" }),
  cleanSearchBooks: () => set({ searchedBooks: [] }),
}));

export default useBooksStore;
