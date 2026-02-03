import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    toast.success(`Switched to ${newTheme} mode`, {
      icon: newTheme === "light" ? "☀️" : "🌙",
      style: {
        background: newTheme === "dark" ? "#323232" : "#ffffff",
        color: newTheme === "dark" ? "#ececec" : "#1f1f1f",
      },
    });
    
  }

  const providerValues = { theme, toggleTheme };

  return <ThemeContext value={providerValues}>{children}</ThemeContext>;
}
