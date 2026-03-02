import { useState } from "react";
import { ShoppingBag, Wallet, FileText, ArrowLeftRight, Package, Filter, Calendar } from "lucide-react";
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
  produk: [
    { type: "Pulsa", desc: "Telkomsel 08123xxxx", amount: "-Rp 25.000", time: "Hari ini", status: "success" },
    { type: "Token PLN", desc: "ID 32451xxxxxx", amount: "-Rp 100.000", time: "Kemarin", status: "success" },
    { type: "Paket Data", desc: "XL 6GB/30 Hari", amount: "-Rp 55.000", time: "2 hari lalu", status: "success" },
    { type: "Voucher Game", desc: "Mobile Legends 86 DM", amount: "-Rp 22.000", time: "3 hari lalu", status: "pending" },
    { type: "E-Wallet", desc: "GoPay Top Up", amount: "-Rp 100.000", time: "4 hari lalu", status: "success" },
    { type: "Pulsa", desc: "Indosat 08567xxxx", amount: "-Rp 50.000", time: "1 minggu lalu", status: "failed" },
  ],
  deposit: [
    { type: "Deposit", desc: "Bank BCA", amount: "+Rp 500.000", time: "2 hari lalu", status: "success" },
    { type: "Deposit", desc: "Bank Mandiri", amount: "+Rp 1.000.000", time: "5 hari lalu", status: "success" },
    { type: "Deposit", desc: "QRIS", amount: "+Rp 200.000", time: "1 minggu lalu", status: "success" },
    { type: "Deposit", desc: "Bank BNI", amount: "+Rp 750.000", time: "2 minggu lalu", status: "pending" },
  ],
  tagihan: [
    { type: "PLN", desc: "Token Listrik", amount: "-Rp 100.000", time: "1 minggu lalu", status: "success" },
    { type: "BPJS", desc: "Kesehatan 3 bulan", amount: "-Rp 150.000", time: "2 minggu lalu", status: "pending" },
    { type: "PDAM", desc: "Makassar", amount: "-Rp 85.000", time: "3 minggu lalu", status: "success" },
    { type: "Internet", desc: "IndiHome", amount: "-Rp 350.000", time: "1 bulan lalu", status: "success" },
  ],
  transfer: [
    { type: "Transfer", desc: "BCA - 1234xxx", amount: "-Rp 250.000", time: "Kemarin", status: "success" },
    { type: "Transfer", desc: "Bank BRI", amount: "-Rp 500.000", time: "3 hari lalu", status: "failed" },
    { type: "Transfer", desc: "Mandiri - 8901xxx", amount: "-Rp 1.500.000", time: "1 minggu lalu", status: "success" },
  ],
};

const statusLabel = { success: "Berhasil", pending: "Menunggu", failed: "Gagal" };
const statusDotColor = {
  success: "bg-[hsl(var(--neon-green))]",
  pending: "bg-[hsl(var(--neon-orange))]",
  failed: "bg-[hsl(var(--neon-red))]",
};

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("produk");
  const items = transactions[activeTab];

  const totalItems = Object.values(transactions).flat().length;

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
            <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-foreground">Muhamad Rifki</p>
            <p className="text-xs text-muted-foreground">Riwayat Transaksi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-4 neon-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total Transaksi</p>
          <p className="text-2xl font-bold text-foreground">{totalItems}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-green))]" />
              <span className="text-xs text-muted-foreground">Berhasil</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(t => t.status === "success").length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-orange))]" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(t => t.status === "pending").length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-red))]" />
              <span className="text-xs text-muted-foreground">Gagal</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(t => t.status === "failed").length}
            </p>
          </div>
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">
            Transaksi {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          <span className="text-xs text-muted-foreground">{items.length} transaksi</span>
        </div>

        {items.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Tidak ada transaksi</p>
            <p className="text-sm text-muted-foreground mt-1">Belum ada transaksi yang tercatat</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusDotColor[item.status]}`} />
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
