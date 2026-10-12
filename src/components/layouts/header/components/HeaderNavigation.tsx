import { useTranslation, type TranslationKey } from "@/locale/useTranslation";

interface NavItem {
  key: TranslationKey;
  href: string;
}

const nav_items: NavItem[] = [
  { key: "nav.about", href: "/#data-story" },
  { key: "nav.products", href: "/#products" },
  { key: "nav.clients", href: "/#clients" },
  { key: "nav.retail", href: "/#retail" },
  { key: "nav.journal", href: "/blog" },
  // { key: "nav.vision", href: "#vision" },
];

export default function HeaderNavigation() {
  const { t } = useTranslation();
  return (
    <nav
      className="flex items-center gap-[30px] text-[13px] text-text-muted transition-colors duration-300 max-[1050px]:hidden font-body"
      aria-label="Navigation">
      {nav_items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="group relative transition-colors duration-[250ms] ease-in-out hover:text-text-main">
          {t(item.key)}
          <span className="absolute right-0 bottom-[-8px] left-0 h-px origin-center scale-x-0 bg-brand-blue transition-transform duration-[250ms] ease-in-out group-hover:scale-x-100" />
        </a>
      ))}
    </nav>
  );
}
