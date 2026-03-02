import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const chartData7D = [4200, 4500, 4300, 4800, 4600, 5000, 4900];
const chartData30D = [3800, 4000, 3900, 4200, 4100, 4500, 4300, 4800, 4600, 5000, 4900, 5200, 5100, 5400, 5200, 4900, 5100, 5300, 5500, 5200, 5400, 5600, 5800, 5500, 5700, 5900, 6100, 5800, 6000, 6200];
const chartData90D = [2500, 2800, 3000, 3200, 3500, 3800, 4000, 3800, 4200, 4500, 4300, 4800, 5000, 4800, 5200, 5500, 5300, 5800, 6000, 5800, 6200, 6500, 6300, 6800, 7000, 6800, 7200, 7500, 7300, 7800, 8000, 7800, 8200, 8500, 8300, 8800, 9000, 8800, 9200, 9500, 9300, 9578, 9200, 9400, 9578];

function PortfolioChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 340;
  const h = 160;
  const padding = 10;
  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (w - 2 * padding);
    const y = padding + (1 - (v - min) / range) * (h - 2 * padding);
    return `${x},${y}`;
  });
  const linePath = points.join(" ");
  const areaPath = `${points.join(" ")} ${w - padding},${h} ${padding},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(199, 100%, 55%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(199, 100%, 55%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#chartGrad)" points={areaPath} />
      <polyline fill="none" stroke="hsl(199, 100%, 55%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={linePath} />
    </svg>
  );
}

const walletTokens = [
  { symbol: "BTC", name: "Bitcoin", network: "BEP20", balance: "0.0234 BTC", value: "$1,456.78", change: "+3.2%", up: true },
  { symbol: "ETH", name: "Ethereum", network: "ERC20", balance: "1.5420 ETH", value: "$2,891.30", change: "+1.8%", up: true },
  { symbol: "USDT", name: "Tether", network: "ERC20", balance: "5,230.00 USDT", value: "$5,230.00", change: "-0.01%", up: false },
  { symbol: "BNB", name: "BNB", network: "BEP20", balance: "3.2100 BNB", value: "$987.45", change: "+5.1%", up: true },
  { symbol: "SOL", name: "Solana", network: "SPL", balance: "12.5000 SOL", value: "$1,012.55", change: "+8.3%", up: true },
];

const periods = ["7D", "30D", "90D"] as const;
const chartMap = { "7D": chartData7D, "30D": chartData30D, "90D": chartData90D };

export default function WalletScreen() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("30D");

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
        <p className="text-3xl font-bold text-foreground mt-1">$9,578.08</p>
        <p className="text-sm status-success mt-1 flex items-center justify-center gap-1">
          <TrendingUp className="w-3 h-3" /> +4.2% today
        </p>
      </div>

      {/* Chart */}
      <div className="glass-card p-4">
        <PortfolioChart data={chartMap[period]} />
        <div className="flex gap-2 justify-center mt-3">
          {periods.map((p) => (
            <button key={p} className={`filter-chip ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Token List */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Tokens</h3>
        <div className="space-y-3">
          {walletTokens.map((token) => (
            <div key={token.symbol} className="glass-card-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-primary">
                    {token.symbol.charAt(0)}
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                    {token.network}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{token.symbol}</p>
                  <p className="text-xs text-muted-foreground">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-foreground">{token.balance}</p>
                <p className="text-xs text-muted-foreground">{token.value}</p>
                <p className={`text-xs flex items-center justify-end gap-0.5 ${token.up ? "status-success" : "status-failed"}`}>
                  {token.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {token.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
