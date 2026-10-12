import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Locale = "fa" | "en";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "fa",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === "fa" ? "en" : "fa" })),
    }),
    {
      name: "dadefa-locale-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
