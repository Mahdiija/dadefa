import { useEffect, useRef } from "react";
import LandingButton from "@/components/UI/LandingButton";
import LandingContainer from "@/components/UI/LandingContainer";
import * as motion from "framer-motion/m";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease },
};
const contact_configs = [
  {
    key: "email",
    label_key: "contact_section.info_items.email.label",
    value_key: "contact_section.info_items.email.value",
    badge_key: "contact_section.info_items.email.badge",
    href: "mailto:info@dadehfa.ir",
  },
  {
    key: "website",
    label_key: "contact_section.info_items.website.label",
    value_key: "contact_section.info_items.website.value",
    badge_key: "contact_section.info_items.website.badge",
    href: "https://dadehfa.com",
  },
] as const;

export default function Contact() {
  const { t } = useTranslation();

  const contact_info = contact_configs.map((config) => ({
    key: config.key,
    label: t(config.label_key),
    value: t(config.value_key),
    badge: t(config.badge_key),
    href: config.href,
  }));

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[120px] text-text-main max-[1050px]:py-[95px] max-[700px]:py-[75px]">
      <InteractiveDataParticles />

      <LandingContainer className="relative z-[2]">
        <div className="group relative overflow-hidden rounded-[28px] border border-border-light/60 bg-app-surface/65 p-[64px] shadow-2xl backdrop-blur-2xl transition-colors duration-500 max-[1050px]:p-[40px] max-[700px]:p-[24px]">
          <CardFlowingWaves />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[100px] -top-[100px] h-[340px] w-[340px] rounded-full bg-brand-cube/[0.08] blur-[90px] dark:bg-brand-cube/[0.16]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[90px] -left-[90px] h-[300px] w-[300px] rounded-full bg-brand-master/[0.06] blur-[100px] dark:bg-brand-master/[0.14]"
          />

          <div className="relative z-10 grid grid-cols-[1.25fr_0.75fr] items-center gap-[64px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[40px]">
            <motion.div {...reveal}>
              <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
                <span className="font-bold font-num text-product-cube">
                  {t("contact_section.kicker_num")}
                </span>
                <span className="h-px w-[32px] bg-border-prominent" />
                <span>{t("contact_section.kicker_title")}</span>
              </div>

              <h2 className="mt-[16px] text-[clamp(32px,4.2vw,54px)] font-light leading-[1.22] tracking-[-0.03em] text-text-main">
                {t("contact_section.headline_part1")} <br />
                <strong className="font-black">
                  {t("contact_section.headline_strong")}
                </strong>
              </h2>

              <p className="mt-[20px] max-w-[560px] text-[15px] font-light leading-[2.1] text-text-muted">
                {t("contact_section.description")}
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              className="flex flex-col gap-[20px] border-r border-border-light/40 pr-[40px] rtl:border-r rtl:border-l-0 rtl:pr-[40px] rtl:pl-0 ltr:border-l ltr:border-r-0 ltr:pl-[40px] ltr:pr-0 max-[1050px]:border-r-0 max-[1050px]:border-t max-[1050px]:pr-0 max-[1050px]:pt-[32px] max-[1050px]:rtl:border-r-0 max-[1050px]:ltr:border-l-0 max-[1050px]:ltr:pl-0">
              <div className="flex flex-col gap-[12px]">
                {contact_info.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.key === "website" ? "_blank" : undefined}
                    rel={
                      item.key === "website" ? "noopener noreferrer" : undefined
                    }
                    className="group flex  items-center justify-between rounded-[16px] border border-border-light/50 bg-app-surface-subtle/50 p-[16px] backdrop-blur-md transition-all duration-300 hover:border-border-prominent hover:bg-app-surface">
                    <div>
                      <div className="text-[11px] text-text-dim">
                        {item.label}
                      </div>
                      <div className="mt-[4px] font-brand-latin text-[14px] font-semibold text-text-main transition-colors ">
                        {item.value}
                      </div>
                    </div>

                    <span className="rounded-full border border-border-light/60 bg-app-surface/60 px-[10px] py-[3px] text-[10px] text-text-dim backdrop-blur-sm">
                      {item.badge}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-[8px] flex items-center justify-between gap-[16px]">
                <LandingButton
                  href="mailto:info@dadehfa.ir"
                  wrapperClassName="grow!"
                  className="grow!"
                  variant="primary">
                  {t("contact_section.cta_button")}
                </LandingButton>
              </div>
            </motion.div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

function CardFlowingWaves() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animation_frame_id: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const is_dark = () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    let step = 0;
    const pointer = {
      x: width * 0.5,
      y: height * 0.5,
      target_x: width * 0.5,
      target_y: height * 0.5,
    };

    const handle_resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handle_pointer_move = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.target_x = e.clientX - rect.left;
      pointer.target_y = e.clientY - rect.top;
    };

    window.addEventListener("resize", handle_resize);
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handle_pointer_move);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.target_x - pointer.x) * 0.05;
      pointer.y += (pointer.target_y - pointer.y) * 0.05;
      step += 0.008;

      const dark_mode = is_dark();
      const wave_opacity = dark_mode ? 0.09 : 0.045;

      const lines = 4;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const base_y = height * 0.5 + Math.sin(step + i) * 35;
        const color = i % 2 === 0 ? "4, 104, 250" : "101, 69, 151";

        ctx.moveTo(0, base_y);

        for (let x = 0; x <= width; x += 20) {
          const dx = pointer.x - x;
          const dy = pointer.y - base_y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / 320) * 45;

          const y =
            base_y +
            Math.sin(x * 0.005 + step * 2 + i * 1.2) * 40 +
            Math.cos(x * 0.003 - step + i) * 25 +
            pull;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `rgba(${color}, ${wave_opacity * 1.5})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = grad;
        ctx.fill();
      }

      animation_frame_id = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handle_resize);
      parent?.removeEventListener("mousemove", handle_pointer_move);
      cancelAnimationFrame(animation_frame_id);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] opacity-90 transition-opacity duration-700 dark:mix-blend-screen">
      <canvas ref={canvas_ref} className="h-full w-full" />
    </div>
  );
}

function InteractiveDataParticles() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animation_frame_id: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const is_dark = () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    const particle_count = Math.min(Math.floor((width * height) / 18000), 55);
    const connection_distance = 135;
    const mouse_distance = 160;

    const mouse = { x: -1000, y: -1000 };

    const particles = Array.from({ length: particle_count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1,
    }));

    const handle_resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handle_pointer_move = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handle_pointer_leave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handle_resize);
    window.addEventListener("mousemove", handle_pointer_move);
    document.addEventListener("mouseleave", handle_pointer_leave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const dark_mode = is_dark();

      const particle_alpha = dark_mode ? 0.35 : 0.22;
      const line_base_alpha = dark_mode ? 0.18 : 0.1;
      const rgb = dark_mode ? "4, 104, 250" : "78, 20, 140";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx_m = mouse.x - p.x;
        const dy_m = mouse.y - p.y;
        const dist_m = Math.sqrt(dx_m * dx_m + dy_m * dy_m);

        if (dist_m < mouse_distance) {
          const force = (1 - dist_m / mouse_distance) * 0.8;
          p.x -= (dx_m / dist_m) * force;
          p.y -= (dy_m / dist_m) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${particle_alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connection_distance) {
            const alpha = (1 - dist / connection_distance) * line_base_alpha;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animation_frame_id = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handle_resize);
      window.removeEventListener("mousemove", handle_pointer_move);
      document.removeEventListener("mouseleave", handle_pointer_leave);
      cancelAnimationFrame(animation_frame_id);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />
      <canvas
        ref={canvas_ref}
        className="h-full w-full opacity-80 transition-opacity duration-700"
      />
    </div>
  );
}
