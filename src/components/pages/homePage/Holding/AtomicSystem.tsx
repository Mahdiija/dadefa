import { useId } from "react";
import whiteWordmark from "/brand/dadefa-latin-logotype-white.svg";

export type AtomicSystemProps = {
  className?: string;
  background?: string;
  wordmarkSrc?: string;
  headline?: string;
  tagline?: string;
};

export default function AtomicSystem({
  className = "",
  background = "var(--color-brand-cream)",
  wordmarkSrc = whiteWordmark,
  headline = "ONE CORE.",
  tagline = "A CONNECTED SYSTEM.",
}: AtomicSystemProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <div className={["relative w-full overflow-hidden", className].join(" ")}>
      <svg
        className="block h-auto w-full"
        viewBox="0 0 1296 704"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        fill={"tansparent"}
        aria-labelledby={`${titleId} ${descriptionId}`}>
        <desc id={descriptionId}>
          Four product nodes connected to a central Dadehfa core through
          intersecting atomic orbits.
        </desc>

        {/* =========================================================
            WORDMARK
        ========================================================= */}

        <image
          href={wordmarkSrc}
          x="72"
          y="245"
          width="1152"
          height="215"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        />

        {/* =========================================================
            ATOMIC ORBITS
        ========================================================= */}

        <g fill="none" stroke="var(--color-brand-indigo)" strokeWidth="2.2">
          {/* Vertical orbit */}
          <ellipse cx="648" cy="336" rx="118" ry="309" />

          {/* Horizontal orbit */}
          <ellipse
            cx="648"
            cy="336"
            rx="315"
            ry="112"
            transform="rotate(30 648 336)"
          />

          {/* Horizontal orbit */}
          <ellipse
            cx="648"
            cy="336"
            rx="315"
            ry="112"
            transform="rotate(-30 648 336)"
          />
        </g>

        {/* Orbit nodes */}

        <g fill="var(--color-brand-indigo)">
          <circle cx="648" cy="27" r="9" />

          <circle cx="648" cy="645" r="9" />

          <circle cx="872" cy="162" r="7.5" />
        </g>

        {/* =========================================================
            PRODUCT NODE — CUBE
        ========================================================= */}

        <g transform="translate(380 196)">
          <circle r="42" fill="var(--color-product-cube)" />

          <circle r="27" fill={background} />

          <circle cx="0" cy="-25" r="7" fill="var(--color-product-cube)" />

          <circle cx="-25" cy="17" r="7" fill="var(--color-product-cube)" />

          <circle cx="24" cy="17" r="7" fill="var(--color-product-cube)" />

          <g fill="none" stroke="var(--color-product-cube)" strokeWidth="1.4">
            <path d="M0-17 18-8 18 10 0 20-18 10-18-8Z" />

            <path d="M0-17V20M-18-8 18 10M18-8-18 10" strokeDasharray="2 5" />
          </g>

          <g fill="var(--color-product-cube)">
            <circle cx="0" cy="-17" r="2.5" />

            <circle cx="18" cy="-8" r="2.5" />

            <circle cx="18" cy="10" r="2.5" />

            <circle cx="0" cy="20" r="2.5" />

            <circle cx="-18" cy="10" r="2.5" />

            <circle cx="-18" cy="-8" r="2.5" />
          </g>
        </g>

        {/* =========================================================
            PRODUCT NODE — MASTER
        ========================================================= */}

        <g transform="translate(914 196)">
          <circle r="56" fill={background} />

          <circle
            r="55"
            fill="none"
            stroke="var(--color-product-master)"
            strokeWidth="1.5"
          />

          <circle r="40" fill="var(--color-product-master)" />

          <circle r="25" fill={background} />

          <path
            d="M-21-18 35 23"
            fill="none"
            stroke="var(--color-product-master)"
            strokeWidth="1.4"
          />

          <circle
            cx="28"
            cy="21"
            r="7"
            fill={background}
            stroke="var(--color-product-master)"
            strokeWidth="1.3"
          />

          <circle
            cx="39"
            cy="27"
            r="6"
            fill={background}
            stroke="var(--color-product-master)"
            strokeWidth="1.3"
          />
        </g>

        {/* =========================================================
            PRODUCT NODE — FORMULA
        ========================================================= */}

        <g transform="translate(382 486)">
          <circle r="48" fill={background} />

          <circle
            r="47"
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth="1"
            opacity=".7"
          />

          <path
            d="M-6-41C-30-39-43-20-40 5c2 22 17 37 35 38 18 1 21-15 40-18C52 6 40-21 20-35 12-40 3-42-6-41Z"
            fill="var(--color-brand-blue)"
          />

          <path
            d="M-5-25C-23-23-28-9-25 7c3 15 13 25 24 25 13 0 15-13 29-14C37 1 28-15 15-22 8-26 1-27-5-25Z"
            fill={background}
          />

          <text
            x="-42"
            y="-30"
            fill="var(--color-brand-blue)"
            fontFamily="var(--font-brand-latin)"
            fontSize="16">
            π
          </text>
        </g>

        {/* =========================================================
            PRODUCT NODE — ACCOUNTING
        ========================================================= */}

        <g transform="translate(905 486)">
          <circle r="41" fill={background} />

          <path
            d="M-40-9a41 41 0 0 1 80 0H24a25 25 0 0 0-48 0ZM-40 9h16a25 25 0 0 0 48 0h16a41 41 0 0 1-80 0Z"
            fill="var(--color-product-accounting)"
          />

          <path
            d="M-45 0H46"
            stroke="var(--color-product-accounting)"
            strokeWidth="1.4"
          />

          <circle
            cx="-31"
            cy="-7"
            r="9"
            fill="var(--color-product-accounting)"
            stroke={background}
            strokeWidth="2"
          />

          <circle
            cx="17"
            cy="8"
            r="9"
            fill="var(--color-product-accounting)"
            stroke={background}
            strokeWidth="2"
          />

          <circle
            cx="36"
            cy="8"
            r="9"
            fill="var(--color-product-accounting)"
            stroke={background}
            strokeWidth="2"
          />
        </g>

        {/* =========================================================
            CENTRAL CORE
        ========================================================= */}

        <g transform="translate(648 336)">
          <path
            d="M-13-36h14c21 0 37 17 37 40S22 43 1 43h-14V27H0c13 0 21-10 21-23S13-19 0-19h-13Z"
            fill="var(--color-brand-mauve)"
          />

          <g
            fill="var(--color-brand-mauve)"
            stroke={background}
            strokeWidth="2">
            <circle cx="-31" cy="-29" r="7.5" />

            <circle cx="-26" cy="-4" r="8" />

            <circle cx="-12" cy="4" r="7" />

            <circle cx="-24" cy="18" r="5.5" />
          </g>
        </g>

        {/* =========================================================
    TYPOGRAPHY
========================================================= */}

        <g
          fill="var(--color-brand-blue)"
          fontFamily="var(--font-brand-latin)"
          fontWeight="400">
          {/* Top Left */}
          <text x="72" y="78" fontSize="34" letterSpacing="-2.3">
            {headline}
          </text>

          {/* Bottom Right */}
          <text
            x="1224"
            y="650"
            textAnchor="end"
            fontSize="32"
            letterSpacing="-2.3">
            {tagline}
          </text>
        </g>
      </svg>
    </div>
  );
}
