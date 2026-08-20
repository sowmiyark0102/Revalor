import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-20 md:pb-0">
        <Topbar title="Profile" subtitle="Manage your personal details." />
        <div className="container-page max-w-xl py-8">
          <Card>
            <form className="space-y-5">
              <div>
                <label className="text-sm font-medium">Full name</label>
                <input
                  defaultValue="Demo User"
                  className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  defaultValue="demo.user@revalor.app"
                  className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  placeholder="+91 90000 00000"
                  className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-pine"
                />
              </div>
              <Button type="submit">Save changes</Button>
            </form>
          </Card>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
