// src/store/authStore.ts
// The nav bar needs to know whether anyone is logged in. A store is a box
// any component can read from directly, without passing props down.
import { create } from "zustand";
import { persist } from "zustand/middleware"; // <-- SESSION 7

// The shape of the store: its data AND the functions that change it
interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

// SESSION 7: wrapped in persist() so refreshing the page no longer logs
// the user out. The store's own shape and every component that reads it
// stay exactly the same -- persist is a wrapper, not a rewrite.
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      login: (name) => set({ token: `demo-token-${name}`, userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "itelect4-auth", // the localStorage key it writes to
      partialize: (state) => ({
        // save ONLY these two fields -- login/logout are functions and
        // can't become JSON, and a real token should never live here
        // once Module 4 issues real JWTs (that belongs in an httpOnly
        // cookie the server sets, which JS can't read at all)
        token: state.token,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;
