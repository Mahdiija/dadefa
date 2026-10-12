import * as motion from "framer-motion/m";
import { useTranslation } from "@/locale/useTranslation";

interface LiveEngineVisualProps {
  id: string;
  color: string;
  is_active: boolean;
}

export default function LiveEngineVisual({
  id,
  color,
  is_active,
}: LiveEngineVisualProps) {
  const { t } = useTranslation();

  const visual_card_wrapper_class =
    "relative flex min-h-[165px] w-full flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-white/10 dark:border-white/15 bg-white/[0.04] dark:bg-white/[0.03] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transform-gpu";

  if (id === "master") {
    const lanes = [
      t("hero.engines.master.goods"),
      t("hero.engines.master.finance"),
      t("hero.engines.master.warehouse"),
    ];

    return (
      <div className={visual_card_wrapper_class}>
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: color }}
        />
        <EngineHeader
          kicker={t("hero.engines.master.kicker")}
          badge={t("hero.engines.master.badge")}
          color={color}
          live={is_active}
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <motion.div
              animate={is_active ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/25"
            />
            <motion.div
              animate={is_active ? { rotate: -360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed"
              style={{ borderColor: color }}
            />
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
            />
          </div>
          <ul className="m-0 flex flex-1 list-none flex-col gap-1.5 p-0">
            {lanes.map((lane, index) => (
              <li key={lane} className="flex items-center gap-2 text-[12px] text-text-main">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={is_active ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.7 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    delay: index * 0.25,
                  }}
                />
                {lane}
              </li>
            ))}
          </ul>
        </div>

        <EngineFact>{t("hero.engines.master.fact")}</EngineFact>
      </div>
    );
  }

  if (id === "formula") {
    return (
      <div className={visual_card_wrapper_class}>
        <EngineHeader
          kicker={t("hero.engines.formula.kicker")}
          badge={t("hero.engines.formula.badge")}
          color={color}
          live={is_active}
        />

        <div className="flex h-12 w-full items-end gap-1">
          {[40, 75, 55, 90, 100, 65, 80, 100, 70, 95, 60, 85].map((val, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <motion.div
                className="w-full origin-bottom rounded-t opacity-90"
                style={{ backgroundColor: color, height: `${val}%` }}
                animate={is_active ? { scaleY: [0.4, 1, 0.6] } : { scaleY: 0.65 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>

        <EngineFact>{t("hero.engines.formula.fact")}</EngineFact>
      </div>
    );
  }

  if (id === "cube") {
    const steps = [
      t("hero.engines.cube.form"),
      t("hero.engines.cube.approval"),
      t("hero.engines.cube.ticket"),
    ];

    return (
      <div className={visual_card_wrapper_class}>
        <EngineHeader
          kicker={t("hero.engines.cube.kicker")}
          badge={t("hero.engines.cube.badge")}
          color={color}
          live={is_active}
        />

        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="flex h-14 flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-1 text-center text-[11px] font-medium text-text-main"
              animate={
                is_active
                  ? {
                      y: [0, -4, 0],
                      borderColor: ["rgba(255,255,255,0.12)", color, "rgba(255,255,255,0.12)"],
                    }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2.4, delay: index * 0.28 }}>
              {step}
            </motion.div>
          ))}
        </div>

        <EngineFact>{t("hero.engines.cube.fact")}</EngineFact>
      </div>
    );
  }

  const lines = [
    t("hero.engines.accounting.receipt"),
    t("hero.engines.accounting.payment"),
    t("hero.engines.accounting.balance"),
  ];

  return (
    <div className={visual_card_wrapper_class}>
      <EngineHeader
        kicker={t("hero.engines.accounting.kicker")}
        badge={t("hero.engines.accounting.badge")}
        color={color}
        live={is_active}
      />

      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {lines.map((line, index) => (
          <li key={line} className="flex items-center gap-2 text-[12px] text-text-main">
            <span
              className="h-1 w-6 rounded-full"
              style={{ backgroundColor: color, opacity: 0.35 + index * 0.25 }}
            />
            {line}
          </li>
        ))}
      </ul>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: color }}
          animate={is_active ? { scaleX: [0.35, 0.92, 0.7] } : { scaleX: 0.7 }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        />
      </div>
      <EngineFact>{t("hero.engines.accounting.fact")}</EngineFact>
    </div>
  );
}

function EngineHeader({
  kicker,
  badge,
  color,
  live,
}: {
  kicker: string;
  badge: string;
  color: string;
  live: boolean;
}) {
  return (
    <div className="relative z-10 flex items-center justify-between gap-2 text-[11px]">
      <span className="flex items-center gap-1.5 text-text-dim">
        <span
          className={`h-1.5 w-1.5 rounded-full ${live ? "animate-ping" : ""}`}
          style={{ backgroundColor: color }}
        />
        {kicker}
      </span>
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-text-main">{badge}</span>
    </div>
  );
}

function EngineFact({ children }: { children: string }) {
  return (
    <p className="relative z-10 m-0 border-t border-border-light pt-2 text-[11px] leading-relaxed text-text-muted">
      {children}
    </p>
  );
}
