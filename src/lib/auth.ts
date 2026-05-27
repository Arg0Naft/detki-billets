const KEY = "event_admin_auth";
const LOGIN = "admin";
const PASSWORD = "EventAdmin2026";

export function login(l: string, p: string): boolean {
  if (l === LOGIN && p === PASSWORD) {
    sessionStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}

export function logout() {
  sessionStorage.removeItem(KEY);
}