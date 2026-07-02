import api from "./api";

export const getReminders = () =>
  api.get("/reminders");

export const getReminderById = (id) =>
  api.get(`/reminders/${id}`);

export const createReminder = (data) =>
  api.post("/reminders", data);

export const updateReminder = (id, data) =>
  api.put(`/reminders/${id}`, data);

export const deleteReminder = (id) =>
  api.delete(`/reminders/${id}`);

export const completeReminder = (id) =>
  api.patch(`/reminders/${id}/complete`);

export const snoozeReminder = (id, minutes) =>
  api.patch(`/reminders/${id}/snooze`, {
    minutes,
  });
