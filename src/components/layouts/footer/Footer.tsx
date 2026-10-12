import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

const product_link_configs = [
  {
    key: "master",
    label_key: "footer_section.products.master",
    href: "/#products",
    color: "var(--color-brand-master)",
  },
  {
    key: "formula",
    label_key: "footer_section.products.formula",
    href: "/#products",
    color: "var(--color-brand-formula)",
  },
  {
    key: "cube",
    label_key: "footer_section.products.cube",
    href: "/#products",
    color: "var(--color-brand-cube)",
  },
  {
    key: "accounting",
    label_key: "footer_section.products.accounting",
    href: "/#products",
    color: "var(--color-brand-accounting)",
  },
] as const;

const nav_link_configs = [
  {
    key: "story",
    label_key: "footer_section.navigation.story",
    href: "/#data-story",
  },
  {
    key: "products",
    label_key: "nav.products",
    href: "/#products",
  },
  {
    key: "clients",
    label_key: "footer_section.navigation.clients",
    href: "/#clients",
  },
  {
    key: "retail",
    label_key: "footer_section.navigation.retail",
    href: "/#retail",
  },
  {
    key: "contact",
    label_key: "footer_section.navigation.contact",
    href: "/#contact",
  },
  {
    key: "journal",
    label_key: "nav.journal",
    href: "/blog",
  },
  // {
  //   key: "holding",
  //   label_key: "footer_section.navigation.holding",
  //   href: "#about",
  // },
  // {
  //   key: "technical",
  //   label_key: "footer_section.navigation.technical",
  //   href: "#technical",
  // },
  // {
  //   key: "vision",
  //   label_key: "footer_section.navigation.vision",
  //   href: "#vision",
  // },
] as const;

export default function Footer() {
  const { t } = useTranslation();

  const product_links = product_link_configs.map((item) => ({
    key: item.key,
    label: t(item.label_key),
    href: item.href,
    color: item.color,
  }));

  const quick_links = nav_link_configs.map((item) => ({
    key: item.key,
    label: t(item.label_key),
    href: item.href,
  }));

  return (
    <footer className="relative overflow-hidden border-t border-border-light pt-[80px] pb-[36px] text-text-main">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cube to-transparent opacity-40"
      />

      <LandingContainer className="relative z-10">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-[48px] border-b border-border-light pb-[60px] max-[1050px]:grid-cols-2 max-[1050px]:gap-[40px] max-[640px]:grid-cols-1 max-[640px]:gap-[36px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[10px]">
              <span className="h-[10px] w-[10px] rounded-full bg-brand-cube shadow-[0_0_12px_var(--color-brand-cube-dim)]" />
              <strong className="text-[26px] font-black tracking-tight text-text-main">
                {t("footer_section.brand_name")}
              </strong>
            </div>

            <p className="mt-[14px] text-[13px] font-medium text-text-dim">
              {t("footer_section.brand_motto")}
            </p>

            <p className="mt-[16px] max-w-[280px] text-[12px] leading-[2.1] text-text-muted">
              {t("footer_section.brand_description")}
            </p>
          </div>

          <div className="flex flex-col gap-[14px]">
            <span className="text-[12px] font-bold uppercase tracking-wider text-text-dim">
              {t("footer_section.column_products_title")}
            </span>

            <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
              {product_links.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-[8px] text-[13px] text-text-muted transition-all duration-200 hover:text-text-main">
                    <span
                      className="h-[5px] w-[5px] rounded-full opacity-60 transition-transform duration-200 group-hover:scale-150 group-hover:opacity-100"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[14px]">
            <span className="text-[12px] font-bold uppercase tracking-wider text-text-dim">
              {t("footer_section.column_navigation_title")}
            </span>

            <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
              {quick_links.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-[13px] text-text-muted transition-colors duration-200 hover:text-text-main">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between max-[1050px]:justify-start max-[1050px]:gap-[24px]">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-text-dim">
                {t("footer_section.column_transformation_title")}
              </span>
              <p className="mt-[12px] text-[13px] leading-[1.9] text-text-muted">
                {t("footer_section.slogan_part1")} <br />
                {t("footer_section.slogan_part2")}
              </p>
            </div>

            <div className="rounded-[14px] border border-border-light bg-app-surface-subtle p-[16px] backdrop-blur-md">
              <span className="text-[11px] text-text-dim">
                {t("footer_section.direct_contact_label")}
              </span>
              <a
                href="mailto:info@dadehfa.ir"
                className="mt-[4px] block font-brand-latin text-[13px] font-medium text-product-cube hover:underline">
                info@dadehfa.ir
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[32px] flex items-center justify-between gap-[16px] text-[12px] text-text-dim max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
          <span>{t("footer_section.copyright_rights")}</span>
          <span className="font-brand-latin text-[11px] tracking-wider text-text-muted">
            {t("footer_section.copyright_latin")}
          </span>
        </div>
      </LandingContainer>
    </footer>
  );
}
