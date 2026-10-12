interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Spacer = ({ size = "md", className }: SpacerProps) => {
  const sizes = {
    sm: "h-4",
    md: "h-8",
    lg: "h-16",
    xl: "h-32",
  };

  return (
    <div
      className={`w-full ${sizes[size]}  fluid-space ${className}`}
      aria-hidden="true"
    />
  );
};
