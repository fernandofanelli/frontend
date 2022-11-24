import create from "zustand";
import { postOrderBook } from "../api/userBooks";

const useUserBooksStore = create((set) => ({
  isLoading: false,
  errMsg: "",
  orderBook: async (data) => {
    set({ isLoading: true });
    const res = await postOrderBook(data);
    const json = await res.json().then((d) => d);
    set({
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useUserBooksStore;
