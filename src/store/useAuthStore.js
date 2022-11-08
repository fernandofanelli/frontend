import create from "zustand";
import { signIn, signUp } from "../api/auth";

const useAuthStore = create((set) => ({
  isSigned: false,
  userData: {},
  isLoading: false,
  errMsg: "",
  signIn: async (data) => {
    set({ isLoading: true });
    const res = await signIn(data);
    const json = await res.json().then((d) => d);
    set({
      isSigned: res.ok ? true : false,
      userData: res.ok ? json.identifiedUser : [],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  signOut: () => {
    set({ isSigned: false });
  },
  signUp: async (data) => {
    set({ isLoading: true });
    const res = await signUp(data);
    const json = await res.json().then((d) => d);
    set({
      isSigned: res.ok ? true : false,
      userData: res.ok ? json.identifiedUser : [],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useAuthStore;
