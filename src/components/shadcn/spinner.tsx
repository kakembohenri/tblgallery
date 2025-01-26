import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "default";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", color = "primary", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("animate-spin", className)} {...props}>
        <Loader2
          className={cn("text-foreground", {
            "h-4 w-4": size === "sm",
            "h-6 w-6": size === "md",
            "h-8 w-8": size === "lg",
            "text-primary": color === "primary",
            "text-secondary": color === "secondary",
            "text-muted-foreground": color === "default",
          })}
        />
        <span className="sr-only">Loading</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };
