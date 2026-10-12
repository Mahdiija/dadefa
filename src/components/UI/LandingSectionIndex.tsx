interface LandingSectionIndexProps {
  children: React.ReactNode;
}

function LandingSectionIndex({ children }: LandingSectionIndexProps) {
  return (
    <div className="inline-block font-num text-[12px] tracking-[0.16em] text-product-accounting [direction:ltr]">
      {children}
    </div>
  );
}

export default LandingSectionIndex;
