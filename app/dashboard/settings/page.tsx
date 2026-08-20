import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";

const ROWS = [
  { title: "Email notifications", desc: "Pickup status changes and reward updates." },
  { title: "SMS notifications", desc: "Time-sensitive collection reminders." },
  { title: "Share data with organization", desc: "Let your linked organization see your recovery stats." },
];

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-20 md:pb-0">
        <Topbar title="Settings" subtitle="Notification and privacy preferences." />
        <div className="container-page max-w-xl py-8">
          <Card className="divide-y divide-border p-0">
            {ROWS.map((r) => (
              <div key={r.title} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{r.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-9 accent-pine" />
              </div>
            ))}
          </Card>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
