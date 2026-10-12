import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import * as motion from "framer-motion/m";
import { ArrowDownLeft, ArrowUpLeft } from "lucide-react";
import LandingButton from "@/components/UI/LandingButton";
import LandingContainer from "@/components/UI/LandingContainer";
import DriftWall from "@/components/UI/DriftWall";
import { useTranslation } from "@/locale/useTranslation";
import { fa } from "@/locale/fa";
import { en } from "@/locale/en";

export default function ApplicationsSection() {
  const { locale, dir } = useTranslation();
  const content =
    locale === "fa" ? fa.applications_section : en.applications_section;
  const groups = Object.values(content.groups);
  const reducedMotion = useReducedMotion();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const updateLayout = () => setIsCompact(mediaQuery.matches);
    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  const wallItems = groups.flatMap((group) =>
    Object.values(group.assets).map((asset) => ({
      image: `/brand/applications/${asset.file}.webp`,
      title: `${asset.title} — ${group.title}`,
    })),
  );

  return (
    <section
      id="brand-applications"
      dir={dir}
      className="relative overflow-hidden border-y border-border-light py-[110px] text-text-main max-[1050px]:py-[90px] max-[700px]:py-[68px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-[-180px] h-[420px] w-[420px] rounded-full bg-brand-formula/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-190px] left-[14%] h-[420px] w-[420px] rounded-full bg-brand-master/[0.08] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 50%, #000 30%, transparent 100%)",
          }}
        />
      </div>

      <LandingContainer className="relative z-[1]">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="mb-[58px] grid grid-cols-[1fr_auto] items-end gap-8 max-[700px]:mb-10 max-[700px]:grid-cols-1">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[12px] font-medium text-text-dim">
              <span className="font-num font-bold text-product-formula">
                {content.kicker_num}
              </span>
              <span className="h-px w-8 bg-border-prominent" />
              <span>{content.kicker_title}</span>
            </div>
            <h2 className="m-0 max-w-3xl text-[clamp(34px,5vw,62px)] font-light leading-[1.28] tracking-[-0.035em]">
              {content.headline_part1}
              <br />
              <strong
                className={`font-black text-transparent bg-clip-text ${locale === "fa" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-brand-formula via-brand-master to-brand-accounting`}>
                {content.headline_strong}
              </strong>
            </h2>
          </div>
          <div className="max-w-[360px] pb-1 max-[700px]:max-w-xl">
            <p className="m-0 text-[14px] leading-[2.1] text-text-muted">
              {content.description}
            </p>
            <LandingButton
              href="#technical"
              variant="outline"
              size="sm"
              wrapperClassName="mt-4">
              {content.cta}
              {locale === "fa" ? (
                <ArrowDownLeft size={15} aria-hidden="true" />
              ) : (
                <ArrowUpLeft size={15} aria-hidden="true" />
              )}
            </LandingButton>
          </div>
        </motion.header>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7 }}
          className="relative h-[560px] w-screen max-[700px]:h-[420px]">
          <DriftWall
            items={wallItems}
            ariaLabel={content.gallery_aria}
            columns={isCompact ? 4 : 6}
            tileWidth={isCompact ? 104 : 188}
            tileHeight={isCompact ? 86 : 122}
            gap={isCompact ? 12 : 14}
            speed={reducedMotion ? 0 : 27}
            direction="up"
            turn={locale === "fa" ? -10 : 10}
            tilt={locale === "fa" ? 12 : -12}
            depth={128}
            fade={0.4}
            dim={0.74}
            grayscale
            className="absolute inset-0"
          />
        </motion.div>

        <ul className="sr-only" aria-label={content.image_list_aria}>
          {groups.map((group) => (
            <li key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.intro}</p>
              <ul>
                {Object.values(group.assets).map((asset) => (
                  <li key={asset.file}>{asset.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
