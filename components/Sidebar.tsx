"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ScanLine,
  Package,
  Truck,
  Award,
  Leaf,
  MapPinned,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/scan", label: "Scan waste", icon: ScanLine },
  { href: "/dashboard/items", label: "My items", icon: Package },
  { href: "/pickup", label: "Collections", icon: Truck },
  { href: "/rewards", label: "Rewards", icon: Award },
  { href: "/impact", label: "Impact", icon: Leaf },
  { href: "/recyclers", label: "Find a recycler", icon: MapPinned },
];

const NAV_BOTTOM = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pine">
          <span className="h-2.5 w-2.5 rounded-sm bg-copper" />
        </span>
        <span className="font-display text-lg font-semibold">Revalor</span>
      </div>

      <nav className="flex flex-1 flex-col justify-between px-3 py-6">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-pine/10 text-pine" : "text-muted hover:bg-paper-alt hover:text-ink"
                  )}
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="space-y-1 border-t border-border pt-4">
          {NAV_BOTTOM.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-pine/10 text-pine" : "text-muted hover:bg-paper-alt hover:text-ink"
                  )}
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const tabs = NAV.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white/95 backdrop-blur md:hidden">
      {tabs.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px]",
              active ? "text-pine" : "text-muted"
            )}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.8} />
            {item.label === "Find a recycler" ? "Recyclers" : item.label}
          </Link>
        );
      })}
    </nav>
  );
}
