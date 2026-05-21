"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

export interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  glass?: boolean;
  animate?: boolean;
  children?: React.ReactNode;
}

const CardRef = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, glass = true, animate = true, children, ...props }, ref) => {
    const cardClass = cn(
      "rounded-3xl border text-foreground",
      glass ? "glass-panel shadow-premium" : "bg-background-card border-slate-200/60 shadow-premium",
      hoverEffect && "hover:border-slate-300 hover:shadow-cardHover transition-shadow duration-300",
      className
    );

    return (
      <motion.div
        ref={ref}
        whileHover={animate && hoverEffect ? { y: -4 } : undefined}
        transition={animate ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] } : undefined}
        className={cardClass}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

CardRef.displayName = "Card";

export const Card = CardRef;
export default Card;
