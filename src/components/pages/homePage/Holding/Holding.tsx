import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/m";
import {
  Merge,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Activity,
  Sparkles,
} from "lucide-react";

import LandingContainer from "@/components/UI/LandingContainer";
import ProductLogo from "@/components/UI/ProductLogo";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const text_reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease },
};

const product_configs = [
  {
    key: "master",
    color: "#4E148C",
    title_key: "holding.products.master.title",
    subtitle_key: "holding.products.master.subtitle",
    badge_key: "holding.products.master.badge",
    summary_key: "holding.products.master.summary",
    point_keys: [
      "holding.products.master.points.point_1",
      "holding.products.master.points.point_2",
      "holding.products.master.points.point_3",
    ],
  },
  {
    key: "formula",
    color: "#654597",
    title_key: "holding.products.formula.title",
    subtitle_key: "holding.products.formula.subtitle",
    badge_key: "holding.products.formula.badge",
    summary_key: "holding.products.formula.summary",
    point_keys: [
      "holding.products.formula.points.point_1",
      "holding.products.formula.points.point_2",
      "holding.products.formula.points.point_3",
    ],
  },
  {
    key: "cube",
    color: "#0468FA",
    title_key: "holding.products.cube.title",
    subtitle_key: "holding.products.cube.subtitle",
    badge_key: "holding.products.cube.badge",
    summary_key: "holding.products.cube.summary",
    point_keys: [
      "holding.products.cube.points.point_1",
      "holding.products.cube.points.point_2",
      "holding.products.cube.points.point_3",
    ],
  },
  {
    key: "accounting",
    color: "#D96E7D",
    title_key: "holding.products.accounting.title",
    subtitle_key: "holding.products.accounting.subtitle",
    badge_key: "holding.products.accounting.badge",
    summary_key: "holding.products.accounting.summary",
    point_keys: [
      "holding.products.accounting.points.point_1",
      "holding.products.accounting.points.point_2",
      "holding.products.accounting.points.point_3",
    ],
  },
] as const;

const principle_configs = [
  {
    num_key: "holding.principles.p1.num",
    title_key: "holding.principles.p1.title",
    highlight_key: "holding.principles.p1.highlight",
    desc_key: "holding.principles.p1.desc",
    color: "#4E148C",
    icon: Merge,
  },
  {
    num_key: "holding.principles.p2.num",
    title_key: "holding.principles.p2.title",
    highlight_key: "holding.principles.p2.highlight",
    desc_key: "holding.principles.p2.desc",
    color: "#0468FA",
    icon: Zap,
  },
  {
    num_key: "holding.principles.p3.num",
    title_key: "holding.principles.p3.title",
    highlight_key: "holding.principles.p3.highlight",
    desc_key: "holding.principles.p3.desc",
    color: "#D96E7D",
    icon: ShieldCheck,
  },
] as const;

