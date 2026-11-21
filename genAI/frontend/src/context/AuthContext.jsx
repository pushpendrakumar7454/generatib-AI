import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const response = await api.post("/auth/refresh");
      setAccessToken(response.data.accessToken);
      setUser(response.data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally { setLoading(false); }
  }

  useEffect(() => { loadUser(); }, []);

  async function login(values) {
    const response = await api.post("/auth/login", values);
    setAccessToken(response.data.accessToken);
    setUser(response.data.user);
    return response.data;
  }

  async function register(values) {
    const response = await api.post("/auth/register", values);
    setAccessToken(response.data.accessToken);
    setUser(response.data.user);
    return response.data;
  }

  async function logout() {
    try { await api.post("/auth/logout"); }
    finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
