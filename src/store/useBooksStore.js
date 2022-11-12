import create from "zustand";
import { getBooks, getUserBooks, getAllUserBooks } from "../api/books";

const useBooksStore = create((set) => ({
  books: [],
  userBooks: [],
  allUserBooks: [],
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
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useBooksStore;
