"use client";

import React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputRef = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-4 py-3 rounded-full text-sm text-foreground bg-white/40 border border-slate-200/80 backdrop-blur-sm placeholder:text-slate-400 focus:bg-white/90 focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 focus:outline-none transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

InputRef.displayName = "Input";

export const Input = InputRef;
export default Input;
