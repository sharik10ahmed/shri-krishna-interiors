const AUTH_KEY = "skki:admin-auth";

export const DEMO_EMAIL = "admin@shrikrishnakitchen.com";
export const DEMO_PASSWORD = "admin123";

/** Frontend-only demo auth. Not real authentication. */
export function signIn(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
  if (ok) window.localStorage.setItem(AUTH_KEY, "1");
  return ok;
}

export function signOut() {
  window.localStorage.removeItem(AUTH_KEY);
}

export function isSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}