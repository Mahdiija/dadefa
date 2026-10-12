import React from "react";
import clsx from "clsx";

export default function GlassSurface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl border",
        "bg-white/6 border-white/[0.14]",
        "shadow-[0_6px_6px_rgba(2,6,23,0.10)]",
        "backdrop-blur-md",
        className,
      )}>
      {/* highlight overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--brand-paper-rgb),0.16), rgba(var(--brand-paper-rgb),0.04) 45%, rgba(var(--brand-paper-rgb),0.02))",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
