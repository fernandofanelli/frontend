import create from "zustand";
import { signIn, signUp } from "../api/auth";

const useAuthStore = create((set) => ({
  isSigned: false,
  isLoading: false,
  //Todo, implement fetch over here
  signIn: async (data) => {
    set({ isLoading: true });
    const res = await signIn(data);
    set({ isSigned: res.ok ? true : false, isLoading: false });
  },
  signOut: () => {
    set({ isSigned: false });
  },
  signUp: async (data) => {
    set({ isLoading: true });
    const res = await signUp(data);
    set({ isSigned: res.ok ? true : false, isLoading: false });
  },
}));

export default useAuthStore;
