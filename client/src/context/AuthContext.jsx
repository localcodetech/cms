// src/context/AuthContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { logoutRequest } from "../api/postApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // payload is { user, token } from the login response
  const login = useCallback(({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try { await logoutRequest(); } catch { /* token may already be expired */ }
    clearSession();
  }, [clearSession]);

  // http.js fires this on a 401; ProtectedRoute then redirects to /login
  useEffect(() => {
    window.addEventListener("auth:expired", clearSession);
    return () => window.removeEventListener("auth:expired", clearSession);
  }, [clearSession]);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);