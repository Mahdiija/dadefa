import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import * as motion from "framer-motion/m";
import {
  ScanLine,
  ShieldCheck,
  LineChart,
  Target,
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const flow_configs = [
  {
    key: "capture",
    icon: ScanLine,
    step_key: "vision_section.steps.capture.step",
    title_key: "vision_section.steps.capture.title",
    desc_key: "vision_section.steps.capture.desc",
    color: "#0468fa",
    rgb: "4, 104, 250",
  },
  {
    key: "integrity",
    icon: ShieldCheck,
    step_key: "vision_section.steps.integrity.step",
    title_key: "vision_section.steps.integrity.title",
    desc_key: "vision_section.steps.integrity.desc",
    color: "#654597",
    rgb: "101, 69, 151",
  },
  {
    key: "insight",
    icon: LineChart,
    step_key: "vision_section.steps.insight.step",
    title_key: "vision_section.steps.insight.title",
    desc_key: "vision_section.steps.insight.desc",
    color: "#d96e7d",
    rgb: "217, 110, 125",
  },
  {
    key: "decision",
    icon: Target,
    step_key: "vision_section.steps.decision.step",
    title_key: "vision_section.steps.decision.title",
    desc_key: "vision_section.steps.decision.desc",
    color: "#4e148c",
    rgb: "78, 20, 140",
  },
] as const;

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const flow_steps = flow_configs.map((config) => ({
    key: config.key,
    icon: config.icon,
    step: t(config.step_key),
    title: t(config.title_key),
    desc: t(config.desc_key),
    color: config.color,
    rgb: config.rgb,
  }));

  return (
    <section
      ref={containerRef}
      id="vision"
      className="relative overflow-hidden py-[130px] text-text-main max-[1050px]:py-[95px] max-[700px]:py-[75px]">
      <VisionAtmosphere progress={scrollYProgress} reduced={!!reduced} />

      <LandingContainer className="relative z-[2]">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-[80px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[56px]">
          <VisionStoryStream
            progress={scrollYProgress}
            reduced={!!reduced}
            steps={flow_steps}
          />

          <OrbitalVisionCore
            progress={scrollYProgress}
            reduced={!!reduced}
            steps={flow_steps}
          />
        </div>
      </LandingContainer>
    </section>
  );
}

function VisionStoryStream({
  progress,
  reduced,
  steps,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  steps: Array<{
    key: string;
    icon: React.ComponentType<{
      size?: number;
      strokeWidth?: number;
      className?: string;
    }>;
    step: string;
    title: string;
    desc: string;
    color: string;
    rgb: string;
  }>;
}) {
  const { t } = useTranslation();

  const textY = useTransform(
    progress,
    [0.12, 0.45],
    reduced ? [0, 0] : [24, 0],
  );
  const textOpacity = useTransform(
    progress,
    [0.12, 0.38],
    reduced ? [1, 1] : [0.35, 1],
  );

  return (
    <motion.div
      style={{ y: textY, opacity: textOpacity }}
      className="relative z-[5]">
      <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
        <span className="flex  font-num  items-center gap-1.5 font-bold text-product-cube">
          {t("vision_section.kicker_num")}
        </span>
        <span className="h-px w-[32px] bg-border-prominent" />
        <span>{t("vision_section.kicker_title")}</span>
      </div>

      <h2 className="mt-[16px] text-[clamp(34px,4.5vw,56px)] font-light leading-[1.2] tracking-[-0.03em] text-text-main">
        {t("vision_section.headline_part1")} <br />
        <strong className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400">
          {t("vision_section.headline_strong")}
        </strong>
      </h2>

      <p className="mt-[24px] max-w-[540px] text-[15px] leading-[2.2] text-text-muted">
        {t("vision_section.description")}
      </p>

      <div className="mt-[22px] grid grid-cols-2 gap-[14px] max-[540px]:grid-cols-1">
        {steps.map((item, index) => (
          <VisionFlowCard
            key={item.key}
            item={item}
            index={index}
            total={steps.length}
            progress={progress}
            reduced={reduced}
          />
        ))}
      </div>
    </motion.div>
  );
}

function VisionFlowCard({
  item,
  index,
  total,
  progress,
  reduced,
}: {
  item: {
    key: string;
    icon: React.ComponentType<{
      size?: number;
      strokeWidth?: number;
      className?: string;
    }>;
    step: string;
    title: string;
    desc: string;
    color: string;
    rgb: string;
  };
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const Icon = item.icon;

  const start = 0.15 + (index / total) * 0.4;
  const end = Math.min(start + 0.2, 0.95);

  const cardY = useTransform(
    progress,
    [start, end],
    reduced ? [0, 0] : [28, 0],
  );
  const cardOpacity = useTransform(
    progress,
    [start, end],
    reduced ? [1, 1] : [0.3, 1],
  );
  const cardScale = useTransform(
    progress,
    [start, end],
    reduced ? [1, 1] : [0.95, 1],
  );
  const barWidth = useTransform(
    progress,
    [start, end],
    reduced ? ["100%", "100%"] : ["0%", "100%"],
  );

  return (
    <motion.div
      style={{
        y: cardY,
        opacity: cardOpacity,
        scale: cardScale,
      }}
      whileHover={{ y: -5, transition: { duration: 0.24, ease } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-border-light bg-app-surface p-[18px] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-border-prominent hover:bg-app-surface-subtle hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.5)]">
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: item.color }}
      />

      <div>
        <div className="flex items-center justify-between border-b border-border-light pb-[10px]">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-light bg-app-surface-subtle transition-transform duration-300 group-hover:scale-110"
              style={{
                color: item.color,
                boxShadow: `0 2px 10px rgba(${item.rgb}, 0.25)`,
                borderColor: `rgba(${item.rgb}, 0.35)`,
              }}>
              <Icon size={14} strokeWidth={2.4} />
            </div>
            <span
              className="font-num text-[11px] font-black tracking-wider"
              style={{ color: item.color }}>
              {item.step}
            </span>
          </div>

          <span
            className="h-[6px] w-[6px] rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 10px ${item.color}`,
            }}
          />
        </div>

        <h3 className="mt-[12px] flex items-center justify-between text-[15px] font-bold text-text-main">
          <span>{item.title}</span>
          <ArrowUpRight
            size={14}
            className="text-text-dim opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-[6px] text-[12px] leading-[1.8] text-text-dim">
          {item.desc}
        </p>
      </div>

      <div className="relative mt-[14px] h-[2px] w-full overflow-hidden rounded-full bg-border-light/60">
        <motion.div
          style={{ width: barWidth, backgroundColor: item.color }}
          className="h-full rounded-full"
        />
      </div>
    </motion.div>
  );
}

