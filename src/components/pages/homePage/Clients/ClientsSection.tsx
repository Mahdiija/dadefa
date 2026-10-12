import { useRef, useEffect } from "react";
import { useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import * as motion from "framer-motion/m";
import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

import { partnersLogo } from "./Partners";
import {
  DadefaLogoType,
  EnglishDadefaLogoType,
  DadefaLogoSymbol,
} from "@/components/layouts/header/components/Logo";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease },
};

function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className = "",
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motion_value = useMotionValue(direction === "down" ? value : 0);
  const spring_value = useSpring(motion_value, {
    damping: 60,
    stiffness: 100,
  });
  const is_in_view = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (is_in_view) {
      const timer = setTimeout(() => {
        motion_value.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motion_value, is_in_view, delay, value, direction]);

  useEffect(
    () =>
      spring_value.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Math.round(latest),
          );
        }
      }),
    [spring_value],
  );

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums tracking-normal font-num ${className}`}
    />
  );
}

function LogoSlot({ src, accent = false }: { src: string; accent?: boolean }) {
  return (
    <div
      className={`
        group relative h-[76px] w-[200px] shrink-0 overflow-hidden rounded-[14px] border backdrop-blur-md transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1 max-[700px]:h-[64px] max-[700px]:w-[150px]
        ${
          accent
            ? "border-border-prominent bg-app-surface hover:border-brand-blue/40 hover:shadow-[0_12px_40px_rgba(var(--color-brand-blue-rgb),0.15)]"
            : "border-border-light bg-app-surface-subtle hover:border-border-prominent"
        }
      `}>
      <img
        src={src}
        alt="Partner Logo"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  );
}

function InfiniteTrack({
  items,
  direction = "normal",
  speed = 28,
}: {
  items: string[];
  direction?: "normal" | "reverse";
  speed?: number;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  const initial_x = direction === "normal" ? "0%" : "-50%";
  const animate_x = direction === "normal" ? "-50%" : "0%";

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-[14px] pr-[14px]"
        initial={{ x: initial_x }}
        animate={{ x: animate_x }}
        whileHover={{ scale: 1.015 }}
        transition={{
          x: { repeat: Infinity, ease: "linear", duration: speed },
          scale: { duration: 0.4, ease: "easeOut" },
        }}>
        {repeated.map((logoSrc, i) => (
          <LogoSlot key={`${logoSrc}-${i}`} src={logoSrc} />
        ))}
      </motion.div>
    </div>
  );
}

function DadefaCenterArtifact() {
  const { locale } = useTranslation();
  const LogoType = locale === "en" ? EnglishDadefaLogoType : DadefaLogoType;

  const card_ref = useRef<HTMLDivElement>(null);
  const raw_x = useMotionValue(0);
  const raw_y = useMotionValue(0);

  const rotate_x = useSpring(useTransform(raw_y, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 22,
  });
  const rotate_y = useSpring(useTransform(raw_x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 220,
    damping: 22,
  });

  const spotlight_x = useTransform(raw_x, [-0.5, 0.5], [0, 100]);
  const spotlight_y = useTransform(raw_y, [-0.5, 0.5], [0, 100]);

  const handle_mouse_move = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = card_ref.current?.getBoundingClientRect();
    if (!rect) return;
    raw_x.set((e.clientX - rect.left) / rect.width - 0.5);
    raw_y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handle_mouse_leave = () => {
    raw_x.set(0);
    raw_y.set(0);
  };

  return (
    <div className="relative z-30 flex items-center justify-center [perspective:1200px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-brand-blue/20 blur-[64px]" />

      <motion.div
        ref={card_ref}
        onMouseMove={handle_mouse_move}
        onMouseLeave={handle_mouse_leave}
        style={{
          rotateX: rotate_x,
          rotateY: rotate_y,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.035, y: -4 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[26px] p-[1.5px] shadow-[0_28px_80px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(var(--color-brand-blue-rgb),0.15)] backdrop-blur-3xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(var(--color-brand-blue-rgb),0.9)_340deg,transparent_360deg)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/20 via-white/5 to-white/10" />

        <div className="relative flex items-center gap-[18px] rounded-[24.5px] bg-app-bg/90 px-[26px] py-[16px] backdrop-blur-2xl ring-1 ring-white/10 [direction:rtl] max-[700px]:gap-[12px] max-[700px]:px-[18px] max-[700px]:py-[12px]">
          <motion.div
            style={{
              background: `radial-gradient(180px circle at ${spotlight_x.get()}% ${spotlight_y.get()}%, rgba(var(--color-brand-blue-rgb), 0.25), transparent 70%)`,
            }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          <div className="relative flex shrink-0 items-center justify-center [transform:translateZ(24px)]">
            <span className="absolute size-14 rounded-2xl bg-brand-blue/25 blur-md transition-transform duration-500 group-hover:scale-125 max-[700px]:size-10" />

            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute size-12 rounded-2xl border border-brand-blue/60"
            />

            <div className="relative flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-brand-blue/25 via-app-surface to-brand-blue/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500 group-hover:border-brand-blue/60 group-hover:shadow-[0_0_25px_rgba(var(--color-brand-blue-rgb),0.5)] max-[700px]:size-9">
              <DadefaLogoSymbol
                className="size-6 text-product-blue transition-transform duration-500 group-hover:scale-110 max-[700px]:size-4"
                fill="currentColor"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-[4px] [transform:translateZ(18px)]">
            <div className="relative flex items-center">
              <LogoType className="h-6 w-auto text-text-main transition-transform duration-300 group-hover:scale-[1.02] max-[700px]:h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Clients() {
  const { t } = useTranslation();

  const section_ref = useRef<HTMLElement>(null);
  const mouse_x = useMotionValue(0);
  const mouse_y = useMotionValue(0);

  const spring_x = useSpring(mouse_x, { stiffness: 60, damping: 20 });
  const spring_y = useSpring(mouse_y, { stiffness: 60, damping: 20 });

  const row1_parallax = useTransform(spring_x, [-0.5, 0.5], [16, -16]);
  const row2_parallax = useTransform(spring_x, [-0.5, 0.5], [-24, 24]);
  const row3_parallax = useTransform(spring_x, [-0.5, 0.5], [12, -12]);

  const row1_float = useTransform(spring_y, [-0.5, 0.5], [6, -6]);
  const row3_float = useTransform(spring_y, [-0.5, 0.5], [-6, 6]);

  const handle_mouse_move = (e: React.MouseEvent) => {
    const rect = section_ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouse_x.set((e.clientX - rect.left) / rect.width - 0.5);
    mouse_y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const logos_row_1 = partnersLogo.slice(0, 5);
  const logos_row_2 = partnersLogo.slice(5, 10);
  const logos_row_3 = partnersLogo.slice(10, 15);

  const marquee_keywords = [
    "RETAIL TECH",
    "ENTERPRISE",
    "SCALABILITY",
    "INTELLIGENCE",
    "INNOVATION",
    "ANALYTICS",
  ];

  return (
    <section
      ref={section_ref}
      id="clients"
      onMouseMove={handle_mouse_move}
      className="relative overflow-hidden py-[130px] text-text-main max-[1050px]:py-[100px] max-[700px]:py-[80px]">
      <ClientsAtmosphere />

      <LandingContainer className="relative z-[2]">
        <motion.div
          {...reveal}
          className="mb-[70px] flex items-end justify-between border-b border-border-light pb-[28px] max-[1050px]:flex-col max-[1050px]:items-start max-[1050px]:gap-[28px]">
          <div>
            <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
              <span className="font-bold font-num text-brand-blue">
                {t("clients_section.badge_number")}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
                className="h-px w-[48px] origin-left bg-border-prominent"
              />
              <span>{t("clients_section.badge_title")}</span>
            </div>

            <h2 className="mt-[18px] text-[clamp(38px,5vw,64px)] font-light leading-[1.15] tracking-[-0.035em] text-text-main">
              {t("clients_section.heading_light")}{" "}
              <em className="font-brand-latin not-italic text-brand-blue">✦</em>
              <br />
              <strong className="bg-gradient-to-l from-text-main via-text-main to-text-dim bg-clip-text font-black text-transparent">
                {t("clients_section.heading_bold")}
              </strong>
            </h2>
          </div>

          <div className="flex max-w-[420px] flex-col items-start gap-[14px] max-[1050px]:max-w-full">
            <div className="flex items-center gap-[12px]">
              <div className="flex items-baseline gap-[2px] text-[clamp(32px,3.5vw,46px)] font-light leading-none text-text-main">
                <NumberTicker value={partnersLogo.length} delay={0.2} />
                <span className="font-sans font-medium text-brand-blue">+</span>
              </div>
              <span className="h-[18px] w-px bg-border-prominent" />
              <span className="text-[13px] font-medium tracking-wide text-text-dim">
                {t("clients_section.counter_label")}
              </span>
            </div>

            <p className="m-0 text-[14px] leading-[2.1] text-text-muted">
              {t("clients_section.description")}
            </p>
          </div>
        </motion.div>
      </LandingContainer>

      <div className="relative flex flex-col gap-[18px] [direction:ltr] [mask-image:linear-gradient(90deg,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_10%,#000_90%,transparent_100%)]">
        <motion.div style={{ x: row1_parallax, y: row1_float }}>
          <InfiniteTrack items={logos_row_1} direction="normal" speed={34} />
        </motion.div>

        <div className="relative flex items-center justify-center py-[14px]">
          <motion.div
            style={{ x: row2_parallax }}
            className="w-full overflow-hidden opacity-35 blur-[1.5px] transition-all duration-500 hover:opacity-65 hover:blur-0">
            <InfiniteTrack items={logos_row_2} direction="reverse" speed={28} />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <DadefaCenterArtifact />
            </div>
          </div>
        </div>

        <motion.div style={{ x: row3_parallax, y: row3_float }}>
          <InfiniteTrack items={logos_row_3} direction="normal" speed={36} />
        </motion.div>
      </div>

      <div className="relative mt-[60px] overflow-hidden border-t border-border-light/60 pt-[24px] [direction:ltr] [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex shrink-0 items-center gap-[36px] whitespace-nowrap text-[11px] font-semibold tracking-[0.3em] text-text-dim/60 select-none">
          {[
            ...marquee_keywords,
            ...marquee_keywords,
            ...marquee_keywords,
            ...marquee_keywords,
          ].map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="flex items-center gap-[36px]">
              <span>{word}</span>
              <span className="size-1 rounded-full bg-brand-blue/40" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ClientsAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/[0.07] blur-[140px]" />

      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[15%] h-[300px] w-[300px] rounded-full bg-brand-blue/10 blur-[100px]"
      />

      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />
    </div>
  );
}
