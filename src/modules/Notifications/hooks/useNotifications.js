import { useState, useMemo } from "react";
import notificationService from "../services/notificationService";

export const initialNotifications = [
  {
    id: 1,
    recipient: "John Doe",
    type: "Email",
    title: "Monthly Tax Assessment Reminder",
    message: "Your monthly tax report is ready. Please review and submit by 5th July.",
    status: "Sent",
    sentTime: "2026-07-02 09:30 AM",
  },
  {
    id: 2,
    recipient: "Jane Smith",
    type: "Push",
    title: "Daily Hydration Alert",
    message: "Time to drink water! Keep up your health goals.",
    status: "Sent",
    sentTime: "2026-07-02 10:00 AM",
  },
  {
    id: 3,
    recipient: "Priyanka",
    type: "SMS",
    title: "High Expense Alert",
    message: "You have spent 85% of your entertainment budget this month.",
    status: "Failed",
    sentTime: "2026-07-01 04:15 PM",
    error: "SMS Provider Gateway Error: Insufficient credits",
  },
  {
    id: 4,
    recipient: "Amit Sharma",
    type: "Email",
    title: "Security Alert: New login",
    message: "A new login was detected on your account from Chrome/Windows.",
    status: "Sent",
    sentTime: "2026-07-01 11:20 PM",
  },
  {
    id: 5,
    recipient: "Rahul Verma",
    type: "Push",
    title: "Gym Workout reminder",
    message: "Prepare your workout gear. Your cardio session starts in 1 hour.",
    status: "Pending",
    sentTime: "2026-07-02 06:00 PM",
  },
  {
    id: 6,
    recipient: "Sarah Connor",
    type: "Email",
    title: "System Update Complete",
    message: "The application has been successfully updated to version 1.2.0.",
    status: "Sent",
    sentTime: "2026-06-30 08:00 AM",
  },
  {
    id: 7,
    recipient: "Bruce Wayne",
    type: "SMS",
    title: "Premium Subscription Activated",
    message: "Thank you for subscribing! Your Premium plan is now active.",
    status: "Sent",
    sentTime: "2026-06-29 02:00 PM",
  },
  {
    id: 8,
    recipient: "Peter Parker",
    type: "Push",
    title: "Upcoming assignment deadline",
    message: "Review assignment guidelines. Due in 12 hours.",
    status: "Sent",
    sentTime: "2026-07-02 08:45 AM",
  },
  {
    id: 9,
    recipient: "Tony Stark",
    type: "Email",
    title: "Project Milestone Achieved",
    message: "All tasks for Milestone 2 have been checked off by the team.",
    status: "Sent",
    sentTime: "2026-06-28 05:30 PM",
  },
  {
    id: 10,
    recipient: "Clark Kent",
    type: "SMS",
    title: "Subscription Renewal Notice",
    message: "Your subscription will automatically renew in 3 days.",
    status: "Failed",
    sentTime: "2026-06-27 10:00 AM",
    error: "Carrier Delivery Failure: Invalid subscriber number",
  },
  {
    id: 11,
    recipient: "Diana Prince",
    type: "Push",
    title: "Weekly Summary Report",
    message: "Your weekly productivity summary is ready. You completed 94% of your tasks!",
    status: "Sent",
    sentTime: "2026-06-26 09:00 AM",
  },
  {
    id: 12,
    recipient: "Barry Allen",
    type: "SMS",
    title: "Fast Track Code Validation",
    message: "Verification code: 827192. Expired in 2 minutes.",
    status: "Sent",
    sentTime: "2026-07-02 11:15 AM",
  }
];

const STORAGE_KEY = "admin_notifications";

function loadNotifications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return initialNotifications;
}

function saveNotifications(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export default function useNotifications() {
  const [notificationsList, setNotificationsList] = useState(loadNotifications);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const persist = (next) => {
    setNotificationsList(next);
    saveNotifications(next);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getNotifications();
      if (res && res.data && Array.isArray(res.data)) {
        persist(res.data);
      }
    } catch (err) {
      console.error("API error loading notifications, using local cache:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived Statistics ── */
  const stats = useMemo(() => {
    return notificationsList.reduce(
      (acc, item) => {
        acc.total++;
        const s = item.status?.toLowerCase();
        if (s === "sent") acc.sent++;
        else if (s === "pending") acc.pending++;
        else if (s === "failed") acc.failed++;
        return acc;
      },
      { total: 0, sent: 0, pending: 0, failed: 0 }
    );
  }, [notificationsList]);

  /* ── Derived Filtered List ── */
  const filteredNotifications = useMemo(() => {
    return notificationsList.filter((item) => {
      const searchString = search.toLowerCase();
      const searchMatch =
        !search ||
        (item.recipient || "").toLowerCase().includes(searchString) ||
        (item.title || "").toLowerCase().includes(searchString) ||
        (item.message || "").toLowerCase().includes(searchString);

      const typeMatch = type === "All" || item.type === type;
      const statusMatch = status === "All" || item.status === status;

      return searchMatch && typeMatch && statusMatch;
    });
  }, [notificationsList, search, type, status]);

  /* ── Mutations ── */
  const sendNotification = async (data) => {
    setLoading(true);
    const newNotif = {
      ...data,
      id: Date.now(),
      status: data.scheduledTime ? "Pending" : "Sent",
      sentTime: data.scheduledTime || new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
    };

    try {
      await notificationService.sendNotification(newNotif);
    } catch (err) {
      console.error("API error sending notification:", err);
    }

    persist([newNotif, ...notificationsList]);
    setLoading(false);
    return newNotif;
  };

  const deleteNotification = async (id) => {
    setLoading(true);
    try {
      await notificationService.deleteNotification(id);
    } catch (err) {
      console.error("API error deleting notification:", err);
    }
    persist(notificationsList.filter((n) => n.id !== id));
    setLoading(false);
  };

  return {
    notificationsList,
    search,
    setSearch,
    type,
    setType,
    status,
    setStatus,
    filteredNotifications,
    stats,
    loading,
    fetchNotifications,
    sendNotification,
    deleteNotification,
  };
}
