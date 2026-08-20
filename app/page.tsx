import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Badge";
import {
  ScanLine,
  Sparkles,
  Route,
  MapPinned,
  Activity,
  Smartphone,
  Laptop,
  Tablet,
  Plug,
  Cable,
  Keyboard,
  Cpu,
  Fan,
  ArrowUpRight,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Scan",
    icon: ScanLine,
    desc: "Upload a photo or use your camera to capture the item you want to recover.",
  },
  {
    n: "02",
    title: "Understand",
    icon: Sparkles,
    desc: "AI identifies the item, its likely category, materials, and condition.",
  },
  {
    n: "03",
    title: "Recover",
    icon: Route,
    desc: "Get a ranked recommendation — repair, reuse, resell, recycle, or safe disposal.",
  },
  {
    n: "04",
    title: "Connect",
    icon: MapPinned,
    desc: "Find a verified collection or recycling partner near you and request pickup.",
  },
  {
    n: "05",
    title: "Track",
    icon: Activity,
    desc: "Follow the item's recovery journey and see your environmental impact.",
  },
];

const CATEGORIES = [
  { label: "Smartphones", icon: Smartphone },
  { label: "Laptops", icon: Laptop },
  { label: "Tablets", icon: Tablet },
  { label: "Chargers", icon: Plug },
  { label: "Cables", icon: Cable },
  { label: "Keyboards", icon: Keyboard },
  { label: "Computer components", icon: Cpu },
  { label: "Small appliances", icon: Fan },
];

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <CategoriesSection />
      <ImpactSection />
      <OrganizationsSection />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div className="absolute inset-0 bg-grid-faint bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="container-page relative grid gap-14 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-center">
          <span className="eyebrow mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1">
            AI-powered waste recovery
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Give waste its
            <br />
            next value.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Identify, recover, and responsibly redirect electronic waste with
            AI-powered guidance and verified recovery partners.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/scan" size="lg">
              Scan your waste
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              Explore how it works
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted">
            <span>No account needed to try the scanner</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ScanMockup />
        </div>
      </div>
    </section>
  );
}

function ScanMockup() {
  return (
    <div className="w-full max-w-md rounded-xl2 border border-border bg-charcoal p-1.5 shadow-soft">
      <div className="rounded-[1rem] border border-white/10 bg-[#0F1A16] p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
            revalor scanner
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-pine-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pine-light" />
            analyzing
          </span>
        </div>

        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#0A1310]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-pine-light to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Laptop className="h-16 w-16 text-white/25" strokeWidth={1.2} />
          </div>
          <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-copper/70" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-copper/70" />
        </div>

        <div className="mt-4 space-y-2.5 font-mono text-xs text-white/70">
          <Row label="detected" value="Used Laptop" accent />
          <Row label="confidence" value="94%" />
          <Row label="category" value="E-Waste" />
          <Row label="condition" value="Partially working" />
          <Row label="est. recovery" value="₹800–₹1,500" accent />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-white/5 pt-2.5 first:border-0 first:pt-0">
      <span className="text-white/40">{label}</span>
      <span className={accent ? "text-copper-light" : "text-white/80"}>{value}</span>
    </div>
  );
}

function ProblemSection() {
  const points = [
    {
      title: "No clear destination",
      body: "Most people don't know whether an old device should be repaired, resold, or recycled — or where to take it.",
    },
    {
      title: "Value lost, not recovered",
      body: "Reusable components and valuable materials end up discarded instead of recovered and put back into use.",
    },
    {
      title: "Informal disposal risk",
      body: "Without guidance, e-waste often reaches informal channels that can pose environmental and health risks.",
    },
    {
      title: "A fragmented system",
      body: "Collection, recycling, and reporting are handled by disconnected local actors with no shared visibility.",
    },
  ];
  return (
    <section className="border-b border-border bg-white py-20">
      <div className="container-page">
        <span className="eyebrow">The problem</span>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          E-waste doesn't fail for lack of care. It fails for lack of a clear path.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div key={p.title}>
              <div className="h-px w-8 bg-copper" />
              <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-paper py-20">
      <div className="container-page">
        <span className="eyebrow">How Revalor works</span>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          One scan starts a tracked recovery journey.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl2 border border-border bg-border md:grid-cols-5">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col bg-paper p-6">
              <span className="font-mono text-xs text-copper">{step.n}</span>
              <step.icon className="mt-6 h-6 w-6 text-pine" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section id="categories" className="border-b border-border bg-white py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Supported categories</span>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Starting with e-waste. Built to expand.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            More waste categories — textiles, packaging, appliances — are on the roadmap
            once the e-waste recovery loop is proven.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-start gap-4 rounded-xl2 border border-border p-5 transition-colors hover:border-pine/30"
            >
              <c.icon className="h-6 w-6 text-pine" strokeWidth={1.6} />
              <span className="text-sm font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const stats = [
    { label: "Items scanned", value: "1,240" },
    { label: "Waste diverted", value: "312 kg" },
    { label: "Recovery partners", value: "18" },
    { label: "Active organizations", value: "6" },
  ];
  return (
    <section className="border-b border-border bg-charcoal py-20 text-white">
      <div className="container-page">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow text-white/50">Community impact</span>
          <DemoBadge />
        </div>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Numbers from our pilot cohort.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-white/60">
          Shown for demonstration. These figures are not audited real-world statistics —
          production impact numbers are computed from verified recovery events and
          configurable impact factors.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-white/10 pt-5">
              <p className="font-mono text-3xl font-medium text-pine-light">{s.value}</p>
              <p className="mt-1 text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationsSection() {
  const items = [
    "Run branded e-waste collection campaigns with a target and live progress",
    "Let members scan, submit, and track items under your organization",
    "Get consolidated collection and recovery statistics",
    "Export downloadable sustainability reports",
  ];
  return (
    <section id="organizations" className="border-b border-border bg-paper py-20">
      <div className="container-page grid gap-12 md:grid-cols-2">
        <div>
          <span className="eyebrow">For organizations</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Manage e-waste collection at campus or company scale.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Colleges, offices, apartments, and businesses use Revalor to organize
            collection drives and report on outcomes — not just track intentions.
          </p>
          <Button href="/org" variant="secondary" className="mt-7">
            Explore organization tools
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="card p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Example campaign</p>
              <p className="mt-1 font-display text-xl font-semibold">Campus E-Waste Drive</p>
            </div>
            <DemoBadge />
          </div>
          <div className="mt-6">
            <div className="flex items-baseline justify-between font-mono text-sm">
              <span>72 kg collected</span>
              <span className="text-muted">of 100 kg target</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-alt">
              <div className="h-full w-[72%] rounded-full bg-pine" />
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {items.map((i) => (
              <li key={i} className="flex gap-2.5 text-sm text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-pine-dark py-20 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start your first recovery.
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            Scan an item and see what Revalor recommends — no account required.
          </p>
        </div>
        <Button href="/scan" size="lg" className="bg-white text-pine-dark hover:bg-white/90">
          Scan your waste
        </Button>
      </div>
    </section>
  );
}
