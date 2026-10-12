import type { AnchorHTMLAttributes } from "react";

interface LandingTextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

function LandingTextLink({
  children,
  className = "",
  ...props
}: LandingTextLinkProps) {
  return (
    <a
      {...props}
      className={`
        text-[13px] font-medium
        text-[rgba(var(--brand-paper-rgb),0.72)]
        underline decoration-[rgba(var(--brand-paper-rgb),0.25)]
        underline-offset-4
        transition-colors duration-300
        hover:text-white
        ${className}
      `}>
      {children}
    </a>
  );
}

export default LandingTextLink;
