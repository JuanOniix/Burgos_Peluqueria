import { cn } from "@/lib/utils";

export function VerticalLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none block origin-left translate-y-full -rotate-90 text-xs font-medium tracking-[0.3em] whitespace-nowrap uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
