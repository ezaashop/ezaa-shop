// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: number | null;
  user: any | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setToken, setUserId, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
