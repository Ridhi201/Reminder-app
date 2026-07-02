import en from "./en.json";

const dictionaries = { en };

/** t("common.save", "en") -> "Save". Falls back to the key path if missing. */
export function t(keyPath, locale = "en") {
  const dict = dictionaries[locale] || dictionaries.en;
  const value = keyPath.split(".").reduce((acc, k) => acc?.[k], dict);
  return value ?? keyPath;
}

export default dictionaries;
