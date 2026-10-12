import { useRef } from "react";
import { useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import * as motion from "framer-motion/m";
import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease },
};

const product_configs = [
  {
    id: "master",
    number_key: "products_section.items.master.number",
    category_key: "products_section.items.master.category",
    name_key: "products_section.items.master.name",
    title_key: "products_section.items.master.title",
    description_key: "products_section.items.master.description",
    note_key: "products_section.items.master.note",
    stat_highlight_key: "products_section.items.master.stat_highlight",
    chip_keys: [
      "products_section.items.master.chips.0",
      "products_section.items.master.chips.1",
      "products_section.items.master.chips.2",
      "products_section.items.master.chips.3",
      "products_section.items.master.chips.4",
      "products_section.items.master.chips.5",
    ],
    color: "#4E148C",
    rgb: "78, 20, 140",
    glow: "rgba(78, 20, 140, 0.35)",
    grid_class: "lg:col-span-8 lg:row-span-1",
  },
  {
    id: "formula",
    number_key: "products_section.items.formula.number",
    category_key: "products_section.items.formula.category",
    name_key: "products_section.items.formula.name",
    title_key: "products_section.items.formula.title",
    description_key: "products_section.items.formula.description",
    note_key: "products_section.items.formula.note",
    stat_highlight_key: "products_section.items.formula.stat_highlight",
    chip_keys: [
      "products_section.items.formula.chips.0",
      "products_section.items.formula.chips.1",
      "products_section.items.formula.chips.2",
      "products_section.items.formula.chips.3",
    ],
    color: "#654597",
    rgb: "101, 69, 151",
    glow: "rgba(101, 69, 151, 0.35)",
    grid_class: "lg:col-span-4 lg:row-span-1",
  },
  {
    id: "cube",
    number_key: "products_section.items.cube.number",
    category_key: "products_section.items.cube.category",
    name_key: "products_section.items.cube.name",
    title_key: "products_section.items.cube.title",
    description_key: "products_section.items.cube.description",
    note_key: "products_section.items.cube.note",
    stat_highlight_key: "products_section.items.cube.stat_highlight",
    chip_keys: [
      "products_section.items.cube.chips.0",
      "products_section.items.cube.chips.1",
      "products_section.items.cube.chips.2",
      "products_section.items.cube.chips.3",
    ],
    color: "#0468FA",
    rgb: "4, 104, 250",
    glow: "rgba(4, 104, 250, 0.35)",
    grid_class: "lg:col-span-5 lg:row-span-1",
  },
  {
    id: "accounting",
    number_key: "products_section.items.accounting.number",
    category_key: "products_section.items.accounting.category",
    name_key: "products_section.items.accounting.name",
    title_key: "products_section.items.accounting.title",
    description_key: "products_section.items.accounting.description",
    note_key: "products_section.items.accounting.note",
    stat_highlight_key: "products_section.items.accounting.stat_highlight",
    chip_keys: [
      "products_section.items.accounting.chips.0",
      "products_section.items.accounting.chips.1",
      "products_section.items.accounting.chips.2",
      "products_section.items.accounting.chips.3",
    ],
    color: "#D96E7D",
    rgb: "217, 110, 125",
    glow: "rgba(217, 110, 125, 0.35)",
    grid_class: "lg:col-span-7 lg:row-span-1",
  },
] as const;

