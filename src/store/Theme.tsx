import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ThemeMode = "dark" | "light";

interface ThemeStore {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  initTheme: () => void;
}

const STORAGE_KEY = "dadefa-theme-storage";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.theme === "light" || parsed?.state?.theme === "dark") {
        return parsed.state.theme;
      }
    }
  } catch (_) {}

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyThemeToDOM = (theme: ThemeMode) => {
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyThemeToDOM(next);
        set({ theme: next });
      },
      setTheme: (theme) => {
        applyThemeToDOM(theme);
        set({ theme });
      },
      initTheme: () => {
        applyThemeToDOM(get().theme);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeToDOM(state.theme);
        }
      },
    },
  ),
);
