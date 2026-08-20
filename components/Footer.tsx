import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pine">
              <span className="h-2.5 w-2.5 rounded-sm bg-copper" />
            </span>
            <span className="font-display text-lg font-semibold">Revalor</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Give waste its next value. Revalor helps people and organizations identify,
            recover, and responsibly redirect electronic waste.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Product</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/scan" className="hover:text-ink">Scan waste</Link></li>
            <li><Link href="/recyclers" className="hover:text-ink">Find a recycler</Link></li>
            <li><Link href="/impact" className="hover:text-ink">Impact</Link></li>
            <li><Link href="/org" className="hover:text-ink">Organizations</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Company</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#" className="hover:text-ink">About</a></li>
            <li><a href="#" className="hover:text-ink">Partner with us</a></li>
            <li><a href="#" className="hover:text-ink">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container-page text-xs text-muted">
          © 2026 Revalor. Prototype product — figures on this site are demo data unless stated otherwise.
        </p>
      </div>
    </footer>
  );
}
