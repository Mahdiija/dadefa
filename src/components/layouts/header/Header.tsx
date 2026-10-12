import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/m";

import MobileMenu from "./components/MobileMenu";
import HeaderBrand from "./components/HeaderBrand";
import HeaderNavigation from "./components/HeaderNavigation";
import HeaderActions from "./components/HeaderActions";
import ThemeToggle from "./components/themeToggle";
import LanguageSwitcher from "./components/languageSwitcher";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        id="siteHeader"
        initial={false}
        animate={{
          maxWidth: isScrolled ? "1280px" : "1420px",
          paddingLeft: isScrolled ? "1.2rem" : "0.5rem", // افزایش پدینگ طرفین
          paddingRight: isScrolled ? "1.2rem" : "0.5rem",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 24,
          mass: 0.8,
        }}
        // اضافه شدن gap-x-6 یا gap-x-8 برای فاصله بین Brand و Nav و Actions
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1100] flex h-(--header-height) w-[calc(100%-2rem)] items-center justify-between gap-x-2 sm:gap-x-4 md:gap-x-8 rounded-2xl transition-colors duration-300 ${
          isScrolled
            ? "border border-border-prominent bg-app-bg/85 shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150"
            : "border border-transparent bg-transparent shadow-none"
        }`}>
        {/* یک رپر برای جلوگیری از تداخل بخش Brand با Nav */}
        <div className="flex items-center shrink-0">
          <HeaderBrand is_scrolled={isScrolled} />
        </div>

        {/* گسترش Navigation در فضای وسط */}
        <div className="flex-1 flex justify-center">
          <HeaderNavigation />
        </div>

        {/* کنترل فاصله در بخش اکشن‌ها */}
        <div className="flex items-center gap-x-1.5 sm:gap-x-3 shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
          <HeaderActions
            isMobileMenuOpen={isMobileMenuOpen}
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
