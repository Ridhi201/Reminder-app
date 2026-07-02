const PREFIX = "reminder-app:";

export const storageService = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* storage unavailable (e.g. private mode) — fail silently */
    }
  },
  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },
};
