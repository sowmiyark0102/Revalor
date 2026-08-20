import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { DemoBadge } from "@/components/ui/Badge";
import { DEMO_STATS, DEMO_BADGES } from "@/lib/demo-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Award, Lock } from "lucide-react";

export default function RewardsPage() {
  const points = DEMO_STATS.impactScore;
  const level = 3;
  const nextLevelAt = 800;

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Rewards" subtitle="Points and badges for responsible disposal." />

        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Your rewards</span>
            <DemoBadge />
          </div>

          <Card className="bg-pine-dark text-white">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm text-white/60">Points balance</p>
                <p className="mt-1 font-display text-4xl font-semibold">{points}</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Level {level}</span>
                  <span>{nextLevelAt - points} pts to Level {level + 1}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-copper-light"
                    style={{ width: `${(points / nextLevelAt) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <p className="eyebrow mb-4">Achievements</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEMO_BADGES.map((b) => (
                <Card
                  key={b.code}
                  className={cn("flex flex-col items-start gap-3", !b.earned && "opacity-60")}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      b.earned ? "bg-copper/10" : "bg-paper-alt"
                    )}
                  >
                    {b.earned ? (
                      <Award className="h-5 w-5 text-copper" strokeWidth={1.7} />
                    ) : (
                      <Lock className="h-5 w-5 text-muted" strokeWidth={1.7} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="mt-1 text-xs text-muted">{b.description}</p>
                  </div>
                  {b.earned && b.earnedAt && (
                    <p className="font-mono text-[11px] text-muted">
                      Earned {formatRelativeTime(b.earnedAt)}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-4">How you earn points</p>
            <Card className="divide-y divide-border p-0">
              {[
                ["Scan a waste item", "+10 pts"],
                ["Verified drop-off", "+40 pts"],
                ["Completed collection", "+60 pts"],
                ["Confirmed recycling outcome", "+80 pts"],
                ["Community cleanup participation", "+100 pts"],
              ].map(([label, pts]) => (
                <div key={label} className="flex items-center justify-between px-5 py-3.5 text-sm">
                  <span>{label}</span>
                  <span className="font-mono text-muted">{pts}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
