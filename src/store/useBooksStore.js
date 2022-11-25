import create from "zustand";
import { getBooks, getBook, patchBook, getBookMapped, getMatchingBooks, postBook } from "../api/books";

const useBooksStore = create((set) => ({
  books: [],
  bookView: {},
  searchedBooks: [],
  currentBookId : 0,
  bookCreated: false,
  bookUpdated: false,
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
  updateBook: async (data, bid) => {
    set({ isLoading: true });
    const res = await patchBook(data, bid);
    const json = await res.json().then((d) => d);
    set({
      bookUpdated: res.ok ? true : false,
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanBookCreated: () => set({ bookCreated: false }),
  cleanBookUpdated: () => set({ bookUpdated: false }),
  cleanErrMsg: () => set({ errMsg: "" }),
  cleanSearchBooks: () => set({ searchedBooks: [] }),
  cleanCurrentBookId: () => set({ currentBookId: 0 }),
  setCurrentBookId: (id) => set({ currentBookId: id }),


}));

export default useBooksStore;
