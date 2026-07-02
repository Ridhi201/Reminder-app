import { useEffect, useState } from "react";
import { storageService } from "../services/storage.service.js";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storageService.get(key, initialValue));

  useEffect(() => {
    storageService.set(key, value);
  }, [key, value]);

  return [value, setValue];
}
