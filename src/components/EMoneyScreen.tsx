import { useState } from "react";
import { ArrowLeft, Wallet, Eye, EyeOff, CreditCard, Plus, Send, History, Smartphone, QrCode, ArrowDownUp } from "lucide-react";

const eMoneyProviders = [
  { id: "gopay", name: "GoPay", balance: 450000, color: "from-[hsl(142,60%,40%)] to-[hsl(142,50%,30%)]" },
  { id: "ovo", name: "OVO", balance: 125000, color: "from-[hsl(270,70%,55%)] to-[hsl(270,60%,40%)]" },
  { id: "dana", name: "DANA", balance: 80000, color: "from-[hsl(210,80%,50%)] to-[hsl(210,70%,40%)]" },
  { id: "shopeepay", name: "ShopeePay", balance: 200000, color: "from-[hsl(15,80%,50%)] to-[hsl(15,70%,40%)]" },
  { id: "linkaja", name: "LinkAja", balance: 35000, color: "from-[hsl(0,70%,50%)] to-[hsl(0,60%,40%)]" },
];

const recentTrx = [
  { id: 1, provider: "GoPay", type: "Top Up", amount: 100000, date: "28 Feb 2026", status: "success" },
  { id: 2, provider: "OVO", type: "Transfer", amount: -50000, date: "27 Feb 2026", status: "success" },
  { id: 3, provider: "DANA", type: "Top Up", amount: 200000, date: "25 Feb 2026", status: "pending" },
  { id: 4, provider: "ShopeePay", type: "Pembayaran", amount: -75000, date: "24 Feb 2026", status: "success" },
];

interface EMoneyScreenProps {
  onBack: () => void;
}

export default function EMoneyScreen({ onBack }: EMoneyScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [saldoVisible, setSaldoVisible] = useState(true);

  const totalBalance = eMoneyProviders.reduce((sum, p) => sum + p.balance, 0);

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-foreground">E-Money</h2>
      </div>

      {/* Total Balance */}
      <div className="glass-card p-5 neon-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total Saldo E-Money</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {saldoVisible ? `Rp ${totalBalance.toLocaleString("id-ID")}` : "••••••••"}
            </p>
          </div>
          <button onClick={() => setSaldoVisible(!saldoVisible)} className="text-muted-foreground hover:text-foreground transition-colors">
            {saldoVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center gap-1">
            <CreditCard className="w-3 h-3" /> {eMoneyProviders.length} Akun Terhubung
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: Plus, label: "Isi Saldo" },
          { icon: Send, label: "Kirim" },
          { icon: QrCode, label: "Bayar QR" },
          { icon: ArrowDownUp, label: "Tukar" },
        ].map((action) => (
          <button key={action.label} className="action-button group">
            <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center transition-all group-hover:neon-glow">
              <action.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Provider List */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-1">Akun E-Money</p>
        {eMoneyProviders.map((provider) => {
          const isSelected = selectedProvider === provider.id;
          return (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(isSelected ? null : provider.id)}
              className={`w-full glass-card p-4 flex items-center gap-4 transition-all duration-200 ${
                isSelected ? "neon-border" : "hover:border-muted-foreground/30"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center flex-shrink-0`}>
                <Smartphone className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{provider.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {saldoVisible ? `Rp ${provider.balance.toLocaleString("id-ID")}` : "••••••"}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${provider.balance > 100000 ? "bg-[hsl(var(--neon-green))]" : "bg-[hsl(var(--neon-orange))]"}`} />
            </button>
          );
        })}

        {/* Add new */}
        <button className="w-full glass-card p-4 flex items-center gap-4 border-dashed hover:border-primary/30 transition-all">
          <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Hubungkan Akun Baru</p>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-medium text-muted-foreground">Transaksi Terakhir</p>
          <button className="text-xs text-primary font-medium">Lihat Semua</button>
        </div>
        {recentTrx.map((trx) => (
          <div key={trx.id} className="glass-card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              trx.amount > 0 ? "bg-[hsl(var(--neon-green)/0.15)]" : "bg-secondary"
            }`}>
              <History className={`w-4 h-4 ${trx.amount > 0 ? "text-[hsl(var(--neon-green))]" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{trx.type} - {trx.provider}</p>
              <p className="text-[10px] text-muted-foreground">{trx.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${trx.amount > 0 ? "text-[hsl(var(--neon-green))]" : "text-foreground"}`}>
                {trx.amount > 0 ? "+" : ""}Rp {Math.abs(trx.amount).toLocaleString("id-ID")}
              </p>
              <p className={`text-[10px] font-medium ${
                trx.status === "success" ? "status-success" : "status-pending"
              }`}>
                {trx.status === "success" ? "Berhasil" : "Menunggu"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
