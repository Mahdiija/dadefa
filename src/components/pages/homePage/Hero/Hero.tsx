import { useEffect, useState, useRef } from "react";
import {
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import * as motion from "framer-motion/m";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "@/locale/useTranslation";
import LandingButton from "@/components/UI/LandingButton";
import ProductLogo from "@/components/UI/ProductLogo";
import CircularPattern from "../Holding/CircularPatten";
import { brand_configs } from "./hero.constants";
import ParallaxCardSlider, { type SliderBrandItem } from "./ParallaxCardSlider";

export function Hero() {
  const { t } = useTranslation();
  const [current_idx, setCurrentIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hero_section_ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % brand_configs.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [reduced, paused]);

  const { scrollYProgress } = useScroll({
    target: hero_section_ref,
    offset: ["start start", "end start"],
  });

  const scroll_y_spring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const parallax_stage_y = useTransform(
    scroll_y_spring,
    [0, 1],
    reduced ? [0, 0] : [0, 36],
  );

  const scroll_indicator_opacity = useTransform(
    scroll_y_spring,
    [0, 0.2],
    [1, 0],
  );

  const brand_slides: SliderBrandItem[] = brand_configs.map((config) => ({
    id: config.id,
    key: config.key,
    phase: t(config.phase_key),
    color: config.color,
    rgb: config.rgb,
    themeClass: "",
    accentGlow: config.accentGlow,
    badge: t(config.badge_key),
    title: t(config.title_key),
    subtitle: t(config.subtitle_key),
    tagline: t(config.tagline_key),
    description: t(config.description_key),
  }));

  const active_item = brand_slides[current_idx];

  return (
    <section
      ref={hero_section_ref}
      id="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-app-bg py-24 font-body text-text-main isolate [transform:translateZ(0)] transition-colors duration-700 selection:bg-[#4e148c] selection:text-white max-lg:pt-32">

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          background: `radial-gradient(1300px 750px at 50% 20%, rgba(${active_item.rgb}, 0.22), rgba(${active_item.rgb}, 0) 72%)`,
        }}
      />

      <motion.div
        style={{
          y: parallax_stage_y,
          WebkitBackfaceVisibility: "hidden",
        }}
        className="relative z-10 mx-auto w-full max-w-[1360px] px-6 lg:px-12 will-change-transform">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.15fr]">
          <div className="relative z-20 text-start">
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                key={`badge-${active_item.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-border-prominent bg-app-surface/75 px-4 py-1.5 text-xs font-semibold text-text-muted backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]">
                <div
                  className="product-logo-frame flex h-5 w-5 items-center justify-center"
                  data-product={active_item.id}>
                  <ProductLogo
                    product={active_item.id}
                    alt={active_item.title}
                    className="h-4 w-4"
                  />
                </div>
                <span className="text-[12px] font-medium text-text-muted">
                  {active_item.badge}
                </span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-6 font-heading text-4xl font-black leading-[1.12] tracking-tight text-text-main sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${active_item.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-lg font-bold">
                  <span
                    className="font-heading text-xl transition-colors duration-500 sm:text-2xl"
                    style={{ color: active_item.color }}>
                    {active_item.title}
                  </span>
                  <span className="font-body text-sm font-normal text-text-dim sm:text-base">
                    | {active_item.subtitle}
                  </span>
                </div>
                <p className="max-w-xl font-body text-base font-light leading-relaxed text-text-muted">
                  {active_item.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LandingButton
                href="#contact"
                size="lg"
                variant="primary"
                style={{
                  backgroundColor: `color-mix(in srgb, ${active_item.color} 42%, transparent)`,
                  color: "#ffffff",
                  borderColor: active_item.color,
                }}>
                <span>{t("hero.cta_primary")}</span>
                <ChevronRight size={15} className="rtl:rotate-180" />
              </LandingButton>

              <LandingButton href="#products" size="lg" variant="glass">
                {t("hero.cta_view_products")}
              </LandingButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-2" role="tablist">
              {brand_slides.map((item, idx) => {
                const selected = current_idx === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setCurrentIdx(idx)}
                    className="cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300"
                    style={{
                      borderColor: selected
                        ? item.color
                        : "var(--border-light)",
                      color: selected ? item.color : "var(--text-muted)",
                      background: selected
                        ? `rgba(${item.rgb}, 0.1)`
                        : "transparent",
                    }}>
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex min-h-[500px] items-center justify-center lg:min-h-[580px]">
            <div className="pointer-events-none absolute -inset-10 flex items-center justify-center opacity-20 [mask-image:radial-gradient(circle_at_center,black_35%,rgba(0,0,0,0)_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_35%,rgba(0,0,0,0)_75%)] dark:opacity-30">
              <CircularPattern
                className="size-[580px] pointer-events-auto transition-colors duration-1000"
                color={active_item.color}
                intensity={0.9}
              />
            </div>

            <ParallaxCardSlider
              items={brand_slides}
              activeIdx={current_idx}
              onSelect={setCurrentIdx}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: scroll_indicator_opacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim font-mono text-[10px] tracking-widest uppercase">
        <span className="h-6 w-[1px] bg-gradient-to-b from-text-dim to-transparent" />
      </motion.div>
    </section>
  );
}
