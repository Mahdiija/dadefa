import { useEffect, useRef, useState, type PointerEvent } from "react";

type Point = { x: number; y: number };
type Node = Point & { radius: number };

// Points are based on the supplied circular network artwork, with a little
// breathing room around its edges so the outer nodes can move freely.
const nodes: Node[] = [
  { x: 200, y: 35, radius: 9 },
  { x: 126, y: 52, radius: 2.5 },
  { x: 173, y: 73, radius: 17 },
  { x: 217, y: 67, radius: 3 },
  { x: 275, y: 52, radius: 2.5 },
  { x: 301, y: 102, radius: 9 },
  { x: 348, y: 122, radius: 2.5 },
  { x: 363, y: 196, radius: 2.5 },
  { x: 332, y: 186, radius: 16 },
  { x: 276, y: 225, radius: 16 },
  { x: 237, y: 128, radius: 22 },
  { x: 143, y: 158, radius: 16 },
  { x: 170, y: 221, radius: 9 },
  { x: 106, y: 252, radius: 2.5 },
  { x: 55, y: 270, radius: 2.5 },
  { x: 59, y: 178, radius: 2.5 },
  { x: 37, y: 196, radius: 9 },
  { x: 55, y: 122, radius: 2.5 },
  { x: 90, y: 117, radius: 2.5 },
  { x: 125, y: 110, radius: 2.5 },
  { x: 345, y: 272, radius: 2.5 },
  { x: 256, y: 310, radius: 9 },
  { x: 276, y: 342, radius: 9 },
  { x: 327, y: 310, radius: 2.5 },
  { x: 200, y: 359, radius: 2.5 },
  { x: 172, y: 318, radius: 2.5 },
  { x: 124, y: 340, radius: 9 },
  { x: 95, y: 218, radius: 2.5 },
  { x: 126, y: 299, radius: 2.5 },
  { x: 195, y: 285, radius: 2.5 },
  { x: 305, y: 251, radius: 2.5 },
  { x: 160, y: 95, radius: 2.5 },
  { x: 220, y: 94, radius: 2.5 },
  { x: 280, y: 155, radius: 2.5 },
];

// A fixed mesh keeps each component instance stable while its vertices move.
const edges: [number, number][] = [
  [0, 1],
  [0, 3],
  [0, 4],
  [0, 2],
  [1, 2],
  [1, 19],
  [1, 31],
  [2, 3],
  [2, 10],
  [2, 11],
  [2, 19],
  [2, 31],
  [3, 4],
  [3, 10],
  [3, 32],
  [4, 5],
  [4, 32],
  [5, 6],
  [5, 8],
  [5, 10],
  [5, 33],
  [6, 7],
  [6, 8],
  [7, 8],
  [7, 20],
  [8, 9],
  [8, 10],
  [8, 20],
  [8, 30],
  [8, 33],
  [9, 10],
  [9, 12],
  [9, 20],
  [9, 21],
  [9, 29],
  [9, 30],
  [9, 33],
  [10, 11],
  [10, 12],
  [10, 19],
  [10, 31],
  [10, 32],
  [10, 33],
  [11, 12],
  [11, 13],
  [11, 15],
  [11, 18],
  [11, 19],
  [11, 27],
  [12, 13],
  [12, 21],
  [12, 25],
  [12, 29],
  [13, 14],
  [13, 15],
  [13, 27],
  [13, 28],
  [14, 16],
  [14, 26],
  [14, 28],
  [15, 16],
  [15, 17],
  [15, 18],
  [16, 17],
  [17, 18],
  [17, 19],
  [18, 19],
  [18, 31],
  [19, 31],
  [20, 21],
  [20, 23],
  [20, 30],
  [21, 22],
  [21, 24],
  [21, 25],
  [21, 29],
  [22, 23],
  [22, 24],
  [22, 29],
  [23, 30],
  [24, 25],
  [24, 26],
  [24, 29],
  [25, 26],
  [25, 28],
  [25, 29],
  [26, 28],
  [27, 28],
  [28, 29],
  [29, 30],
  [30, 33],
  [31, 32],
  [32, 33],
];

export type CircularPatternProps = {
  className?: string;
  color?: string;
  intensity?: number;
};

export default function CircularPattern({
  className = "",
  color = "#724b67",
  intensity = 1,
}: CircularPatternProps) {
  const [positions, setPositions] = useState<Point[]>(() =>
    nodes.map(({ x, y }) => ({ x, y })),
  );
  const current = useRef<Point[]>(nodes.map(({ x, y }) => ({ x, y })));
  const pointer = useRef<Point | null>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function desiredPositions(): Point[] {
    return nodes.map((node) => {
      if (!pointer.current) return { x: node.x, y: node.y };

      const dx = node.x - pointer.current.x;
      const dy = node.y - pointer.current.y;
      const distance = Math.hypot(dx, dy) || 1;
      const influence = Math.max(0, 1 - distance / 115) ** 2;
      const push = 36 * Math.max(0, intensity) * influence;

      return {
        x: node.x + (dx / distance) * push,
        y: node.y + (dy / distance) * push,
      };
    });
  }

  function animate() {
    const targets = desiredPositions();
    let moving = false;
    const next = current.current.map((point, index) => {
      const target = targets[index];
      const x = point.x + (target.x - point.x) * 0.18;
      const y = point.y + (target.y - point.y) * 0.18;
      if (Math.abs(target.x - x) + Math.abs(target.y - y) > 0.06) moving = true;
      return { x, y };
    });

    current.current = next;
    setPositions(next);
    frame.current = moving ? requestAnimationFrame(animate) : null;
  }

  function update() {
    if (reducedMotion.current) {
      current.current = desiredPositions();
      setPositions(current.current);
    } else if (frame.current === null) {
      frame.current = requestAnimationFrame(animate);
    }
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 400,
      y: ((event.clientY - bounds.top) / bounds.height) * 400,
    };
    update();
  }

  function handlePointerLeave() {
    pointer.current = null;
    update();
  }

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Interactive circular network of connected points"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ color, touchAction: "pan-y" }}>
      <rect width="400" height="400" fill="transparent" />
      <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.75">
        {edges.map(([from, to], index) => (
          <line
            key={index}
            x1={positions[from].x}
            y1={positions[from].y}
            x2={positions[to].x}
            y2={positions[to].y}
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map((node, index) => (
          <circle
            key={index}
            cx={positions[index].x}
            cy={positions[index].y}
            r={node.radius}
          />
        ))}
      </g>
    </svg>
  );
}
