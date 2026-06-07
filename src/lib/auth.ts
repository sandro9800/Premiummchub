// Admin auth is intentionally synchronous because it does not touch
// the server. Credentials live in Vite env vars (VITE_ADMIN_USERNAME /
// VITE_ADMIN_PASSWORD) and are compared client-side at build time.
const SESSION_KEY = "pmch_admin_session";

export function hasAdminCredentials(): boolean {
  const u = import.meta.env.VITE_ADMIN_USERNAME;
  const p = import.meta.env.VITE_ADMIN_PASSWORD;
  return Boolean(u && p);
}

export function login(username: string, password: string): boolean {
  const envUser = import.meta.env.VITE_ADMIN_USERNAME || "";
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || "";
  if (!envUser || !envPass) {
    return false;
  }
  if (username !== envUser || password !== envPass) {
    return false;
  }
  if (typeof window !== "undefined" && window.sessionStorage) {
    window.sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ user: username, ts: Date.now() }),
    );
  }
  return true;
}

export function logout(): void {
  if (typeof window !== "undefined" && window.sessionStorage) {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined" || !window.sessionStorage) return false;
  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.user);
  } catch {
    return false;
  }
}
