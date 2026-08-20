import { Bell } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-paper/90 px-5 py-5 backdrop-blur sm:px-8">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      <button
        aria-label="Notifications"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted hover:text-ink"
      >
        <Bell className="h-5 w-5" strokeWidth={1.8} />
      </button>
    </div>
  );
}
