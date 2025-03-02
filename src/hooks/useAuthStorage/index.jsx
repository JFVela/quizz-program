import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MensajeSweet from "../../components/MensajeSweet";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    return storedUser && token ? { usuario: storedUser, token } : null;
  });

  const login = ({ usuario, token }) => {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("token", token);
    setUser({ usuario, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    MensajeSweet({ ico: "3", tit: "Sesión cerrada!", tie: 4 });
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
