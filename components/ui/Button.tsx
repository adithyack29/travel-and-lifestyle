"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "purple";
  size?: "sm" | "md" | "lg";
}

const ButtonRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, type = "button", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-display font-medium rounded-full transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90 shadow-premium",
      secondary: "bg-background-muted text-foreground hover:bg-background-muted/80 border border-border",
      outline: "bg-white/40 border border-slate-200/80 backdrop-blur-sm text-foreground hover:bg-white/70 hover:border-slate-300",
      ghost: "text-foreground hover:bg-slate-100",
      cyan: "bg-brand-cyan text-white hover:bg-brand-cyan/95 hover:shadow-glow shadow-premium",
      purple: "bg-gradient-to-r from-brand-purple to-[#A78BFA] text-white hover:shadow-lg shadow-premium",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5 h-9",
      md: "text-sm px-6 py-3 gap-2 h-11",
      lg: "text-base px-8 py-4 gap-2.5 h-14",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

ButtonRef.displayName = "Button";

export const Button = ButtonRef;
export default Button;
