interface LandingSectionKickerProps {
  children: React.ReactNode;
  className?: string;
}

function LandingSectionKicker({
  children,
  className = "",
}: LandingSectionKickerProps) {
  return (
    <p
      className={`mb-[18px] mt-1.5 text-[14px] font-bold text-product-blue ${className}`}>
      {children}
    </p>
  );
}

export default LandingSectionKicker;
