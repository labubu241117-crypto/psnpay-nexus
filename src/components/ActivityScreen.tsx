import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, CreditCard, Store } from "lucide-react";

const tabs = ["All", "Crypto", "Fiat", "Merchant"] as const;

const activities = [
  { type: "Received", icon: ArrowDownLeft, from: "0x8f3...a2c1", amount: "+0.05 ETH", usd: "+$94.50", time: "2 min ago", status: "success" as const, category: "Crypto" },
  { type: "Sent", icon: ArrowUpRight, from: "0x4b1...d8e3", amount: "-100 USDT", usd: "-$100.00", time: "1 hour ago", status: "success" as const, category: "Crypto" },
  { type: "Swap", icon: ArrowLeftRight, from: "ETH → USDT", amount: "0.5 ETH", usd: "$945.00", time: "3 hours ago", status: "pending" as const, category: "Crypto" },
  { type: "Top Up", icon: CreditCard, from: "Bank Transfer", amount: "+Rp 7,500,000", usd: "+$500.00", time: "Yesterday", status: "success" as const, category: "Fiat" },
  { type: "Merchant", icon: Store, from: "Tokopedia", amount: "-Rp 150,000", usd: "-$10.00", time: "Yesterday", status: "success" as const, category: "Merchant" },
  { type: "Sent", icon: ArrowUpRight, from: "0x9c2...f1b4", amount: "-0.1 BTC", usd: "-$6,234.00", time: "2 days ago", status: "failed" as const, category: "Crypto" },
  { type: "Received", icon: ArrowDownLeft, from: "0xa1f...c3d2", amount: "+500 USDT", usd: "+$500.00", time: "3 days ago", status: "success" as const, category: "Crypto" },
];

const statusLabel = { success: "Success", pending: "Pending", failed: "Failed" };

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("All");

  const filtered = activeTab === "All" ? activities : activities.filter((a) => a.category === activeTab);

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground">Activity</h2>

      {/* Filter Chips */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button key={tab} className={`filter-chip ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div key={i} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{item.type}</p>
                <p className="text-xs text-muted-foreground">{item.from}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-sm ${item.amount.startsWith("+") ? "status-success" : item.status === "failed" ? "status-failed" : "text-foreground"}`}>
                {item.amount}
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
              <span className={`text-[10px] font-medium status-${item.status}`}>
                {statusLabel[item.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
