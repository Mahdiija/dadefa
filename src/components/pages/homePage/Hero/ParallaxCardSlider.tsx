import { useRef } from "react";
import { animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as motion from "framer-motion/m";
import ProductLogo, { type ProductLogoName } from "@/components/UI/ProductLogo";
import LiveEngineVisual from "./LiveEngineVisual";

export interface SliderBrandItem {
  id: ProductLogoName;
  key: string;
  phase: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  color: string;
  rgb: string;
  themeClass: string;
  accentGlow: string;
  badge: string;
}

interface ParallaxCardSliderProps {
  items: SliderBrandItem[];
  activeIdx: number;
  onSelect: (index: number) => void;
}

export default function ParallaxCardSlider({
  items,
  activeIdx,
  onSelect,
}: ParallaxCardSliderProps) {
  const container_ref = useRef<HTMLDivElement>(null);
  const swipe_start = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppress_click = useRef(false);

  const mouse_x = useMotionValue(0);
  const drag_x = useMotionValue(0);
  const mouse_y = useMotionValue(0);

  const spring_x = useSpring(mouse_x, { stiffness: 120, damping: 18 });
  const spring_y = useSpring(mouse_y, { stiffness: 120, damping: 18 });

  const rotate_x = useTransform(spring_y, [-0.5, 0.5], [14, -14]);
  const rotate_y = useTransform(spring_x, [-0.5, 0.5], [-18, 18]);

  const handle_mouse_move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!container_ref.current) return;
    const rect = container_ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouse_x.set(x);
    mouse_y.set(y);
  };

  const handle_mouse_leave = () => {
    mouse_x.set(0);
    mouse_y.set(0);
  };

  const handle_pointer_down = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipe_start.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
    suppress_click.current = false;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Some browsers reject capture for a pointer that is already gone.
    }
  };

  const handle_pointer_move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!swipe_start.current || swipe_start.current.id !== event.pointerId) return;
    const dx = event.clientX - swipe_start.current.x;
    const dy = event.clientY - swipe_start.current.y;
    if (Math.abs(dx) > 8) suppress_click.current = true;
    if (Math.abs(dx) <= Math.abs(dy)) return;
    drag_x.set(Math.max(-120, Math.min(120, dx)));
  };

  const handle_pointer_up = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!swipe_start.current || swipe_start.current.id !== event.pointerId) return;
    const dx = event.clientX - swipe_start.current.x;
    const dy = event.clientY - swipe_start.current.y;
    swipe_start.current = null;
    animate(drag_x, 0, { type: "spring", stiffness: 280, damping: 28 });
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    const direction = dx < 0 ? 1 : -1;
    onSelect((activeIdx + direction + items.length) % items.length);
  };

  return (
    <div
      ref={container_ref}
      onMouseMove={handle_mouse_move}
      onMouseLeave={handle_mouse_leave}
      onPointerDown={handle_pointer_down}
      onPointerMove={handle_pointer_move}
      onPointerUp={handle_pointer_up}
      onPointerCancel={handle_pointer_up}
      className="relative flex h-full w-full touch-pan-y select-none items-center justify-center [perspective:1400px] [-webkit-perspective:1400px]">
      <motion.div
        style={{
          x: drag_x,
          rotateX: rotate_x,
          rotateY: rotate_y,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        className="relative flex h-[460px] w-[310px] items-center justify-center transition-transform duration-100 ease-out will-change-transform sm:h-[500px] sm:w-[350px]">
        {items.map((item, index) => {
          const offset = (index - activeIdx + items.length) % items.length;
          const z_index = items.length - Math.abs(offset === 3 ? 1 : offset);
          const is_active = offset === 0;

          let translate_x = 0;
          let translate_y = 0;
          let translate_z = 0;
          let rotate_z = 0;
          let opacity = 1;
          let scale = 1;

          if (offset === 0) {
            translate_x = 0;
            translate_y = 0;
            translate_z = 85;
            rotate_z = -2.5;
            opacity = 1;
            scale = 1;
          } else if (offset === 1) {
            translate_x = 125;
            translate_y = 22;
            translate_z = -35;
            rotate_z = 9;
            opacity = 0.65;
            scale = 0.9;
          } else if (offset === 2) {
            translate_x = 0;
            translate_y = -40;
            translate_z = -130;
            rotate_z = 0;
            opacity = 0.3;
            scale = 0.8;
          } else if (offset === 3) {
            translate_x = -125;
            translate_y = 22;
            translate_z = -35;
            rotate_z = -12;
            opacity = 0.65;
            scale = 0.9;
          }

          return (
            <motion.div
              key={item.id}
              onClick={() => {
                if (suppress_click.current) {
                  suppress_click.current = false;
                  return;
                }
                onSelect(index);
              }}
              animate={{
                x: translate_x,
                y: translate_y,
                z: translate_z,
                rotateZ: rotate_z,
                opacity: opacity,
                scale: scale,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                zIndex: z_index,
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="absolute inset-0 cursor-pointer rounded-[28px] p-1 will-change-transform">
              <div
                className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] border border-border-prominent bg-app-surface/95 p-6 shadow-2xl transition-all duration-300 transform-gpu"
                style={{
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  boxShadow: is_active
                    ? `0 32px 80px -10px ${item.accentGlow}`
                    : "var(--shadow-card-mode)",
                }}>
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(140% 100% at 50% 0%, rgba(${item.rgb}, 0.28) 0%, rgba(${item.rgb}, 0.08) 50%, transparent 85%)`,
                  }}
                />

                <div
                  className="relative z-10 flex items-center justify-between"
                  dir="ltr">
                  <div className="flex items-center gap-2">
                    <div
                      className="product-logo-frame h-7 w-7"
                      data-product={item.id}>
                      <ProductLogo
                        product={item.id}
                        alt={item.title}
                        className="h-6 w-6"
                      />
                    </div>
                    <span className="font-latin text-[10px] font-extrabold tracking-widest text-text-muted">
                      DADEHFA
                    </span>
                  </div>
                  <span className="font-latin rounded-full border border-border-light bg-text-main/5 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-text-main">
                    {item.badge}
                  </span>
                </div>

                <div className="relative z-10 my-3">
                  <LiveEngineVisual
                    id={item.id}
                    color={item.color}
                    is_active={is_active}
                  />
                </div>

                <div className="relative z-10 border-t border-border-light pt-3 text-start">
                  <h3 className="font-heading text-xl font-black text-text-main sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-body text-xs text-text-muted">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
