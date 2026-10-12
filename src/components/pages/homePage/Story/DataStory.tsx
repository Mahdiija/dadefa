import { useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import * as motion from "framer-motion/m";
import {
  Layers,
  Network,
  Sparkles,
  TrendingUp,
  CircleDollarSign,
  Activity,
  Boxes,
  ArrowUpRight,
  Database,
} from "lucide-react";
import LandingContainer from "@/components/UI/LandingContainer";
import LandingButton from "@/components/UI/LandingButton";
import { useTranslation } from "@/locale/useTranslation";
import "./data-story.css";

const stages = ["scattered", "connected", "clarity"] as const;
const sources = ["sales", "finance", "operations", "inventory"] as const;
const colors = ["#0468fa", "#d96e7d", "#654597", "#4e148c"];

const stage_icons = {
  scattered: Layers,
  connected: Network,
  clarity: Sparkles,
};

const source_icons = {
  sales: TrendingUp,
  finance: CircleDollarSign,
  operations: Activity,
  inventory: Boxes,
};

const positions = [
  { start: [115, 95], middle: [150, 130], end: [150, 130] },
  { start: [370, 82], middle: [350, 130], end: [350, 130] },
  { start: [90, 350], middle: [150, 330], end: [150, 330] },
  { start: [390, 370], middle: [350, 330], end: [350, 330] },
];

function subscribeCompact(onChange: () => void) {
  const query = window.matchMedia("(max-width: 800px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function DataStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const compact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia("(max-width: 800px)").matches,
    () => false,
  );
  const staticScene = !!reduced || compact;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(2, Math.floor(value * 3)));
  });

  return (
    <section
      id="data-story"
      className="data-story"
      aria-labelledby="story-heading">
      <LandingContainer>
        <header className="story-intro">
          <p className="story-kicker">{t("story.kicker")}</p>
          <h2 id="story-heading">{t("story.intro")}</h2>
          <p className="story-scroll">
            <span aria-hidden="true">↓</span> {t("story.scroll")}
          </p>
        </header>

        <div className="story-layout">
          <div ref={ref} className="story-chapters">
            {stages.map((stage, index) => {
              const StageIcon = stage_icons[stage];
              const is_active = active === index;

              return (
                <motion.article
                  key={stage}
                  className="story-chapter"
                  data-active={is_active}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}>
                  <div className="story-chapter-meta">
                    <div
                      className="story-icon-badge"
                      style={{
                        borderColor: is_active
                          ? colors[index]
                          : "var(--border-light)",
                        color: is_active ? colors[index] : "var(--text-dim)",
                      }}>
                      <StageIcon size={16} strokeWidth={2.2} />
                    </div>
                    <span>{t(`story.stages.${stage}.label`)}</span>
                  </div>

                  <h3>{t(`story.stages.${stage}.title`)}</h3>
                  <p>{t(`story.stages.${stage}.description`)}</p>

                  {index === 2 && (
                    <LandingButton href="#products" variant="outline" size="sm" wrapperClassName="mt-7 max-w-[340px]">
                      {t("story.next")}
                      <ArrowUpRight
                        size={15}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    </LandingButton>
                  )}
                </motion.article>
              );
            })}
          </div>

          <div className="story-visual">
            <div className="story-scene" aria-hidden="true">
              <div className="story-scene-top">
                <span>DADEFA / DATA JOURNEY</span>
                <span className="font-num">
                  0{staticScene ? 3 : active + 1} — 03
                </span>
              </div>

              <DataScene progress={scrollYProgress} reduced={staticScene} />

              <div className="story-scene-bottom">
                <span>
                  {t(`story.stages.${stages[staticScene ? 2 : active]}.label`)}
                </span>
                <div className="story-progress">
                  {stages.map((stage, index) => (
                    <span
                      key={stage}
                      data-active={staticScene || active >= index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

function DataScene({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { t } = useTranslation();

  const lines = useTransform(
    progress,
    [0, 0.24, 0.43, 0.66, 0.84],
    [0, 0, 1, 1, 0.2],
  );
  const core = useTransform(progress, [0, 0.23, 0.43], [0.12, 0.12, 1]);
  const dashboard = useTransform(progress, [0, 0.64, 0.84], [0, 0, 1]);
  const dashboardY = useTransform(progress, [0.64, 0.84], [20, 0]);

  return (
    <svg viewBox="0 0 500 460" className="story-svg" focusable="false">
      <defs>
        <pattern
          id="story-grid"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="var(--text-dim)" opacity="0.25" />
        </pattern>

        <linearGradient id="story-line" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0468fa" />
          <stop offset="1" stopColor="#d96e7d" />
        </linearGradient>

        <linearGradient id="core-glow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0468fa" stopOpacity="0.25" />
          <stop offset="1" stopColor="#4e148c" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="500" height="460" fill="url(#story-grid)" />

      <circle
        cx="250"
        cy="230"
        r="158"
        fill="none"
        stroke="var(--border-light)"
        strokeDasharray="3 8"
      />
      <circle
        cx="250"
        cy="230"
        r="112"
        fill="none"
        stroke="var(--border-light)"
      />

      <motion.circle
        cx="250"
        cy="230"
        r="135"
        fill="none"
        stroke="#0468fa"
        strokeWidth="1"
        style={{ opacity: reduced ? 0 : core }}
        animate={
          reduced
            ? {}
            : {
                scale: [0.92, 1.08, 0.92],
                opacity: [0.15, 0.55, 0.15],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
      />

      <motion.g style={{ opacity: reduced ? 1 : lines }}>
        {positions.map((position, i) => (
          <motion.path
            key={i}
            d={`M ${position.middle[0]} ${position.middle[1]} L 250 230`}
            fill="none"
            stroke={colors[i]}
            strokeWidth="1.5"
            style={{ pathLength: reduced ? 1 : lines }}
          />
        ))}
      </motion.g>

      <motion.g
        style={{
          opacity: 1,
          scale: 1,
          transformOrigin: "250px 230px",
        }}>
        <rect
          x="186"
          y="184"
          width="128"
          height="92"
          rx="24"
          fill="var(--app-surface)"
          stroke="var(--border-prominent)"
        />
        <rect
          x="186"
          y="184"
          width="128"
          height="92"
          rx="24"
          fill="url(#core-glow)"
        />

        <foreignObject x="238" y="196" width="24" height="24">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0468fa",
            }}>
            <Database size={16} strokeWidth={2.4} />
          </div>
        </foreignObject>

        <text x="250" y="238" className="story-core-label" textAnchor="middle">
          {t("story.core")}
        </text>
        <text x="250" y="256" className="story-core-note" textAnchor="middle">
          {t("story.core_subtitle")}
        </text>
      </motion.g>

      {sources.map((source, i) => (
        <DataNode
          key={source}
          sourceKey={source}
          progress={progress}
          reduced={reduced}
          index={i}
          label={t(`story.sources.${source}`)}
        />
      ))}

      <motion.g
        style={{
          opacity: reduced ? 1 : dashboard,
          y: reduced ? 0 : dashboardY,
        }}>
        <rect
          x="90"
          y="376"
          width="320"
          height="62"
          rx="16"
          fill="var(--app-surface)"
          stroke="var(--border-prominent)"
        />

        <foreignObject x="106" y="393" width="28" height="28">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0468fa",
            }}>
            <Sparkles size={18} strokeWidth={2.2} />
          </div>
        </foreignObject>

        <text x="144" y="401" className="story-insight-label">
          {t("story.insight")}
        </text>
        <text x="144" y="421" className="story-core-note">
          {t("story.insight_note")}
        </text>

        <motion.path
          d="M 250 276 L 250 293 L 420 293 L 420 407 L 410 407"
          stroke="url(#story-line)"
          fill="none"
          strokeWidth="1.5"
          style={{ pathLength: reduced ? 1 : dashboard }}
        />
      </motion.g>
    </svg>
  );
}

function DataNode({
  sourceKey,
  progress,
  reduced,
  index,
  label,
}: {
  sourceKey: (typeof sources)[number];
  progress: MotionValue<number>;
  reduced: boolean;
  index: number;
  label: string;
}) {
  const position = positions[index];
  const Icon = source_icons[sourceKey];

  const x = useTransform(
    progress,
    [0, 0.18, 0.45],
    [position.start[0], position.start[0], position.end[0]],
  );
  const y = useTransform(
    progress,
    [0, 0.18, 0.45],
    [position.start[1], position.start[1], position.end[1]],
  );
  const rotate = useTransform(progress, [0, 0.45], [index % 2 ? 8 : -8, 0]);

  return (
    <motion.g
      style={{
        x: reduced ? position.end[0] : x,
        y: reduced ? position.end[1] : y,
        rotate: reduced ? 0 : rotate,
      }}>
      <motion.g
        animate={
          reduced
            ? {}
            : {
                y: [0, -3.5, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 3 + index * 0.4,
          ease: "easeInOut",
        }}>
        <rect
          x="-62"
          y="-34"
          width="124"
          height="68"
          rx="16"
          fill="var(--app-surface)"
          stroke="var(--border-prominent)"
        />

        <foreignObject x="-50" y="-23" width="22" height="22">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors[index],
            }}>
            <Icon size={15} strokeWidth={2.4} />
          </div>
        </foreignObject>

        <circle cx="48" cy="-14" r="3.5" fill={colors[index]} />

        <text x="-50" y="16" className="story-node-label" textAnchor="start">
          {label}
        </text>

        <rect
          x="-50"
          y="24"
          width="100"
          height="2"
          rx="1"
          fill={colors[index]}
          opacity="0.3"
        />
      </motion.g>
    </motion.g>
  );
}