export default function Products() {
  const { t } = useTranslation();

  const products = product_configs.map((config) => ({
    id: config.id,
    color: config.color,
    rgb: config.rgb,
    glow: config.glow,
    grid_class: config.grid_class,
    number: t(config.number_key),
    category: t(config.category_key),
    name: t(config.name_key),
    title: t(config.title_key),
    description: t(config.description_key),
    note: t(config.note_key),
    stat_highlight: t(config.stat_highlight_key),
    chips: config.chip_keys.map((chip_key) => t(chip_key)),
  }));

  return (
    <section
      id="products"
      className="relative overflow-hidden py-[110px] text-text-main max-[1050px]:py-[90px] max-[700px]:py-[70px]">
      <ProductsAtmosphere />

      <LandingContainer className="relative z-[2]">
        <motion.div
          {...reveal}
          className="mb-[60px] flex items-end justify-between border-b border-border-light/40 pb-[24px] max-[1050px]:flex-col max-[1050px]:items-start max-[1050px]:gap-[20px]">
          <div>
            <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
              <span className="font-bold font-num text-product-accounting">
                {t("products_section.num")}
              </span>
              <span className="h-px w-[32px] bg-border-prominent" />
              <span>{t("products_section.kicker")}</span>
            </div>

            <h2 className="mt-[14px] text-[clamp(34px,4.5vw,56px)] font-light leading-[1.2] tracking-[-0.03em] text-text-main">
              {t("products_section.headline_part1")} <br />
              <strong className="font-black">
                {t("products_section.headline_strong")}
              </strong>
            </h2>
          </div>

          <p className="m-0 max-w-[440px] text-[14px] leading-[2.1] text-text-muted font-light">
            {t("products_section.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-12">
          {products.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

function ProductCard({
  item,
  index,
}: {
  item: {
    id: string;
    number: string;
    category: string;
    name: string;
    title: string;
    description: string;
    chips: string[];
    note: string;
    color: string;
    rgb: string;
    glow: string;
    grid_class: string;
    stat_highlight: string;
  };
  index: number;
}) {
  const card_ref = useRef<HTMLDivElement>(null);

  const raw_x = useMotionValue(200);
  const raw_y = useMotionValue(150);

  const smooth_x = useSpring(raw_x, { damping: 26, stiffness: 200, mass: 0.5 });
  const smooth_y = useSpring(raw_y, { damping: 26, stiffness: 200, mass: 0.5 });

  const handle_mouse_move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card_ref.current) return;
    const rect = card_ref.current.getBoundingClientRect();
    raw_x.set(e.clientX - rect.left);
    raw_y.set(e.clientY - rect.top);
  };

  const inner_gradient = useMotionTemplate`radial-gradient(480px circle at ${smooth_x}px ${smooth_y}px, rgba(${item.rgb}, var(--card-glow-inner-start, 0.16)) 0%, rgba(${item.rgb}, var(--card-glow-inner-mid, 0.04)) 45%, transparent 75%)`;
  const border_gradient = useMotionTemplate`radial-gradient(340px circle at ${smooth_x}px ${smooth_y}px, rgba(${item.rgb}, var(--card-glow-border, 0.35)) 0%, rgba(${item.rgb}, 0.05) 50%, transparent 80%)`;

  return (
    <motion.div
      ref={card_ref}
      onMouseMove={handle_mouse_move}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease }}
      className={`group relative min-h-[390px] flex flex-col justify-between overflow-hidden rounded-[28px] border border-border-light/50 bg-app-surface/65 p-[32px] shadow-[0_18px_55px_-38px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-0.5 hover:border-border-prominent/60 hover:shadow-[0_22px_50px_-36px_rgba(0,0,0,0.4)] max-[700px]:min-h-[360px] max-[700px]:rounded-[24px] max-[700px]:p-[22px] [--card-glow-border:0.1] [--card-glow-inner-mid:0.01] [--card-glow-inner-start:0.04] dark:[--card-glow-border:0.22] dark:[--card-glow-inner-mid:0.02] dark:[--card-glow-inner-start:0.08] ${item.grid_class}`}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          background: border_gradient,
          maskImage:
            "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskImage:
            "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 dark:mix-blend-screen"
        style={{
          background: inner_gradient,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[70px] -left-[70px] h-[220px] w-[220px] rounded-full opacity-[0.04] blur-[80px] transition-opacity duration-500 group-hover:opacity-[0.08] dark:opacity-[0.09] dark:group-hover:opacity-[0.16]"
        style={{ backgroundColor: item.color }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[190px] w-[190px] overflow-hidden opacity-50 transition-transform duration-700 group-hover:scale-105 rtl:right-auto rtl:left-0">
        <div
          className="absolute -right-[74px] -top-[86px] h-[210px] w-[210px] rounded-full border opacity-20 rtl:right-auto rtl:-left-[74px]"
          style={{ borderColor: item.color }}
        />
        <div
          className="absolute -right-[42px] -top-[54px] h-[146px] w-[146px] rounded-full border opacity-25 rtl:right-auto rtl:-left-[42px]"
          style={{ borderColor: item.color }}
        />
        <div
          className="absolute right-[34px] top-[38px] h-[7px] w-[7px] rounded-full rtl:right-auto rtl:left-[34px]"
          style={{
            backgroundColor: item.color,
            boxShadow: `0 0 24px 8px ${item.glow}`,
          }}
        />
        <span className="absolute right-[30px] top-[75px] font-num  text-[58px] font-black leading-none tracking-[-0.08em] opacity-[0.08] rtl:right-auto rtl:left-[30px]">
          {item.number}
        </span>
      </div>

      <div className="relative z-10">
        <div className="relative flex items-center justify-between border-b border-border-light/45 pb-[16px]">
          <div className="flex items-center gap-[10px]">
            <span
              className="h-[8px] w-[8px] rounded-full transition-transform duration-300 group-hover:scale-125"
              style={{
                backgroundColor: item.color,
                boxShadow: `0 0 10px ${item.color}60`,
              }}
            />
            <span className="font-bold  font-num text-text-dim text-[12px]">
              {item.number}
            </span>
            <span className="h-px w-[16px] bg-border-light/40" />
            <span className="text-[12px] text-text-muted font-light">
              {item.category}
            </span>
          </div>

          <span className="rounded-full border border-border-light/40 bg-app-surface-subtle/30 px-[10px] py-[3px] text-[11px] text-text-muted backdrop-blur-md">
            {item.stat_highlight}
          </span>
        </div>

        <div className="relative mt-[32px] flex flex-wrap items-baseline gap-x-[12px] gap-y-[4px]">
          <h3 className="m-0 text-[clamp(30px,3vw,40px)] font-black text-text-main tracking-[-0.045em]">
            {item.name}
          </h3>
          <span className="text-[14px] font-normal text-text-dim">
            {item.title}
          </span>
        </div>

        <p className="relative mt-[14px] max-w-[58ch] text-[14px] leading-[2] text-text-muted font-light">
          {item.description}
        </p>

        <div className="relative mt-[22px] flex flex-wrap gap-[8px]">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border-light/50 bg-app-surface-subtle/40 px-[12px] py-[6px] text-[11px] text-text-muted transition-all duration-300 group-hover:border-border-prominent/50 group-hover:bg-app-surface/70 backdrop-blur-md">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-[28px] border-t border-border-light/35 pt-[16px]">
        <p
          className="m-0 border-r-2 rtl:border-r-2 rtl:border-l-0 ltr:border-l-2 ltr:border-r-0 pr-[12px] rtl:pr-[12px] rtl:pl-0 ltr:pl-[12px] ltr:pr-0 text-[12px] leading-[1.9] text-text-dim font-light"
          style={{ borderColor: item.color }}>
          {item.note}
        </p>
      </div>
    </motion.div>
  );
}

function ProductsAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[250px] top-[10%] h-[700px] w-[700px] rounded-full bg-brand-formula/[0.04] blur-[180px] dark:bg-brand-formula/[0.03]" />
      <div className="absolute -right-[250px] bottom-[10%] h-[700px] w-[700px] rounded-full bg-brand-cube/[0.04] blur-[180px] dark:bg-brand-cube/[0.03]" />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
        }}
      />
    </div>
  );
}
