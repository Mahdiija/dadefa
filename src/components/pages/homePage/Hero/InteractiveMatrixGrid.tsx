import { useEffect, useRef } from "react";

interface InteractiveMatrixGridProps {
  activeRgb: string;
}

interface ActiveSquare {
  col: number;
  row: number;
  opacity: number;
}

export default function InteractiveMatrixGrid({
  activeRgb,
}: InteractiveMatrixGridProps) {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animation_id: number;

    const setup_dimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const display_width = canvas.offsetWidth;
      const display_height = canvas.offsetHeight;

      canvas.width = Math.floor(display_width * dpr);
      canvas.height = Math.floor(display_height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { width: display_width, height: display_height };
    };

    let { width, height } = setup_dimensions();

    const check_dark = () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    let is_dark_mode = check_dark();

    const observer = new MutationObserver(() => {
      is_dark_mode = check_dark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const square_size = 46;
    let cols = Math.ceil(width / square_size);
    let rows = Math.ceil(height / square_size);

    const mouse = { x: -1000, y: -1000, active: false };
    const active_squares: Map<string, ActiveSquare> = new Map();

    const handle_resize = () => {
      if (!canvas) return;
      const dims = setup_dimensions();
      width = dims.width;
      height = dims.height;
      cols = Math.ceil(width / square_size);
      rows = Math.ceil(height / square_size);
    };

    const handle_mouse_move = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      const col = Math.floor(mouse.x / square_size);
      const row = Math.floor(mouse.y / square_size);

      for (let dc = -1; dc <= 1; dc++) {
        for (let dr = -1; dr <= 1; dr++) {
          const c = col + dc;
          const r = row + dr;
          if (c >= 0 && c < cols && r >= 0 && r < rows) {
            const key = `${c}-${r}`;
            const dist = Math.hypot(dc, dr);
            const intensity = dist === 0 ? 0.38 : dist === 1 ? 0.22 : 0.12;
            const current = active_squares.get(key);
            if (!current || current.opacity < intensity) {
              active_squares.set(key, { col: c, row: r, opacity: intensity });
            }
          }
        }
      }
    };

    const handle_mouse_leave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handle_resize);
    window.addEventListener("mousemove", handle_mouse_move);
    document.addEventListener("mouseleave", handle_mouse_leave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      const line_color = is_dark_mode
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0.04)";

      ctx.strokeStyle = line_color;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += square_size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += square_size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const pulse_col = Math.floor((Math.sin(time) * 0.5 + 0.5) * cols);
      const pulse_row = Math.floor((Math.cos(time * 0.7) * 0.5 + 0.5) * rows);
      const pulse_key = `${pulse_col}-${pulse_row}`;
      if (!active_squares.has(pulse_key)) {
        active_squares.set(pulse_key, {
          col: pulse_col,
          row: pulse_row,
          opacity: 0.16,
        });
      }

      for (const [key, square] of active_squares.entries()) {
        const x = square.col * square_size;
        const y = square.row * square_size;

        const fill_opacity = is_dark_mode
          ? square.opacity
          : square.opacity * 0.45;

        ctx.fillStyle = `rgba(${activeRgb}, ${fill_opacity})`;
        ctx.fillRect(x + 1, y + 1, square_size - 1, square_size - 1);

        square.opacity -= 0.007;
        if (square.opacity <= 0) {
          active_squares.delete(key);
        }
      }

      animation_id = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handle_resize);
      window.removeEventListener("mousemove", handle_mouse_move);
      document.removeEventListener("mouseleave", handle_mouse_leave);
      observer.disconnect();
      cancelAnimationFrame(animation_id);
    };
  }, [activeRgb]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [transform:translateZ(0)]">
      <canvas
        ref={canvas_ref}
        className="h-full w-full opacity-90 transition-opacity duration-500"
      />
      {/* Safe radial overlay for iOS without WebKit CSS Mask bugs */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/90 dark:to-[#07090e]/90" />
    </div>
  );
}