function OrbitalVisionCore({
  progress,
  reduced,
  steps,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  steps: Array<{
    key: string;
    icon: React.ComponentType<{
      size?: number;
      strokeWidth?: number;
      className?: string;
    }>;
    color: string;
    rgb: string;
  }>;
}) {
  const { t } = useTranslation();

  const coreRotate = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [-25, 45],
  );
  const outerRotate = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [0, 180],
  );
  const innerRotate = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [0, -240],
  );
  const coreScale = useTransform(
    progress,
    [0.1, 0.5, 0.9],
    reduced ? [1, 1, 1] : [0.94, 1.04, 0.98],
  );
  const corePulseGlow = useTransform(
    progress,
    [0.2, 0.5, 0.8],
    reduced
      ? [
          "rgba(4, 104, 250, 0.15)",
          "rgba(4, 104, 250, 0.25)",
          "rgba(4, 104, 250, 0.15)",
        ]
      : [
          "rgba(4, 104, 250, 0.1)",
          "rgba(101, 69, 151, 0.35)",
          "rgba(217, 110, 125, 0.2)",
        ],
  );

  return (
    <div className="relative flex aspect-square w-full max-w-[490px] items-center justify-center justify-self-center">
      {/* Dynamic Ambient Orbit Glow */}
      <motion.div
        style={{
          boxShadow: useTransform(
            corePulseGlow,
            (glow) => `0 0 120px 20px ${glow}`,
          ),
        }}
        className="pointer-events-none absolute inset-[12%] rounded-full opacity-60 blur-3xl transition-colors duration-700"
      />

      {/* Outer Constellation Ring */}
      <motion.div
        style={{ rotate: outerRotate }}
        className="absolute inset-0 rounded-full border border-dashed border-border-prominent">
        <span className="absolute -top-[7px] left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-border-light bg-brand-cube shadow-[0_0_14px_var(--color-brand-cube)]">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
        </span>
        <span className="absolute top-1/2 -right-[6px] h-3 w-3 -translate-y-1/2 rounded-full border border-border-light bg-brand-formula shadow-[0_0_12px_var(--color-brand-formula)]" />
        <span className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-border-light bg-brand-accounting shadow-[0_0_12px_var(--color-brand-accounting)]" />
      </motion.div>

      {/* Middle Gyro Ring */}
      <motion.div
        style={{ rotate: innerRotate }}
        className="absolute inset-[15%] rounded-full border border-border-light bg-gradient-to-tr from-white/[0.02] to-transparent backdrop-blur-[1px]">
        <span className="absolute top-[14%] left-[10%] flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-app-surface/90 shadow-md">
          <Cpu size={12} className="text-blue-400" />
        </span>
        <span className="absolute bottom-[12%] right-[14%] flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-app-surface/90 shadow-md">
          <Layers size={12} className="text-purple-400" />
        </span>
      </motion.div>

      {/* Nested Radiant Aura */}
      <div className="absolute inset-[30%] rounded-full border border-border-light bg-[radial-gradient(ellipse_at_center,var(--color-brand-cube-dim)_0%,transparent_75%)]" />

      {/* Central Interactive Monolith Core */}
      <motion.div
        style={{ rotate: coreRotate, scale: coreScale }}
        className="group relative z-10 flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full border border-border-prominent bg-app-surface/95 p-[22px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_36px_var(--color-brand-cube-dim)] backdrop-blur-2xl transition-transform duration-300">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-cube/40 bg-brand-cube/10 shadow-[0_0_18px_rgba(4,104,250,0.35)]">
          <Sparkles size={18} className="text-brand-cube animate-pulse" />
        </div>

        <span className="mt-[12px] text-[16px] font-black tracking-tight text-text-main">
          {t("vision_section.core_title")}
        </span>
        <span className="mt-[3px] font-mono text-[10px] tracking-wider text-text-dim uppercase">
          {t("vision_section.core_subtitle")}
        </span>

        {/* Orbit Node Indicators */}
        <div className="mt-3 flex items-center gap-1.5">
          {steps.map((st) => (
            <span
              key={st.key}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: st.color }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function VisionAtmosphere({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const leftGlowY = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [-40, 50],
  );
  const rightGlowY = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [50, -40],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: leftGlowY }}
        className="absolute left-[-60px] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-brand-master/[0.08] blur-[150px]"
      />
      <motion.div
        style={{ y: rightGlowY }}
        className="absolute right-[-80px] bottom-[-40px] h-[500px] w-[500px] rounded-full bg-brand-cube/[0.07] blur-[150px]"
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 65% 50% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />
    </div>
  );
}
