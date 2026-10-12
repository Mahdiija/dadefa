import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/m";
import {
  DadefaLogoType,
  DadefaLogoSymbol,
  EnglishDadefaLogoType,
} from "./Logo";
import { useTranslation } from "@/locale/useTranslation";

interface HeaderBrandProps {
  is_scrolled: boolean;
}

function HeaderBrand({ is_scrolled }: HeaderBrandProps) {
  const { locale } = useTranslation();
  const LogoType = locale === "en" ? EnglishDadefaLogoType : DadefaLogoType;

  return (
    <a
      href="/"
      className="group relative flex items-center outline-none select-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      aria-label="داده‌فا، صفحه اصلی">
      <span className="relative z-10 flex shrink-0 items-center justify-center">
        <motion.span
          animate={{
            opacity: is_scrolled ? 0.2 : 0.4,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-full bg-brand-blue/20 blur-lg"
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-center size-8 rounded-lg bg-app-surface/30 border border-white/5 backdrop-blur-sm">
          <DadefaLogoSymbol
            className="size-5 text-product-blue"
            fill="currentColor"
          />
        </div>
      </span>

      <div className="absolute inset-y-0 start-full flex items-center pointer-events-none">
        <AnimatePresence mode="popLayout">
          {!is_scrolled && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: -8 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -8 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden flex items-center ps-3">
              <LogoType className="h-5 w-auto text-text-main" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </a>
  );
}

export default HeaderBrand;
