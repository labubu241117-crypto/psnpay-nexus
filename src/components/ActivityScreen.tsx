import { useState } from "react";
import { ShoppingBag, Wallet, FileText, ArrowLeftRight, Package } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";

const tabs = [
  { id: "produk", label: "Produk", icon: ShoppingBag },
  { id: "deposit", label: "Deposit", icon: Wallet },
  { id: "tagihan", label: "Tagihan", icon: FileText },
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
] as const;

type TabId = typeof tabs[number]["id"];

const transactions: Record<TabId, Array<{
  type: string;
  desc: string;
  amount: string;
  time: string;
  status: "success" | "pending" | "failed";
}>> = {
  produk: [],
  deposit: [
    { type: "Deposit", desc: "Bank BCA", amount: "+Rp 500.000", time: "2 hari lalu", status: "success" },
    { type: "Deposit", desc: "Bank Mandiri", amount: "+Rp 1.000.000", time: "5 hari lalu", status: "success" },
  ],
  tagihan: [
    { type: "PLN", desc: "Token Listrik", amount: "-Rp 100.000", time: "1 minggu lalu", status: "success" },
    { type: "BPJS", desc: "Kesehatan", amount: "-Rp 150.000", time: "2 minggu lalu", status: "pending" },
  ],
  transfer: [
    { type: "Transfer", desc: "0x8f3...a2c1", amount: "-Rp 250.000", time: "Kemarin", status: "success" },
    { type: "Transfer", desc: "Bank BRI", amount: "-Rp 500.000", time: "3 hari lalu", status: "failed" },
  ],
};

const statusLabel = { success: "Berhasil", pending: "Menunggu", failed: "Gagal" };

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("produk");
  const items = transactions[activeTab];

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
          <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-foreground">Muhamad Rifki</p>
          <p className="text-xs text-muted-foreground">Riwayat Transaksi</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-1 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "gradient-neon-bg text-primary-foreground neon-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">
          Transaksi {tabs.find((t) => t.id === activeTab)?.label}
        </h3>

        {items.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Tidak ada transaksi produk</p>
            <p className="text-sm text-muted-foreground mt-1">Belum ada transaksi yang tercatat</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === "success" ? "bg-neon-green" : item.status === "pending" ? "bg-neon-orange" : "bg-neon-red"
                  }`} />
                  <div>
                    <p className="font-medium text-sm text-foreground">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${
                    item.amount.startsWith("+") ? "status-success" : "text-foreground"
                  }`}>
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
        )}
      </div>
    </div>
  );
}
