import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pine">
            <span className="h-2.5 w-2.5 rounded-sm bg-copper" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Revalor</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#how-it-works" className="text-sm text-muted hover:text-ink">
            How it works
          </a>
          <a href="/#categories" className="text-sm text-muted hover:text-ink">
            Categories
          </a>
          <a href="/#organizations" className="text-sm text-muted hover:text-ink">
            For organizations
          </a>
          <Link href="/recyclers" className="text-sm text-muted hover:text-ink">
            Find a recycler
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/scan" size="sm">
            Scan your waste
          </Button>
        </div>
      </div>
    </header>
  );
}
