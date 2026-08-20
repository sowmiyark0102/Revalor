import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { DEMO_COLLECTION_REQUESTS } from "@/lib/demo-data";
import { ACTION_LABELS, STATUS_LABELS, formatDate } from "@/lib/utils";
import { Package } from "lucide-react";

export default function MyItemsPage() {
  const items = DEMO_COLLECTION_REQUESTS;

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-20 md:pb-0">
        <Topbar title="My items" subtitle="Everything you've scanned or submitted for recovery." />
        <div className="container-page py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="eyebrow">Submitted items</span>
            <DemoBadge />
          </div>

          {items.length === 0 ? (
            <Card className="flex flex-col items-center gap-3 py-16 text-center">
              <Package className="h-8 w-8 text-muted" strokeWidth={1.5} />
              <p className="font-medium">No items yet</p>
              <p className="max-w-xs text-sm text-muted">
                Scan your first item to see it tracked here from submission to recovery.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-base font-semibold">{item.itemName}</p>
                      <p className="mt-1 font-mono text-xs text-muted">#{item.id}</p>
                    </div>
                    <Badge tone={item.status === "RECOVERED" ? "success" : "pending"}>
                      {STATUS_LABELS[item.status]}
                    </Badge>
                  </div>
                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted">Quantity</dt>
                      <dd>{item.quantity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Pickup date</dt>
                      <dd>{formatDate(item.preferredDate)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Address</dt>
                      <dd className="text-right">{item.pickupAddress}</dd>
                    </div>
                  </dl>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
