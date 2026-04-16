import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  repeat?: number; // How many times to duplicate internally to fill screen
  duration?: number;
  children: React.ReactNode;
}

export const Marquee = ({
  className,
  reverse,
  repeat = 4,
  duration = 40,
  children,
  ...props
}: MarqueeProps) => {
  // Multiply the children to ensure the single block is larger than the screen
  const arrayRepeat = Array.from({ length: repeat });
  
  return (
    <div
      className={cn(
        "flex overflow-hidden p-2 [--gap:1rem] gap-[var(--gap)] flex-row w-full",
        className
      )}
      {...props}
    >
      <motion.div
        className="flex shrink-0 w-max gap-[var(--gap)]"
        style={{ paddingRight: 'var(--gap)' }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* First Half */}
        <div className="flex shrink-0 w-max gap-[var(--gap)]">
          {arrayRepeat.map((_, i) => (
            <React.Fragment key={`half1-${i}`}>
              {children}
            </React.Fragment>
          ))}
        </div>
        
        {/* Second Half (Exact Duplicate for perfect -50% loop) */}
        <div className="flex shrink-0 w-max gap-[var(--gap)]">
          {arrayRepeat.map((_, i) => (
            <React.Fragment key={`half2-${i}`}>
              {children}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
