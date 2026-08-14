const safeStorage = () =>
  typeof window !== "undefined" ? window.localStorage : null;

export function readStoredList(key, fallback = []) {
  const storage = safeStorage();

  if (!storage) {
    return fallback;
  }

  try {
    const rawValue = storage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredList(key, value) {
  const storage = safeStorage();

  if (!storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
}
