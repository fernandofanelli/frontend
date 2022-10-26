import create from "zustand";
import { signIn, signUp } from "../api/auth";

const useAuthStore = create((set) => ({
  isSigned: false,
  isLoading: false,
  errMsg: "",
  signIn: async (data) => {
    set({ isLoading: true });
    const res = await signIn(data);
    const message = await res.json().then((d) => d.message);
    set({
      isSigned: res.ok ? true : false,
      isLoading: false,
      errMsg: res.ok ? "" : message,
    });
  },
  signOut: () => {
    set({ isSigned: false });
  },
  signUp: async (data) => {
    set({ isLoading: true });
    const res = await signUp(data);
    const message = await res.json().then((d) => d.message);
    set({
      isSigned: res.ok ? true : false,
      isLoading: false,
      errMsg: res.ok ? "" : message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useAuthStore;
