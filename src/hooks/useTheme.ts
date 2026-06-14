import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "burgundy" | "midnight" | "sepia";

const THEMES: Theme[] = ["burgundy", "midnight", "sepia"];

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("dd:theme", "burgundy");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(`theme-${t}`));
    root.classList.add(`theme-${theme}`);
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme, themes: THEMES };
}
