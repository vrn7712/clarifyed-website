import React from "react";
import { cn } from "../../lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  repeat?: number;
  reverse?: boolean;
  children: React.ReactNode;
}

export const Marquee = ({
  className,
  repeat = 4,
  reverse,
  children,
  ...props
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
        className
      )}
      {...props}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
              reverse ? "[animation-direction:reverse]" : "normal"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
};
