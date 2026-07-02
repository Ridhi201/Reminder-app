import { useState } from "react";

const STORAGE_KEY = "admin_calendar_events";

const initialEvents = [
  {
    id: "1",
    title: "Morning Workout",
    start: "2026-06-30T07:00:00",
    end: "2026-06-30T08:00:00",
    backgroundColor: "#EF4444"
  },
  {
    id: "2",
    title: "Drink Water",
    start: "2026-06-30T10:00:00",
    end: "2026-06-30T10:30:00",
    backgroundColor: "#10B981"
  },
  {
    id: "3",
    title: "Project Meeting",
    start: "2026-06-30T15:00:00",
    end: "2026-06-30T16:00:00",
    backgroundColor: "#2563EB"
  }
];

function loadLocalEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return initialEvents;
}

function saveLocalEvents(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export default function useCalendar() {
  const [events, setEvents] = useState(loadLocalEvents);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const persist = (next) => {
    setEvents(next);
    saveLocalEvents(next);
  };

  const createEvent = (newEvent) => {
    persist([...events, newEvent]);
    setModalOpen(false);
  };

  const updateEvent = (id, updatedFields) => {
    persist(events.map(ev => String(ev.id) === String(id) ? { ...ev, ...updatedFields } : ev));
  };

  const deleteEvent = (id) => {
    persist(events.filter(ev => String(ev.id) !== String(id)));
  };

  return {
    events,
    selectedDate,
    setSelectedDate,
    selectedEvent,
    setSelectedEvent,
    modalOpen,
    setModalOpen,
    createEvent,
    updateEvent,
    deleteEvent
  };
}
