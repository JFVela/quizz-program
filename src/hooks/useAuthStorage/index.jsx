// src/hooks/useAuthStorage.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Función para obtener el usuario desde localStorage
function getUserFromStorage() {
  const usuario = localStorage.getItem("usuario");
  const token = localStorage.getItem("token");
  return usuario && token ? { usuario, token } : null;
}

export function useAuthStorage() {
  const [user, setUser] = useState(() => getUserFromStorage());
  const navigate = useNavigate();

  // Sincroniza el estado con localStorage (opcional)
  useEffect(() => {
    const storedUser = getUserFromStorage();
    setUser(storedUser);
  }, []);

  // Función para realizar el login y guardar los datos en localStorage
  const login = ({ usuario, token }) => {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("token", token);
    setUser({ usuario, token });
  };

  // Función para cerrar sesión: remueve el token y redirige a login
  const logout = () => {
    localStorage.removeItem("token");
    // Si deseas limpiar también el nombre del usuario, descomenta la siguiente línea:
    // localStorage.removeItem("usuario");
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = !!user;

  return { user, login, logout, isLoggedIn };
}
