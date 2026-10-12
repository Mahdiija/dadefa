import { useTranslation } from "@/locale/useTranslation";
import clsx from "clsx";
import * as motion from "framer-motion/m";
import LandingButton from "@/components/UI/LandingButton";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

function HeaderActions({ isMobileMenuOpen, onMenuToggle }: HeaderActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-[12px]">
      <LandingButton
        href="#contact"
        size="sm"
        variant="glass"
        wrapperClassName="max-[1050px]:hidden!">
        {t("nav.talk_request")}
      </LandingButton>

      <button
        id="menuToggle"
        type="button"
        aria-label={isMobileMenuOpen ? t("nav.close_menu") : t("nav.open_menu")}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobileMenu"
        onClick={onMenuToggle}
        className={clsx(
          "relative hidden size-[42px] cursor-pointer border-0 bg-transparent text-text-main",
          "max-[1050px]:block",
        )}>
        <motion.span
          className="absolute right-[10px] top-[16px] h-px w-[22px] bg-text-main transition-colors duration-250"
          animate={
            isMobileMenuOpen
              ? {
                  y: 4,
                  rotate: 45,
                }
              : {
                  y: 0,
                  rotate: 0,
                }
          }
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="absolute right-[10px] top-[24px] h-px w-[22px] bg-text-main transition-colors duration-250"
          animate={
            isMobileMenuOpen
              ? {
                  y: -4,
                  rotate: -45,
                }
              : {
                  y: 0,
                  rotate: 0,
                }
          }
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
        />
      </button>
    </div>
  );
}

export default HeaderActions;
