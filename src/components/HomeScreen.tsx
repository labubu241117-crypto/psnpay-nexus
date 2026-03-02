import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff, Send, Download, CreditCard, ArrowLeftRight, TrendingUp, TrendingDown } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";

const miniChartUp = [40, 35, 45, 42, 50, 48, 55, 60, 58, 65];
const miniChartDown = [60, 55, 58, 50, 45, 48, 42, 38, 40, 35];
const miniChartFlat = [45, 47, 44, 46, 45, 48, 46, 47, 45, 46];

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 80},${40 - ((v - min) / range) * 30}`).join(" ");
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" className="opacity-80">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

const tokens = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", value: "$1,456.78", change: "+3.2%", up: true, chart: miniChartUp },
  { symbol: "ETH", name: "Ethereum", balance: "1.5420", value: "$2,891.30", change: "+1.8%", up: true, chart: miniChartFlat },
  { symbol: "USDT", name: "Tether", balance: "5,230.00", value: "$5,230.00", change: "-0.01%", up: false, chart: miniChartDown },
];

const transactions = [
  { type: "Received", from: "0x8f3...a2c1", amount: "+0.05 ETH", time: "2 min ago", status: "success" },
  { type: "Sent", from: "0x4b1...d8e3", amount: "-100 USDT", time: "1 hour ago", status: "success" },
  { type: "Swap", from: "ETH → USDT", amount: "0.5 ETH", time: "3 hours ago", status: "pending" },
  { type: "Top Up", from: "Bank Transfer", amount: "+$500.00", time: "Yesterday", status: "success" },
];

function AnimatedBalance({ value, visible }: { value: string; visible: boolean }) {
  const [display, setDisplay] = useState("$0.00");
  useEffect(() => {
    if (!visible) return;
    const target = parseFloat(value.replace(/[$,]/g, ""));
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`$${current.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [value, visible]);

  if (!visible) return <span className="text-4xl font-bold tracking-tight">••••••</span>;
  return <span className="text-4xl font-bold tracking-tight animate-counter">{display}</span>;
}

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const actions = [
    { icon: Send, label: "Send", color: "from-blue-500 to-cyan-400" },
    { icon: Download, label: "Receive", color: "from-emerald-500 to-teal-400" },
    { icon: CreditCard, label: "Top Up", color: "from-violet-500 to-purple-400" },
    { icon: ArrowLeftRight, label: "Swap", color: "from-orange-500 to-amber-400" },
  ];

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={psnpayLogo} alt="PSNPAY" className="w-9 h-9 rounded-xl" />
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <p className="font-semibold text-foreground">Alex Crypto</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-neon-green" />
          <span className="text-xs text-neon-green font-medium">Secured</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className="glass-card p-6 neon-border">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-muted-foreground hover:text-foreground transition-colors">
            {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <AnimatedBalance value="$9,578.08" visible={balanceVisible} />
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center gap-1">
            <Shield className="w-3 h-3" /> Encrypted
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">On-chain</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button key={action.label} className="action-button group">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center transition-shadow group-hover:shadow-lg`}>
              <action.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Crypto Assets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">My Assets</h3>
          <button className="text-xs text-primary font-medium">See All</button>
        </div>
        <div className="space-y-3">
          {tokens.map((token) => (
            <div key={token.symbol} className="glass-card-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-primary">
                  {token.symbol.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{token.symbol}</p>
                  <p className="text-xs text-muted-foreground">{token.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MiniChart data={token.chart} color={token.up ? "hsl(142, 76%, 50%)" : "hsl(0, 72%, 51%)"} />
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">{token.balance}</p>
                  <p className={`text-xs flex items-center gap-0.5 ${token.up ? "status-success" : "status-failed"}`}>
                    {token.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {token.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <button className="text-xs text-primary font-medium">View All</button>
        </div>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${tx.status === "success" ? "bg-neon-green" : "bg-neon-orange"}`} />
                <div>
                  <p className="font-medium text-sm text-foreground">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.from}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${tx.amount.startsWith("+") ? "status-success" : "text-foreground"}`}>{tx.amount}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
