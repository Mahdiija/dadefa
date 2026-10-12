import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import "./DriftWall.css";

/*
 * Adapted from React Bits' Drift Wall component by David Haz.
 * https://github.com/DavidHDev/react-bits/tree/main/src/content/Components/DriftWall
 * Licensed under MIT + Commons Clause.
 */

export interface DriftWallItem {
  image: string;
  title?: string;
  href?: string;
}

interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  ariaLabel: string;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

type DriftWallStyle = CSSProperties & {
  [key: `--dw-${string}`]: string | number | undefined;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export default function DriftWall({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 18,
  tilt = 12,
  turn = -10,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 32,
  direction = "up",
  variance = 0.45,
  parallax = 0.55,
  pauseOnHover = false,
  lift = 56,
  fade = 0.42,
  dim = 0.76,
  grayscale = false,
  overlayColor = "rgba(7, 9, 22, 0.34)",
  className = "",
  ariaLabel,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColumnRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTimestampRef = useRef<number | null>(null);
  const activeIdRef = useRef<string | null>(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const columnItems = useMemo(() => {
    const columnsList = Array.from({ length: columns }, () => [] as DriftWallItem[]);
    items.forEach((item, index) => columnsList[index % columns].push(item));
    return columnsList.map((column) =>
      column.length ? column : items.slice(0, 1),
    );
  }, [items, columns]);

  const columnMeta = useMemo<ColumnMeta[]>(() => {
    const unitHeight = tileHeight + gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unitHeight, column.length * unitHeight);
      const copies = Math.max(
        2,
        Math.ceil((containerHeight * 1.6) / copyHeight) + 1,
      );
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const directionSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, index) => {
      const alternateSign = index % 2 === 0 ? 1 : -1;
      return speed * columnFactor(index, variance) * directionSign * alternateSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map(
      (meta, index) => meta.copyHeight * ((index * 0.37) % 1),
    );
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (pointerX: number, pointerY: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + pointerY}deg) rotateY(${turn + pointerX}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth],
  );

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.min(
        0.05,
        Math.max(0, timestamp - lastTimestampRef.current) / 1000,
      );
      lastTimestampRef.current = timestamp;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damping = 1 - Math.exp(-deltaTime / 0.12);
      pointerDampedRef.current.x +=
        (targetX - pointerDampedRef.current.x) * damping;
      pointerDampedRef.current.y +=
        (targetY - pointerDampedRef.current.y) * damping;
      applyPlaneTransform(
        pointerDampedRef.current.x,
        pointerDampedRef.current.y,
      );

      for (let index = 0; index < trackRefs.current.length; index += 1) {
        const track = trackRefs.current[index];
        const meta = columnMeta[index];
        if (!track || !meta) continue;

        if (reducedMotion) {
          track.style.transform = `translate3d(0, ${-(offsetsRef.current[index] ?? 0)}px, 0)`;
          continue;
        }

        const paused = wallHoveredRef.current && pauseOnHover;
        const factor = paused || hoveredColumnRef.current === index ? 0 : 1;
        const targetVelocity = baseVelocities[index] * factor;
        const easing = 1 - Math.exp(-deltaTime / (targetVelocity === 0 ? 0.16 : 0.28));
        velocitiesRef.current[index] +=
          (targetVelocity - velocitiesRef.current[index]) * easing;

        let nextOffset =
          (offsetsRef.current[index] ?? 0) +
          velocitiesRef.current[index] * deltaTime;
        nextOffset =
          ((nextOffset % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[index] = nextOffset;
        track.style.transform = `translate3d(0, ${-nextOffset}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [
    baseVelocities,
    columnMeta,
    pauseOnHover,
    parallax,
    reducedMotion,
    applyPlaneTransform,
  ]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColumnRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColumnRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (parallax > 0 && !reducedMotion) {
        pointerRef.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
      }

      const tile = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-tile-id]");
      const id = tile?.dataset.tileId;
      if (!tile || !id || id === activeIdRef.current) return;

      activeIdRef.current = id;
      hoveredColumnRef.current = Number(tile.dataset.column);
      setActiveId(id);
    },
    [parallax, reducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVariables = useMemo(
    () =>
      ({
        "--dw-tile-w": `${tileWidth}px`,
        "--dw-tile-h": `${tileHeight}px`,
        "--dw-gap": `${gap}px`,
        "--dw-radius": `${radius}px`,
        "--dw-perspective": `${perspective}px`,
        "--dw-lift": `${lift}px`,
        "--dw-dim": dim,
        "--dw-gray": grayscale ? 1 : 0,
        "--dw-overlay": overlayColor,
        "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
      }) as DriftWallStyle,
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade],
  );

  return (
    <div
      ref={containerRef}
      className={`drift-wall ${reducedMotion ? "drift-wall--reduced" : ""} ${className}`}
      style={cssVariables}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeave}
      role="group"
      aria-label={ariaLabel}>
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((column, columnIndex) => {
          const meta = columnMeta[columnIndex];
          if (!meta) return null;
          const copies = Array.from({ length: meta.copies });

          return (
            <div className="drift-wall__col" key={`column-${columnIndex}`}>
              <div
                className="drift-wall__track"
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}>
                {copies.map((_, copyIndex) =>
                  column.map((item, itemIndex) => {
                    const id = `${columnIndex}-${copyIndex}-${itemIndex}`;
                    const tileClass = `drift-wall__tile${activeId === id ? " is-active" : ""}`;
                    const tileContent = (
                      <span className="drift-wall__inner">
                        <img
                          src={item.image}
                          alt={item.title ?? ""}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                        <span className="drift-wall__overlay" aria-hidden="true" />
                      </span>
                    );

                    if (item.href) {
                      return (
                        <a
                          key={id}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={tileClass}
                          data-tile-id={id}
                          data-column={columnIndex}
                          aria-label={item.title}
                          onFocus={() => activate(id, columnIndex)}
                          onBlur={release}>
                          {tileContent}
                        </a>
                      );
                    }

                    return (
                      <figure
                        key={id}
                        className={tileClass}
                        data-tile-id={id}
                        data-column={columnIndex}
                        tabIndex={0}
                        aria-label={item.title}
                        onFocus={() => activate(id, columnIndex)}
                        onBlur={release}>
                        {tileContent}
                      </figure>
                    );
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
