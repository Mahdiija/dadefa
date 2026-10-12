import { useLocaleStore } from "@/store/Lang";

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLocaleStore();

  return (
    <button
      onClick={toggleLocale}
      type="button"
      className="inline-flex items-center justify-center rounded-button border border-border-light bg-app-surface/60 px-3 py-1.5 text-xs font-medium text-text-main backdrop-blur-md transition-colors hover:border-border-prominent">
      <span className={locale === "fa" ? "font-latin uppercase" : ""}>
        {locale === "fa" ? "EN" : "فا"}
      </span>
    </button>
  );
}
