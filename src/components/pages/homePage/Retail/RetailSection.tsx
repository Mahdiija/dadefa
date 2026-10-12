import { useReducedMotion } from "framer-motion";
import * as motion from "framer-motion/m";
import {
  Store,
  Shirt,
  ShoppingBag,
  Sparkles,
  ShoppingCart,
  Truck,
  Zap,
  WifiOff,
} from "lucide-react";
import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const industry_configs = [
  {
    key: "chain_stores",
    icon: Store,
    accent: "#654597",
    id_key: "retail_section.industries.chain_stores.id",
    title_key: "retail_section.industries.chain_stores.title",
    desc_key: "retail_section.industries.chain_stores.desc",
    tag_key: "retail_section.industries.chain_stores.tag",
  },
  {
    key: "fashion",
    icon: Shirt,
    accent: "#d96e7d",
    id_key: "retail_section.industries.fashion.id",
    title_key: "retail_section.industries.fashion.title",
    desc_key: "retail_section.industries.fashion.desc",
    tag_key: "retail_section.industries.fashion.tag",
  },
  {
    key: "leather",
    icon: ShoppingBag,
    accent: "#ab83a1",
    id_key: "retail_section.industries.leather.id",
    title_key: "retail_section.industries.leather.title",
    desc_key: "retail_section.industries.leather.desc",
    tag_key: "retail_section.industries.leather.tag",
  },
  {
    key: "cosmetics",
    icon: Sparkles,
    accent: "#0468fa",
    id_key: "retail_section.industries.cosmetics.id",
    title_key: "retail_section.industries.cosmetics.title",
    desc_key: "retail_section.industries.cosmetics.desc",
    tag_key: "retail_section.industries.cosmetics.tag",
  },
  {
    key: "hypermarket",
    icon: ShoppingCart,
    accent: "#4e148c",
    id_key: "retail_section.industries.hypermarket.id",
    title_key: "retail_section.industries.hypermarket.title",
    desc_key: "retail_section.industries.hypermarket.desc",
    tag_key: "retail_section.industries.hypermarket.tag",
  },
  {
    key: "distribution",
    icon: Truck,
    accent: "#700353",
    id_key: "retail_section.industries.distribution.id",
    title_key: "retail_section.industries.distribution.title",
    desc_key: "retail_section.industries.distribution.desc",
    tag_key: "retail_section.industries.distribution.tag",
  },
] as const;

