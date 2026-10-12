import { useThemeStore } from "@/store/Theme";
import { Sun, Moon } from "lucide-react";
import { flushSync } from "react-dom";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  const handleToggle = (e: React.MouseEvent) => {
    // بررسی پشتیبانی مرورگر از View Transitions
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // گرفتن موقعیت دکمه برای مرکز افکت دایره‌ای
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // اجرای ترنزیشن
    document
      .startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      })
      .ready.then(() => {
        // ایجاد افکت دایره‌ای (Clip-path)
        const clipPath = [
          `circle(0% at ${x}px ${y}px)`,
          `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          { clipPath: isDark ? [...clipPath].reverse() : clipPath },
          {
            duration: 600,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          },
        );
      });
  };

  return (
    <button
      dir="ltr"
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      className="relative flex h-[36px] w-[66px] cursor-pointer items-center overflow-hidden rounded-full border border-[var(--border-prominent)] bg-[var(--app-surface-glass)] p-[3px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors duration-200">
      <div className="absolute inset-0 flex items-center justify-between px-[8px] text-[var(--text-dim)] pointer-events-none">
        <Moon size={14} />
        <Sun size={14} />
      </div>

      <div
        className={`z-10 grid h-[28px] w-[28px] place-items-center rounded-full border border-[var(--border-light)] bg-[var(--app-surface-subtle)] text-[var(--text-main)] shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDark ? "translate-x-0" : "translate-x-[32px]"
        }`}>
        {isDark ? (
          <Moon size={14} className="text-[#cdc392]" />
        ) : (
          <Sun size={14} className="text-[#0353a4]" />
        )}
      </div>
    </button>
  );
}
