import { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "../services/storage.service.js";
import { APP_CONFIG } from "../config/app.config.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => storageService.get("theme", APP_CONFIG.defaultTheme)
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageService.set("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
