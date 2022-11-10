import create from "zustand";
import { getBooks, getUserBooks } from "../api/books";

const useBooksStore = create((set) => ({
  books: [],
  userBooks: [],
  isLoading: false,
  errMsg: "",
  getBooks: async (data) => {
    set({ isLoading: true });
    const res = await getBooks(data);
    const json = await res.json().then((d) => d);
    console.log(json);
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
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useBooksStore;
