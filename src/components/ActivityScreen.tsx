import { useState } from "react";
import { ShoppingBag, Wallet, FileText, ArrowLeftRight, Package, Filter, Calendar } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";
import { useI18n } from "@/lib/i18n";

const transactions: Record<string, Array<{
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

const statusDotColor = {
  success: "bg-[hsl(var(--neon-green))]",
  pending: "bg-[hsl(var(--neon-orange))]",
  failed: "bg-[hsl(var(--neon-red))]",
};

type TabId = "produk" | "deposit" | "tagihan" | "transfer";

export default function ActivityScreen() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>("produk");
  const items = transactions[activeTab];

  const tabs = [
    { id: "produk" as TabId, label: t("activity.product"), icon: ShoppingBag },
    { id: "deposit" as TabId, label: t("activity.deposit"), icon: Wallet },
    { id: "tagihan" as TabId, label: t("activity.bills"), icon: FileText },
    { id: "transfer" as TabId, label: t("activity.transferTab"), icon: ArrowLeftRight },
  ];

  const statusLabel = {
    success: t("activity.success"),
    pending: t("activity.pending"),
    failed: t("activity.failed"),
  };

  const totalItems = Object.values(transactions).flat().length;

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
            <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-foreground">Muhamad Rifki</p>
            <p className="text-xs text-muted-foreground">{t("activity.history")}</p>
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

      <div className="glass-card p-4 neon-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{t("activity.total")}</p>
          <p className="text-2xl font-bold text-foreground">{totalItems}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-green))]" />
              <span className="text-xs text-muted-foreground">{t("activity.success")}</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(tx => tx.status === "success").length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-orange))]" />
              <span className="text-xs text-muted-foreground">{t("activity.pending")}</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(tx => tx.status === "pending").length}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-red))]" />
              <span className="text-xs text-muted-foreground">{t("activity.failed")}</span>
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {Object.values(transactions).flat().filter(tx => tx.status === "failed").length}
            </p>
          </div>
        </div>
      </div>

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

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">
            {tabs.find((tt) => tt.id === activeTab)?.label}
          </h3>
          <span className="text-xs text-muted-foreground">{items.length} {t("activity.transactions")}</span>
        </div>

        {items.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">{t("activity.noTransaction")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("activity.noTransactionDesc")}</p>
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
