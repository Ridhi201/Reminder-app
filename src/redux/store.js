import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice.js";
import authReducer from "./slices/authSlice.js";
import remindersReducer from "./slices/reminderSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    reminders: remindersReducer,
  },
});
