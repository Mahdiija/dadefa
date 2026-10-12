import * as motion from "framer-motion/m";
import LandingContainer from "@/components/UI/LandingContainer";
import { useTranslation } from "@/locale/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease },
};

const pillar_configs = [
  {
    key: "db",
    code_key: "technical_section.pillars.db.code",
    title_key: "technical_section.pillars.db.title",
    desc_key: "technical_section.pillars.db.desc",
    color: "var(--color-brand-cube)",
  },
  {
    key: "api",
    code_key: "technical_section.pillars.api.code",
    title_key: "technical_section.pillars.api.title",
    desc_key: "technical_section.pillars.api.desc",
    color: "var(--color-brand-formula)",
  },
  {
    key: "ops",
    code_key: "technical_section.pillars.ops.code",
    title_key: "technical_section.pillars.ops.title",
    desc_key: "technical_section.pillars.ops.desc",
    color: "var(--color-brand-accounting)",
  },
  {
    key: "bi",
    code_key: "technical_section.pillars.bi.code",
    title_key: "technical_section.pillars.bi.title",
    desc_key: "technical_section.pillars.bi.desc",
    color: "var(--color-brand-master)",
  },
] as const;

const architecture_tag_keys = [
  "technical_section.tags.relational_db",
  "technical_section.tags.server_layers",
  "technical_section.tags.web_service_api",
  "technical_section.tags.realtime_reporting",
  "technical_section.tags.bi_analytics",
  "technical_section.tags.web_workflow",
] as const;

export default function Technical() {
  const { t } = useTranslation();

  const pillars = pillar_configs.map((config) => ({
    key: config.key,
    code: t(config.code_key),
    title: t(config.title_key),
    desc: t(config.desc_key),
    color: config.color,
  }));

  const architecture_tags = architecture_tag_keys.map((key) => ({
    key,
    label: t(key),
  }));

  return (
    <section
      id="technical"
      className="relative overflow-hidden py-[110px] text-text-main max-[1050px]:py-[90px] max-[700px]:py-[70px]">
      <TechnicalAtmosphere />

      <LandingContainer className="relative z-[2]">
        <div className="grid grid-cols-[0.9fr_1.1fr] items-start gap-[80px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[48px]">
          <motion.div {...reveal} className="relative z-[5]">
            <div className="flex items-center gap-[12px] text-[13px] text-text-dim">
              <span className="font-num font-bold text-product-accounting">
                {t("technical_section.kicker_num")}
              </span>
              <span className="h-px w-[32px] bg-border-prominent" />
              <span>{t("technical_section.kicker_title")}</span>
            </div>

            <h2 className="mt-[16px] text-[clamp(34px,4.5vw,56px)] font-light leading-[1.2] tracking-[-0.03em] text-text-main">
              {t("technical_section.headline_part1")} <br />
              <strong className="font-black">
                {t("technical_section.headline_strong")}
              </strong>
            </h2>

            <p className="mt-[24px] text-[15px] leading-[2.1] text-text-muted">
              {t("technical_section.description")}
            </p>

            <div className="mt-[36px] flex flex-wrap gap-[10px]">
              {architecture_tags.map((tag) => (
                <span
                  key={tag.key}
                  className="rounded-[10px] border border-border-light bg-app-surface-subtle px-[14px] py-[8px] text-[12px] text-text-dim backdrop-blur-md transition-all duration-200 hover:border-border-prominent hover:bg-app-surface hover:text-text-main">
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid grid-cols-2 gap-[16px] max-[600px]:grid-cols-1">
            {pillars.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: idx * 0.06, duration: 0.55, ease }}
                className="group relative flex flex-col justify-between rounded-[20px] border border-border-light bg-app-surface p-[26px] backdrop-blur-xl transition-all duration-300 hover:border-border-prominent hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between border-b border-border-light pb-[14px]">
                    <span
                      className=" text-[12px] font-bold tracking-[0.12em]"
                      style={{ color: item.color }}>
                      {item.code}
                    </span>
                    <span
                      className="h-[8px] w-[8px] rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`,
                      }}
                    />
                  </div>

                  <h3 className="mt-[16px] text-[16px] font-bold text-text-main">
                    {item.title}
                  </h3>
                  <p className="mt-[10px] text-[13px] leading-[1.9] text-text-muted">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-[22px] flex items-center justify-between border-t border-border-light pt-[12px]">
                  <span className="text-[11px] text-text-dim">
                    {t("technical_section.card_footer_label")}
                  </span>
                  <span className="text-[11px] font-medium text-text-muted group-hover:text-text-main">
                    {t("technical_section.card_footer_badge")}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </LandingContainer>
    </section>
  );
}

function TechnicalAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[10%] top-[-80px] h-[460px] w-[460px] rounded-full bg-brand-accounting/[0.06] blur-[140px]" />
      <div className="absolute bottom-[-60px] left-[15%] h-[480px] w-[480px] rounded-full bg-brand-master/[0.08] blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 65% 50% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />
    </div>
  );
}
