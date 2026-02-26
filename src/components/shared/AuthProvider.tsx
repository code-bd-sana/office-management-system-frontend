"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// ── Types ──────────────────────────────────────────────────────────────

export interface AuthUser {
  _id: string;
  name: string;
  employeeId: string;
  phoneNumber: string;
  email: string;
  secondaryEmail?: string;
  role: string;
  department: string;
  designation: string;
  isBlocked: boolean;
  employmentStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextValue {
  /** The currently authenticated user, or null */
  user: AuthUser | null;
  /** The JWT / Paseto access token, or null */
  token: string | null;
  /** Whether authentication state has been hydrated from storage */
  ready: boolean;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Persist token + user after a successful login */
  login: (token: string, user: AuthUser) => void;
  /** Clear auth state and storage */
  logout: () => void;
}

// ── Context ────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser) as AuthUser);
    } catch {
      // Corrupted storage — clear it
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      ready,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
