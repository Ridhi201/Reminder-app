import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { storageService } from "../services/storage.service.js";

const AuthContext = createContext(null);

const SESSION_KEY = "auth_user";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

function loadUser() {
  // Try localStorage first (remember me), then sessionStorage
  const fromLocal = storageService.get(SESSION_KEY, null);
  if (fromLocal) return fromLocal;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadUser());
  const timerRef = useRef(null);

  const clearSessionTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearSessionTimer();
    storageService.remove(SESSION_KEY);
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    sessionStorage.clear();
    setUser(null);
  }, [clearSessionTimer]);

  const resetTimer = useCallback(() => {
    clearSessionTimer();
    timerRef.current = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT_MS);
  }, [clearSessionTimer, logout]);

  // Track user activity to reset the inactivity timer
  useEffect(() => {
    if (!user) return;

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    const handleActivity = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearSessionTimer();
    };
  }, [user, resetTimer, clearSessionTimer]);

  /**
   * @param {object} userData  - the user object to store
   * @param {boolean} remember - if true, persist across browser restarts
   */
  const login = useCallback((userData, remember = false) => {
    if (remember) {
      storageService.set(SESSION_KEY, userData);
    } else {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData)); } catch { /* ignore */ }
    }
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
