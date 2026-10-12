import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/m";
import { useTranslation } from "@/locale/useTranslation";
import LandingButton from "@/components/UI/LandingButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menu_items = [
  {
    href: "/#data-story",
    label_key: "nav.about",
  },
  {
    href: "/#products",
    label_key: "nav.products",
  },
  {
    href: "/#clients",
    label_key: "nav.clients",
  },
  {
    href: "/#retail",
    label_key: "nav.retail",
  },
  {
    href: "/blog",
    label_key: "nav.journal",
  },
  // {
  //   href: "#vision",
  //   label_key: "nav.vision",
  // },
] as const;

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          id="mobileMenu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-[1050] flex flex-col items-center justify-center gap-6 bg-app-bg/95 text-3xl font-black text-text-main backdrop-blur-2xl min-[1051px]:hidden">
          {menu_items.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                duration: 0.2,
                delay: index * 0.04,
                ease: "easeOut",
              }}
              className="text-text-muted transition-colors duration-200 hover:text-text-main active:scale-95">
              {t(item.label_key)}
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{
              duration: 0.2,
              delay: menu_items.length * 0.04,
              ease: "easeOut",
            }}
            className="mt-4 w-fit">
            <LandingButton
              href="#contact"
              onClick={onClose}
              size="sm"
              variant="glass">
              {t("nav.talk_request")}
            </LandingButton>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
