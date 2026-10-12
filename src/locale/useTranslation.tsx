import { useEffect } from "react";
import { fa } from "./fa";
import { en } from "./en";
import { useLocaleStore } from "@/store/Lang";

const translations = { fa, en };

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof fa>;

export function useTranslation() {
  const { locale, setLocale } = useLocaleStore();

  useEffect(() => {
    const dir = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", dir);
  }, [locale]);

  const t = (path: TranslationKey): string => {
    const current_dict =
      translations[locale as keyof typeof translations] || translations.fa;
    const keys = path.split(".");

    let current: any = current_dict;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }

    return typeof current === "string" ? current : path;
  };

  return {
    t,
    locale,
    dir: locale === "fa" ? "rtl" : "ltr",
    setLocale,
  };
}
