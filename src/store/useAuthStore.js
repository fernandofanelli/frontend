import create from "zustand";
import { refreshSession, signIn, signUp } from "../api/auth";

const useAuthStore = create((set) => ({
  isSigned: false,
  userData: [],
  isLoading: false,
  errMsg: "",
  refreshSession: async (token) => {
    set({ isLoading: true });
    const res = await refreshSession();
    const json = await res.json().then((d) => d);
    localStorage.setItem("token", res.ok ? token : "");
    set({
      isSigned: res.ok ? true : false,
      userData: res.ok ? json.data : [],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  signIn: async (data) => {
    set({ isLoading: true });
    const res = await signIn(data);
    const json = await res.json().then((d) => d);
    localStorage.setItem("token", res.ok ? json.data.token : "");
    set({
      isSigned: res.ok ? true : false,
      userData: res.ok ? json.data : [],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  signOut: () => {
    localStorage.setItem("token", "");
    set({ isSigned: false });
  },
  signUp: async (data) => {
    set({ isLoading: true });
    const res = await signUp(data);
    const json = await res.json().then((d) => d);
    localStorage.setItem("token", res.ok ? json.data.token : "");
    set({
      isSigned: res.ok ? true : false,
      userData: res.ok ? json.data : [],
      isLoading: false,
      errMsg: res.ok ? "" : json.message,
    });
  },
  cleanErrMsg: () => set({ errMsg: "" }),
}));

export default useAuthStore;
