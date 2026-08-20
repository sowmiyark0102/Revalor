import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const styles: Record<string, string> = {
  neutral: "bg-paper-alt text-muted border-border",
  pine: "bg-pine/10 text-pine border-pine/20",
  copper: "bg-copper/10 text-copper-dark border-copper/25",
  success: "bg-pine/10 text-pine border-pine/20",
  pending: "bg-copper/10 text-copper-dark border-copper/25",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return <span className={cn("demo-tag", className)}>Demo data</span>;
}
