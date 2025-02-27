"use client";

import { useState, useEffect } from "react";

const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si hay una sesión activa revisando la cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sb:token="));
    setIsAuthenticated(!!token);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    window.location.reload(); // Recargar para reflejar el cierre de sesión
  }

  return (
    <button
      className="absolute right-20 m-4 p-2 rounded-md bg-gray-200 dark:bg-orange-400/10 text-gray-800 dark:text-orange-400/80 hover:bg-gray-300 dark:hover:bg-orange-500/20 transition"
      onClick={isAuthenticated ? handleLogout : () => (window.location.href = "/autenticacion/iniciar-sesion")}
      aria-label={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    >
      {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    </button>
  );
};

export default AuthButton;
