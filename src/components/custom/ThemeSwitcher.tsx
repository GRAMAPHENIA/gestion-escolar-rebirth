"use client";

import { useEffect, useState } from "react";
import { Sun, MoonStar } from "lucide-react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      className="absolute right-0 m-4 p-2 rounded-md bg-gray-200 dark:bg-orange-400/10"
      onClick={toggleTheme}
      aria-label={`Cambiar a ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      {theme === "dark" ? (
        <MoonStar className="w-6 h-6 text-orange-400/80" />
      ) : (
        <Sun className="w-6 h-6 text-amber-700/50" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