export default function Retail() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const industries = industry_configs.map((config) => ({
    key: config.key,
    icon: config.icon,
    accent: config.accent,
    id: t(config.id_key),
    title: t(config.title_key),
    desc: t(config.desc_key),
    tag: t(config.tag_key),
  }));

  return (
    <section
      id="retail"
      className="relative overflow-hidden py-[120px] text-text-main max-[1050px]:py-[90px] max-[700px]:py-[70px]">
      <RetailAtmosphere />

      <LandingContainer className="relative z-[2]">
        <div className="grid grid-cols-[0.88fr_1.12fr] items-start gap-[70px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[44px]">
          <StickyStoryPanel reduced={!!reduced} />

          <div className="grid grid-cols-2 gap-[16px] max-[640px]:grid-cols-1">
            {industries.map((item, index) => (
              <IndustryCard
                key={item.key}
                item={item}
                index={index}
                reduced={!!reduced}
                readyLabel={t("retail_section.status_ready")}
              />
            ))}
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

function StickyStoryPanel({ reduced }: { reduced: boolean }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease }}
      className="relative z-[5] max-[1050px]:static min-[1051px]:sticky min-[1051px]:top-[120px]">
      <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
        <span className="font-bold font-num text-product-formula">
          {t("retail_section.kicker_num")}
        </span>
        <span className="h-px w-[32px] bg-border-prominent" />
        <span>{t("retail_section.kicker_title")}</span>
      </div>

      <h2 className="mt-[16px] text-[clamp(34px,4.5vw,56px)] font-light leading-[1.2] tracking-[-0.03em] text-text-main">
        {t("retail_section.headline_part1")} <br />
        <strong className="font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-formula to-indigo-400">
          {t("retail_section.headline_strong")}
        </strong>
      </h2>

      <div className="mt-[24px] border-r-2 rtl:border-r-2 rtl:border-l-0 ltr:border-l-2 ltr:border-r-0 border-brand-formula pr-[16px] rtl:pr-[16px] rtl:pl-0 ltr:pl-[16px] ltr:pr-0">
        <p className="m-0 text-[15px] leading-[2.1] text-text-muted">
          {t("retail_section.description")}
        </p>
      </div>

      <div className="mt-[20px] grid grid-cols-2 gap-[14px] max-[540px]:grid-cols-1">
        <div className="group relative overflow-hidden rounded-[16px] border border-border-light bg-app-surface-subtle p-[18px] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="text-[22px]  font-num font-bold text-text-main">
              {t("retail_section.stat_speed_value")}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-border-light bg-app-surface text-brand-formula shadow-sm">
              <Zap size={16} strokeWidth={2.4} />
            </div>
          </div>
          <div className="mt-[6px] text-[12px]     text-text-dim">
            {t("retail_section.stat_speed_label")}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[16px] border border-border-light bg-app-surface-subtle p-[18px] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="text-[22px] font-bold text-text-main font-num ">
              {t("retail_section.stat_offline_value")}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-border-light bg-app-surface text-brand-formula shadow-sm">
              <WifiOff size={16} strokeWidth={2.4} />
            </div>
          </div>
          <div className="mt-[6px] text-[12px] text-text-dim ">
            {t("retail_section.stat_offline_label")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IndustryCard({
  item,
  index,
  reduced,
  readyLabel,
}: {
  item: {
    key: string;
    icon: React.ComponentType<{
      size?: number;
      strokeWidth?: number;
      className?: string;
    }>;
    accent: string;
    id: string;
    title: string;
    desc: string;
    tag: string;
  };
  index: number;
  reduced: boolean;
  readyLabel: string;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease }}
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.25, ease } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-border-light bg-app-surface p-[22px] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-border-prominent hover:bg-app-surface-subtle hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)]">
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-10"
        style={{ backgroundColor: item.accent }}
      />

      <div>
        <div className="flex items-center justify-between border-b border-border-light pb-[12px]">
          <div className="flex items-center gap-[10px]">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-border-light bg-app-surface-subtle text-text-main transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: `0 4px 14px ${item.accent}1f`,
                borderColor: `${item.accent}33`,
              }}>
              <Icon size={17} strokeWidth={2.3} />
            </div>
            <span className="font-mono text-[12px] font-bold text-text-dim">
              {item.id}
            </span>
          </div>

          <span className="rounded-full border border-border-light bg-app-surface-subtle px-[8px] py-[2px] text-[10px] text-text-muted">
            {item.tag}
          </span>
        </div>

        <h3 className="mt-[16px] text-[17px] font-bold text-text-main">
          {item.title}
        </h3>
        <p className="mt-[10px] text-[13px] leading-[1.9] text-text-muted">
          {item.desc}
        </p>
      </div>

      <div className="mt-[20px] pt-[12px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-dim">{readyLabel}</span>
          <span
            className="h-[6px] w-[6px] rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{
              backgroundColor: item.accent,
              boxShadow: `0 0 10px ${item.accent}`,
            }}
          />
        </div>

        <div className="relative mt-[10px] h-[2px] w-full overflow-hidden rounded-full bg-border-light/60">
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: item.accent }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function RetailAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-80px] top-[-40px] h-[520px] w-[520px] rounded-full bg-brand-formula/[0.05] blur-[140px]" />
      <div className="absolute bottom-[-80px] left-[-60px] h-[480px] w-[480px] rounded-full bg-brand-master/[0.04] blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
