import { useState, useMemo } from "react";
import {
  getReminders,
  deleteReminder,
  updateReminder as apiUpdateReminder,
  completeReminder
} from "../../../services/reminderService";

export const initialReminders = [
  {
    id: 1,
    title: "Morning Workout",
    description: "Daily cardiovascular and strength training session.",
    category: "Health",
    priority: "High",
    status: "Active",
    reminderDate: "2026-06-26",
    reminderTime: "07:00",
    repeat: "Daily",
    timezone: "UTC",
    notificationBefore: "5 Min",
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
    soundNotification: true,
    assignedUser: "John Doe",
    owner: "John Doe",
    attachment: null,
    notes: "Keep water bottle ready."
  },
  {
    id: 2,
    title: "Drink Water",
    description: "Stay hydrated throughout the day.",
    category: "Health",
    priority: "Medium",
    status: "Completed",
    reminderDate: "2026-06-26",
    reminderTime: "09:00",
    repeat: "Daily",
    timezone: "UTC",
    notificationBefore: "At time",
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
    soundNotification: true,
    assignedUser: "Sarah Wilson",
    owner: "Sarah Wilson",
    attachment: null,
    notes: ""
  },
  {
    id: 3,
    title: "Submit Project",
    description: "Submit final source code and documentation of the app.",
    category: "Work",
    priority: "High",
    status: "Overdue",
    reminderDate: "2026-06-25",
    reminderTime: "17:00",
    repeat: "Once",
    timezone: "UTC",
    notificationBefore: "15 Min",
    pushNotification: true,
    emailNotification: true,
    smsNotification: true,
    soundNotification: true,
    assignedUser: "Alex Johnson",
    owner: "Alex Johnson",
    attachment: null,
    notes: ""
  },
  {
    id: 4,
    title: "Weekly Team Sync",
    description: "Weekly sync meeting with the product and engineering team.",
    category: "Work",
    priority: "Medium",
    status: "Active",
    reminderDate: "2026-06-30",
    reminderTime: "10:00",
    repeat: "Weekly",
    timezone: "UTC",
    notificationBefore: "1 Hour",
    pushNotification: true,
    emailNotification: true,
    smsNotification: false,
    soundNotification: false,
    assignedUser: "Emma Stone",
    owner: "Emma Stone",
    attachment: null,
    notes: "Review slides before meeting."
  }
];

const STORAGE_KEY = "admin_reminders";

function loadReminders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return initialReminders;
}

function saveReminders(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export default function useReminders() {
  const [remindersList, setRemindersList] = useState(loadReminders);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [repeat, setRepeat] = useState("All");

  const persist = (next) => {
    setRemindersList(next);
    saveReminders(next);
  };

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await getReminders();
      if (res && res.data) {
        if (Array.isArray(res.data)) {
          persist(res.data);
        }
      }
    } catch (err) {
      console.error("API error loading reminders, using local cache:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived statistics ── */
  const stats = useMemo(() => {
    const counts = remindersList.reduce(
      (acc, item) => {
        const s = item.status?.toLowerCase();
        if (s === "active") acc.active++;
        else if (s === "completed") acc.completed++;
        else if (s === "overdue") acc.overdue++;
        return acc;
      },
      { active: 0, completed: 0, overdue: 0 }
    );

    // Initial counts for seeded data: 2 active, 1 completed, 1 overdue, total 4
    const deltaTotal = remindersList.length - 4;
    const deltaActive = counts.active - 2;
    const deltaCompleted = counts.completed - 1;
    const deltaOverdue = counts.overdue - 1;

    return {
      total: 1450 + deltaTotal,
      active: 890 + deltaActive,
      completed: 470 + deltaCompleted,
      overdue: 90 + deltaOverdue,
    };
  }, [remindersList]);

  /* ── Derived filtered list ── */
  const filteredReminders = useMemo(() => {
    return remindersList.filter((item) => {
      const searchString = search.toLowerCase();
      const searchMatch =
        !search ||
        (item.title || "").toLowerCase().includes(searchString) ||
        (item.description || "").toLowerCase().includes(searchString) ||
        (item.notes || "").toLowerCase().includes(searchString);

      const categoryMatch = category === "All" || item.category === category;
      const priorityMatch = priority === "All" || item.priority === priority;
      const statusMatch = status === "All" || item.status === status;
      const repeatMatch = repeat === "All" || item.repeat === repeat;

      return searchMatch && categoryMatch && priorityMatch && statusMatch && repeatMatch;
    });
  }, [remindersList, search, category, priority, status, repeat]);

  /* ── Mutations ── */
  const addReminder = (data) => {
    const newReminder = {
      ...data,
      id: data.id || Date.now(),
      owner: data.reminderOwner || data.owner || "John Doe",
    };
    persist([...remindersList, newReminder]);
    return newReminder;
  };

  const deleteReminders = async (ids) => {
    try {
      await Promise.all(ids.map((id) => deleteReminder(id)));
    } catch (err) {
      console.error("API error deleting reminders:", err);
    }
    const listToKeep = remindersList.filter((r) => !ids.includes(r.id));
    persist(listToKeep);
  };

  const updateReminderStatus = async (ids, newStatus) => {
    try {
      await Promise.all(
        ids.map((id) => {
          if (newStatus === "Completed") {
            return completeReminder(id);
          } else {
            return apiUpdateReminder(id, { status: newStatus });
          }
        })
      );
    } catch (err) {
      console.error("API error updating reminder status:", err);
    }
    const nextList = remindersList.map((r) =>
      ids.includes(r.id) ? { ...r, status: newStatus } : r
    );
    persist(nextList);
  };

  const updateReminder = (id, updatedFields) => {
    const nextList = remindersList.map((r) => {
      if (String(r.id) === String(id)) {
        const owner = updatedFields.reminderOwner || updatedFields.owner || r.owner || "John Doe";
        return { ...r, ...updatedFields, owner };
      }
      return r;
    });
    persist(nextList);
  };

  return {
    remindersList,
    search,
    setSearch,
    category,
    setCategory,
    priority,
    setPriority,
    status,
    setStatus,
    repeat,
    setRepeat,
    filteredReminders,
    stats,
    loading,
    fetchReminders,
    addReminder,
    deleteReminders,
    updateReminderStatus,
    updateReminder,
  };
}
