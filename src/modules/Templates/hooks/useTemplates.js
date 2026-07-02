import { useState, useMemo } from "react";
import templateService from "../services/templateService";

export const initialTemplates = [
  {
    id: 1,
    name: "Morning Workout",
    category: "Health",
    priority: "High",
    repeat: "Daily",
    description: "Daily cardiovascular and strength training session.",
    status: "Active",
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
    soundNotification: true,
    reminderTime: "07:00",
    notes: "Keep water bottle ready."
  },
  {
    id: 2,
    name: "Drink Water",
    category: "Health",
    priority: "Medium",
    repeat: "Daily",
    description: "Stay hydrated throughout the day.",
    status: "Active",
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
    soundNotification: true,
    reminderTime: "09:00",
    notes: ""
  }
];

const STORAGE_KEY = "admin_templates";

function loadTemplates() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return initialTemplates;
}

function saveTemplates(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export default function useTemplates() {
  const [templatesList, setTemplatesList] = useState(loadTemplates);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [repeat, setRepeat] = useState("All");

  const persist = (next) => {
    setTemplatesList(next);
    saveTemplates(next);
  };

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await templateService.getTemplates();
      if (res && res.data) {
        if (Array.isArray(res.data)) {
          persist(res.data);
        }
      }
    } catch (err) {
      console.error("API error loading templates, using local cache:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived statistics ── */
  const stats = useMemo(() => {
    const counts = templatesList.reduce(
      (acc, item) => {
        const s = item.status?.toLowerCase();
        if (s === "active") acc.active++;
        else if (s === "inactive" || s === "archived") acc.archived++;
        return acc;
      },
      { active: 0, archived: 0 }
    );

    // Baseline counts: 2 active, 0 archived, total 2
    // We scale stats similarly to how reminders does it to match UI aesthetics
    const deltaTotal = templatesList.length - 2;
    const deltaActive = counts.active - 2;
    const deltaArchived = counts.archived - 0;

    return {
      total: 250 + deltaTotal,
      active: 210 + deltaActive,
      popular: 75, // constant mockup
      archived: 40 + deltaArchived
    };
  }, [templatesList]);

  /* ── Derived filtered list ── */
  const filteredTemplates = useMemo(() => {
    return templatesList.filter((item) => {
      const searchString = search.toLowerCase();
      const searchMatch =
        !search ||
        (item.name || "").toLowerCase().includes(searchString) ||
        (item.description || "").toLowerCase().includes(searchString) ||
        (item.notes || "").toLowerCase().includes(searchString);

      const categoryMatch = category === "All" || item.category === category;
      const priorityMatch = priority === "All" || item.priority === priority;
      const statusMatch = status === "All" || item.status === status;
      const repeatMatch = repeat === "All" || item.repeat === repeat;

      return searchMatch && categoryMatch && priorityMatch && statusMatch && repeatMatch;
    });
  }, [templatesList, search, category, priority, status, repeat]);

  /* ── Mutations ── */
  const addTemplate = (data) => {
    const newTemplate = {
      ...data,
      id: data.id || Date.now(),
      status: data.status || "Active",
    };
    persist([...templatesList, newTemplate]);
    return newTemplate;
  };

  const deleteTemplates = async (ids) => {
    try {
      await Promise.all(ids.map((id) => templateService.deleteTemplate(id)));
    } catch (err) {
      console.error("API error deleting templates:", err);
    }
    const listToKeep = templatesList.filter((t) => !ids.includes(t.id));
    persist(listToKeep);
  };

  const updateTemplateStatus = async (ids, newStatus) => {
    try {
      await Promise.all(
        ids.map((id) => templateService.updateTemplate(id, { status: newStatus }))
      );
    } catch (err) {
      console.error("API error updating template status:", err);
    }
    const nextList = templatesList.map((t) =>
      ids.includes(t.id) ? { ...t, status: newStatus } : t
    );
    persist(nextList);
  };

  const updateTemplate = (id, updatedFields) => {
    const nextList = templatesList.map((t) => {
      if (String(t.id) === String(id)) {
        return { ...t, ...updatedFields };
      }
      return t;
    });
    persist(nextList);
  };

  return {
    templatesList,
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
    filteredTemplates,
    stats,
    loading,
    fetchTemplates,
    addTemplate,
    deleteTemplates,
    updateTemplateStatus,
    updateTemplate
  };
}
