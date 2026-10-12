import React from "react";
import { clsx, type ClassValue } from "clsx";

/**
 * Helper برای ترکیب کلاس‌های Tailwind و جلوگیری از تداخل
 */
function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

type ButtonVariant = "solid" | "outline" | "glass" | "ghost" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

// اگر href داده شود، کامپوننت به تگ <a> تبدیل می‌شود
interface LinkProps extends BaseProps {
  href: string;
  target?: "_blank" | "_self";
  onClick?: never;
}

// اگر href داده نشود، کامپوننت به تگ <button> تبدیل می‌شود
interface ButtonProps extends BaseProps {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

type AppButtonProps = LinkProps | ButtonProps;
const AppButton = ({
  label,
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: AppButtonProps) => {
  // تعریف استایل‌های واریانت بر اساس توکن‌های Nexi و کدی که قبلاً داشتید
  const variants: Record<ButtonVariant, string> = {
    // استایل خاص شما با سایه داخلی (Inset Shadow)
    glass:
      "border   border-brand-blue text-white bg-brand-indigo shadow-[inset_0px_0px_20px_0px_var(--color-brand-blue)] hover:bg-brand-blue hover:shadow-none",

    // استایل توپر (Solid)
    solid:
      "border  border-brand-blue cta-button  text-white      shadow-[inset_0px_0px_20px_0px_var(--color-brand-blue)]   ",
    // استایل دورخط (Outline)
    outline:
      "border border-brand-blue  cta-outline text-white  hover:shadow-none shadow-[inset_0px_0px_20px_0px_var(--color-brand-blue)] ",
    secondary:
      "border  border-brand-blue   bg-brand-indigo text-white bg-brand-indigo shadow-[inset_0px_0px_20px_0px_var(--color-brand-blue)] hover:bg-brand-blue hover:shadow-none",
    ghost: "text-product-blue hover:bg-brand-paper/10",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const baseClasses = cn(
    " block z-1   cursor-pointer transition duration-400  rounded-full font-brand-persian  w-max  relative disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  const content = children || label || "درخواست مشاوره";

  if (href) {
    const { target, ...linkProps } = props as LinkProps;
    return (
      <a
        href={href}
        className={baseClasses}
        target={target || "_blank"}
        rel="noreferrer"
        {...(linkProps as any)}>
        {content}
      </a>
    );
  }

  const { onClick, type, ...buttonProps } = props as ButtonProps;
  return (
    <button
      type={type || "button"}
      className={baseClasses}
      onClick={onClick}
      {...(buttonProps as any)}>
      {content}
    </button>
  );
};

export default AppButton;
