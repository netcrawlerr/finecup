import { create } from "zustand";

const useUser = create((set) => ({
  userId: null,
  isLoggedIn: false,
  isRegistered: false,
  user: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsRegistered: (status) => set({ isRegistered: status }),
  setUser: (user) => set({ user }),
}));

export default useUser;
