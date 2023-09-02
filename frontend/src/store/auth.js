import { create } from "zustand";

const useAuth = create((set) => ({
    isLogin: false,
    setIsLogin: (newstate) => set({ isLogin: newstate }),
}));

export default useAuth;