export default function Holding() {
  const { t } = useTranslation();
  const [active_key, set_active_key] = useState("master");
  const [is_paused, set_is_paused] = useState(false);

  useEffect(() => {
    if (is_paused) return;
    const interval = setInterval(() => {
      set_active_key((prev) => {
        const current_idx = product_configs.findIndex((p) => p.key === prev);
        const next_idx = (current_idx + 1) % product_configs.length;
        return product_configs[next_idx].key;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [is_paused]);

  const products = product_configs.map((p) => ({
    key: p.key,
    color: p.color,
    title: t(p.title_key),
    subtitle: t(p.subtitle_key),
    badge: t(p.badge_key),
    summary: t(p.summary_key),
    points: p.point_keys.map((pk) => t(pk)),
  }));

  const selected_product =
    products.find((p) => p.key === active_key) || products[0];

  const principles = principle_configs.map((pr) => ({
    num: t(pr.num_key),
    title: t(pr.title_key),
    highlight: t(pr.highlight_key),
    desc: t(pr.desc_key),
    color: pr.color,
    icon: pr.icon,
  }));

  return (
    <section
      id="about"
      onMouseEnter={() => set_is_paused(true)}
      onMouseLeave={() => set_is_paused(false)}
      className="relative overflow-hidden text-text-main">
      <HoldingAtmosphere activeColor={selected_product.color} />

      <div className="relative z-[2] py-[110px] max-[1050px]:py-[90px] max-[700px]:py-[70px]">
        <LandingContainer>
          <motion.div
            {...text_reveal}
            className="relative z-[5] mb-[40px] flex items-center justify-between border-b border-border-light pb-[18px]">
            <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
              <span className="font-bold font-num text-product-accounting">
                {t("holding.num")}
              </span>
              <span className="h-px w-[32px] bg-border-prominent" />
              <span>{t("holding.kicker")}</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-text-dim max-[700px]:hidden">
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              {t("holding.suite_subtitle")}
            </div>
          </motion.div>

          <div className="grid grid-cols-[0.95fr_1.05fr] items-stretch gap-[32px] max-[1050px]:grid-cols-1">
            <motion.div
              {...text_reveal}
              className="relative z-[5] flex flex-col justify-between">
              <div>
                <div className="mb-[18px] inline-flex items-center gap-[8px] rounded-full border border-border-light bg-app-surface px-[12px] py-[6px] shadow-sm backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#0468FA]" />
                  <span className="text-[12px] text-text-muted">
                    {t("holding.badge")}
                  </span>
                </div>

                <h2 className="m-0 text-[clamp(32px,3.8vw,52px)] font-light leading-[1.25] tracking-[-0.03em] text-text-main">
                  {t("holding.headline_part1")} <br />
                  <strong className="font-black">
                    {t("holding.headline_strong")}
                  </strong>
                </h2>

                <div
                  className="mt-[18px] border-r-2 rtl:border-r-2 rtl:border-l-0 rtl:pr-[16px] rtl:pl-0 ltr:border-l-2 ltr:border-r-0 ltr:pl-[16px] ltr:pr-0 transition-colors duration-500"
                  style={{ borderColor: selected_product.color }}>
                  <p className="m-0 text-[14px] leading-[2] text-text-muted">
                    {t("holding.description")}
                  </p>
                </div>
              </div>

              <div className="mt-[28px] flex flex-col gap-[10px]">
                {products.map((item) => {
                  const is_active = item.key === active_key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => set_active_key(item.key)}
                      className={`group relative flex min-h-[66px] w-full items-center overflow-hidden rounded-[16px] border px-[16px] py-[12px] text-start transition-all duration-300 ${
                        is_active
                          ? "border-border-prominent bg-app-surface shadow-lg"
                          : "border-border-light bg-app-surface-subtle hover:border-border-prominent/40 hover:bg-app-surface"
                      }`}>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-[12px]">
                          <div
                            className="product-logo-frame h-9 w-9 shrink-0 transition-all duration-300"
                            data-product={item.key}>
                            <ProductLogo
                              product={item.key}
                              alt={item.title}
                              className="h-7 w-7"
                            />
                          </div>
                          <div>
                            <div className="text-[15px] font-bold text-text-main">
                              {item.title}
                            </div>
                            <div className="text-[12px] text-text-dim line-clamp-1 max-[500px]:hidden">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-[8px] px-[9px] py-[3.5px] text-[11px] font-medium transition-colors ${
                            is_active
                              ? "border border-border-light bg-app-surface-subtle text-text-main"
                              : "bg-app-surface text-text-dim"
                          }`}>
                          {item.badge}
                        </span>
                      </div>

                      {is_active && !is_paused && (
                        <motion.div
                          key={`progress-${item.key}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 6, ease: "linear" }}
                          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left opacity-40 rtl:origin-right"
                          style={{ backgroundColor: item.color }}
                        />
                      )}

                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-1/2 h-[55%] w-[3.5px] -translate-y-1/2 rounded-full transition-opacity duration-300 rtl:right-0 ltr:left-0 ${
                          is_active ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ backgroundColor: item.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="relative min-w-0 min-h-[480px] max-[640px]:min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected_product.key}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-border-light bg-app-surface/95 p-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-2xl max-[640px]:p-[20px]">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.15, 0.22, 0.15],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-[60px] -top-[60px] h-[280px] w-[280px] rounded-full blur-[70px]"
                    style={{ backgroundColor: selected_product.color }}
                  />

                  <div>
                    <div className="relative z-10 flex items-center justify-between border-b border-border-light pb-[18px]">
                      <div className="flex items-center gap-[12px]">
                        <div
                          className="product-logo-frame h-8 w-8"
                          data-product={selected_product.key}>
                          <ProductLogo
                            product={selected_product.key}
                            alt={selected_product.title}
                            className="h-5 w-5"
                          />
                        </div>
                        <span className="text-[18px] font-bold text-text-main">
                          {selected_product.title}
                        </span>
                      </div>
                      <span className="rounded-full border border-border-light bg-app-surface-subtle px-[10px] py-[3px] text-[11px] font-medium text-text-muted">
                        {selected_product.badge}
                      </span>
                    </div>

                    <div className="relative z-10 mt-[24px]">
                      <h3 className="text-[20px] font-bold text-text-main">
                        {selected_product.subtitle}
                      </h3>
                      <p className="mt-[12px] min-h-[58px] text-[14px] leading-[2.1] text-text-muted max-[640px]:min-h-[70px]">
                        {selected_product.summary}
                      </p>
                    </div>

                    <div className="relative z-10 mt-[24px] flex flex-col gap-[10px]">
                      <div className="flex items-center justify-between text-[12px] font-bold text-text-dim">
                        <span>{t("holding.key_benefits_title")}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </div>

                      {selected_product.points.map((pt, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                          className="group flex min-h-[46px] items-center gap-[12px] rounded-[14px] border border-border-light bg-app-surface-subtle px-[14px] py-[10px] transition-colors hover:border-border-prominent/40 hover:bg-app-surface">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                            style={{ color: selected_product.color }}
                          />
                          <span className="text-[13px] font-medium text-text-main">
                            {pt}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-[28px] flex items-center justify-between border-t border-border-light pt-[18px]">
                    <span className="text-[12px] text-text-muted">
                      {t("holding.interoperability_note")}
                    </span>
                    <span
                      className="text-[12px] font-bold transition-colors"
                      style={{ color: selected_product.color }}>
                      {t("holding.seamless_badge")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div className="mt-[60px] grid grid-cols-3 overflow-hidden rounded-[20px] border border-border-light bg-app-surface-subtle backdrop-blur-xl max-[800px]:grid-cols-1">
            {principles.map((pr, idx) => {
              const Icon = pr.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between p-[26px] transition-colors duration-300 hover:bg-app-surface ${
                    idx !== 0
                      ? "border-r border-border-light max-[800px]:border-r-0 max-[800px]:border-t rtl:border-r ltr:border-l ltr:border-r-0"
                      : ""
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-text-dim">
                      {pr.num}
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${pr.color}18`,
                        color: pr.color,
                      }}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-[24px]">
                    <div className="flex items-baseline gap-[8px]">
                      <span className="text-[18px] font-bold text-text-main">
                        {pr.title}
                      </span>
                      <span className="text-[13px] font-medium text-text-muted">
                        {pr.highlight}
                      </span>
                    </div>
                    <p className="mt-[8px] text-[13px] leading-[1.9] text-text-muted">
                      {pr.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </LandingContainer>
      </div>
    </section>
  );
}

function HoldingAtmosphere({ activeColor }: { activeColor: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          background: `radial-gradient(600px 600px at 85% 15%, ${activeColor}15, transparent 75%)`,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      />
      <div className="absolute bottom-[10%] -left-[150px] h-[500px] w-[500px] rounded-full bg-brand-cube/[0.04] blur-[160px]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
        }}
      />
    </div>
  );
}
