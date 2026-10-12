import type { PropsWithChildren } from "react";

interface LandingContainerProps extends PropsWithChildren {
  className?: string;
}

function LandingContainer({ children, className = "" }: LandingContainerProps) {
  return <div className={`container-landing ${className}`}>{children}</div>;
}

export default LandingContainer;
