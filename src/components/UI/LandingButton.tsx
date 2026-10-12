import type { AnchorHTMLAttributes, CSSProperties } from "react";
import "./LandingButton.css";

type LandingButtonVariant = "primary" | "glass" | "outline";
type LandingButtonSize = "sm" | "md" | "lg";

interface LandingButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LandingButtonVariant;
  size?: LandingButtonSize;
  wrapperClassName?: string;
}

type LandingButtonStyle = CSSProperties & {
  "--landing-button-background"?: string;
  "--landing-button-foreground"?: string;
  "--landing-button-border"?: string;
  "--star-border-color"?: string;
};

function LandingButton({
  variant = "primary",
  size = "md",
  className = "",
  wrapperClassName = "",
  style,
  children,
  ...props
}: LandingButtonProps) {
  const baseStyles = [
    "group relative inline-flex w-fit select-none",
    "star-border-control cursor-pointer font-medium",
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  ].join(" ");

  const sizes: Record<LandingButtonSize, string> = {
    sm: "h-[40px] px-5 text-[12px]",
    md: "h-[48px] px-7 text-[13px]",
    lg: "h-[54px] px-8 text-[14px]",
  };

  const variants: Record<LandingButtonVariant, string> = {
    primary: "font-bold",
    glass: "font-semibold",
    outline: "font-semibold",
  };

  const { backgroundColor, color, borderColor, ...customStyle } = style ?? {};
  const buttonStyle = {
    ...customStyle,
    ...(backgroundColor && { "--landing-button-background": backgroundColor }),
    ...(color && { "--landing-button-foreground": color }),
    ...(borderColor && { "--landing-button-border": borderColor }),
    "--star-border-color": borderColor ?? "var(--landing-button-border)",
  } as LandingButtonStyle;

  return (
    <a
      {...(props as any)}
      style={buttonStyle}
      data-variant={variant}
      className={`${baseStyles} ${wrapperClassName}`}>
      <span
        className="star-border-control__light star-border-control__light--top"
        aria-hidden="true"
      />
      <span
        className="star-border-control__light star-border-control__light--bottom"
        aria-hidden="true"
      />
      <span
        className={`star-border-control__inner ${sizes[size]} ${variants[variant]} ${className}`}>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </span>
    </a>
  );
}

export default LandingButton;
