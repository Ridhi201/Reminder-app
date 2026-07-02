import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle | loading | authenticated | error
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "idle";
    },
    logout(state) {
      state.user = null;
      state.status = "idle";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
