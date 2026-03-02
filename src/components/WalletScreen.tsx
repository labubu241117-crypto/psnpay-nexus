import { useState } from "react";
import { Send, CreditCard, ArrowLeftRight, Key, Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const walletTokens = [
  { symbol: "BNB", name: "BNB Smart Chain", network: "BEP20", balance: "0.000000", icon: "🔶" },
  { symbol: "ETH", name: "Ethereum", network: "ERC20", balance: "0.000000", icon: "💎" },
  { symbol: "POL", name: "Polygon", network: "POLYGON", balance: "0.000000", icon: "🟣" },
  { symbol: "PEPE", name: "PEPE", network: "ERC20", balance: "0.000000", icon: "🐸" },
  { symbol: "USDT", name: "Tether", network: "ERC20", balance: "0.000000", icon: "💲" },
  { symbol: "BTC", name: "Bitcoin", network: "BTC", balance: "0.000000", icon: "₿" },
];

const actions = [
  { icon: Send, label: "Kirim" },
  { icon: CreditCard, label: "Isi Kartu" },
  { icon: ArrowLeftRight, label: "Tukar" },
  { icon: Key, label: "Private Key" },
];

export default function WalletScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Dompet Kripto</h2>
        <button className="text-primary hover:text-primary/80 transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Balance Card */}
      <div className="glass-card p-6 neon-border">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Total Nilai Asset</p>
          <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-muted-foreground hover:text-foreground transition-colors">
            {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-3xl font-bold text-foreground">
          {balanceVisible ? "Rp 0" : "******"}
        </p>

        {/* Action buttons inside card */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          {actions.map((action) => (
            <button key={action.label} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center transition-all group-hover:neon-glow">
                <action.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Token List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Aset Kripto</h3>
          <span className="text-xs text-muted-foreground">{walletTokens.length} Token</span>
        </div>
        <div className="space-y-3">
          {walletTokens.map((token) => (
            <div key={token.symbol} className="glass-card-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {token.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">{token.name}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {token.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{token.network}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-foreground">{token.balance}</p>
                <p className="text-xs text-muted-foreground">Balance</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
