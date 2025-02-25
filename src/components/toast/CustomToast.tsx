"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const CustomToaster = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  return (
    <Toaster
      toastOptions={{
        style: {
          background: theme === "dark" ? "#1E1E1E" : "#FFF",
          color: theme === "dark" ? "#FFF" : "#000",
        },
        success: {
          style: {
            background: theme === "dark" ? "#339860aa" : "#D1FAE5",
            color: theme === "dark" ? "#D1FAE5" : "#065F46",
          },
        },
        error: {
          style: {
            background:
              theme === "dark" ? "#983533aa" : "#rgb(248 113 113 / 0.3)",
            color: theme === "dark" ? "#FEFEFE" : "#FFF",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
