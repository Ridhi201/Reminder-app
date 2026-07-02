import { createSlice } from "@reduxjs/toolkit";

const remindersSlice = createSlice({
  name: "reminders",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | error
  },
  reducers: {
    setReminders(state, action) {
      state.items = action.payload;
    },
    addReminder(state, action) {
      state.items.push(action.payload);
    },
    removeReminder(state, action) {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
  },
});

export const { setReminders, addReminder, removeReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
