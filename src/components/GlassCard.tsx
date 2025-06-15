
import React from 'react';
import { cn } from "@/lib/utils";

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { delay?: number }
>(({ className, children, delay = 0, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      animationDelay: `${delay}ms`,
    }}
    className={cn(
      "group rounded-2xl bg-white/60 dark:bg-gray-800/80 shadow-xl backdrop-blur-xl border border-recicla-primary/10 dark:border-recicla-secondary/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-recicla-primary/20 dark:hover:shadow-recicla-secondary/20 animate-fade-in",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
GlassCard.displayName = "GlassCard";

export { GlassCard };
