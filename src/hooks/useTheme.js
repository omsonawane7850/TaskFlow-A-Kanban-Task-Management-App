import { useEffect, useState } from "react";

const THEME_KEY = "taskflow-theme";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // ignore storage errors
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((previous) => (previous === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

export default useTheme;
