// Thin wrapper around localStorage — the single place every persisted key goes through.
// Services import this instead of touching window.localStorage directly, so swapping
// a service's storage backend for real HTTP calls later only touches one file.

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}
