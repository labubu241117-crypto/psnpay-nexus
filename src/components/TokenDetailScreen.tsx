import { useState, useMemo } from "react";
import {
  ArrowLeft, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  Clock, ExternalLink
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

type TokenInfo = {
  symbol: string;
  name: string;
  network: string;
  balance: string;
  icon: string;
  address: string;
};

const mockPrices: Record<string, number> = {
  BNB: 620, ETH: 3800, POL: 0.85, PEPE: 0.0000125, USDT: 1, BTC: 97000,
};

const mockMarketData: Record<string, { marketCap: string; volume24h: string; change24h: number; high24h: number; low24h: number }> = {
  BNB: { marketCap: "$93.2B", volume24h: "$1.8B", change24h: 2.34, high24h: 635, low24h: 608 },
  ETH: { marketCap: "$457B", volume24h: "$12.4B", change24h: -1.12, high24h: 3890, low24h: 3720 },
  POL: { marketCap: "$8.5B", volume24h: "$420M", change24h: 5.67, high24h: 0.91, low24h: 0.79 },
  PEPE: { marketCap: "$5.2B", volume24h: "$890M", change24h: 12.45, high24h: 0.0000138, low24h: 0.0000112 },
  USDT: { marketCap: "$120B", volume24h: "$52B", change24h: 0.01, high24h: 1.001, low24h: 0.999 },
  BTC: { marketCap: "$1.9T", volume24h: "$28B", change24h: 1.87, high24h: 99200, low24h: 95300 },
};

type TimeRange = "1H" | "1D" | "1W" | "1M" | "1Y";

function generateChartData(symbol: string, range: TimeRange) {
  const basePrice = mockPrices[symbol] || 1;
  const points: { time: string; price: number }[] = [];
  const counts: Record<TimeRange, number> = { "1H": 12, "1D": 24, "1W": 7, "1M": 30, "1Y": 12 };
  const labels: Record<TimeRange, (i: number) => string> = {
    "1H": (i) => `${i * 5}m`,
    "1D": (i) => `${i}:00`,
    "1W": (i) => ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i % 7],
    "1M": (i) => `${i + 1}`,
    "1Y": (i) => ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][i],
  };
  const volatility: Record<TimeRange, number> = { "1H": 0.005, "1D": 0.02, "1W": 0.05, "1M": 0.1, "1Y": 0.3 };

  let price = basePrice * (1 - volatility[range] * 0.5);
  for (let i = 0; i < counts[range]; i++) {
    price += (Math.random() - 0.45) * basePrice * volatility[range] * 0.15;
    price = Math.max(price, basePrice * 0.5);
    points.push({ time: labels[range](i), price: Number(price.toPrecision(6)) });
  }
  // Last point = current price
  points[points.length - 1].price = basePrice;
  return points;
}

// Mock transaction history
function generateMockTx(symbol: string) {
  const types = ["send", "receive", "swap"] as const;
  const txs = [];
  for (let i = 0; i < 8; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = (Math.random() * 2).toFixed(6);
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    txs.push({
      id: crypto.randomUUID(),
      type,
      amount,
      symbol,
      date: date.toISOString(),
      hash: `0x${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
      status: Math.random() > 0.1 ? "success" : "pending" as "success" | "pending",
    });
  }
  return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const formatPrice = (price: number) => {
  if (price < 0.001) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

interface Props {
  token: TokenInfo;
  balanceVisible: boolean;
  onBack: () => void;
}

export default function TokenDetailScreen({ token, balanceVisible, onBack }: Props) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1D");
  const price = mockPrices[token.symbol] || 0;
  const market = mockMarketData[token.symbol];
  const isPositive = market?.change24h >= 0;

  const chartData = useMemo(() => generateChartData(token.symbol, timeRange), [token.symbol, timeRange]);
  const txHistory = useMemo(() => generateMockTx(token.symbol), [token.symbol]);

  const priceInIDR = (price * 16200).toLocaleString("id-ID");
  const balanceValue = Number(token.balance) * price;

  return (
    <div className="px-4 pb-28 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-2xl">{token.icon}</span>
          <div>
            <h2 className="text-lg font-bold text-foreground">{token.name}</h2>
            <p className="text-xs text-muted-foreground">{token.symbol} • {token.network}</p>
          </div>
        </div>
      </div>

      {/* Price Card */}
      <div className="glass-card p-5 neon-border space-y-1">
        <p className="text-xs text-muted-foreground">Harga Saat Ini</p>
        <div className="flex items-end gap-3">
          <p className="text-2xl font-bold text-foreground">{formatPrice(price)}</p>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
            isPositive ? "bg-[hsl(var(--neon-green)/0.15)] text-[hsl(var(--neon-green))]" : "bg-destructive/15 text-destructive"
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? "+" : ""}{market?.change24h}%
          </div>
        </div>
        <p className="text-xs text-muted-foreground">≈ Rp {priceInIDR}</p>
      </div>

      {/* Balance */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Saldo Anda</p>
          <p className="text-lg font-bold text-foreground">
            {balanceVisible ? `${token.balance} ${token.symbol}` : "••••••"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Nilai</p>
          <p className="text-sm font-semibold text-foreground">
            {balanceVisible ? `$${balanceValue.toFixed(2)}` : "••••"}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">Grafik Harga</h3>
          <div className="flex gap-1">
            {(["1H", "1D", "1W", "1M", "1Y"] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  timeRange === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${token.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => v < 1 ? v.toFixed(4) : v.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [formatPrice(value), "Harga"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                strokeWidth={2}
                fill={`url(#gradient-${token.symbol})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Data */}
      {market && (
        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Info Pasar</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Market Cap", market.marketCap],
              ["Volume 24h", market.volume24h],
              ["High 24h", formatPrice(market.high24h)],
              ["Low 24h", formatPrice(market.low24h)],
            ].map(([label, val]) => (
              <div key={label} className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground">{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Riwayat Transaksi</h3>
          <span className="text-xs text-muted-foreground">{txHistory.length} Transaksi</span>
        </div>
        <div className="space-y-2">
          {txHistory.map((tx) => {
            const isSend = tx.type === "send";
            const isSwap = tx.type === "swap";
            const date = new Date(tx.date);
            return (
              <div key={tx.id} className="glass-card p-3.5 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isSend ? "bg-destructive/10" : isSwap ? "bg-primary/10" : "bg-[hsl(var(--neon-green)/0.1)]"
                }`}>
                  {isSend ? (
                    <ArrowUpRight className="w-4 h-4 text-destructive" />
                  ) : isSwap ? (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-[hsl(var(--neon-green))]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {isSend ? "Kirim" : isSwap ? "Swap" : "Terima"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">
                      {date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} • {date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${isSend ? "text-destructive" : "text-[hsl(var(--neon-green))]"}`}>
                    {isSend ? "-" : "+"}{tx.amount}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{tx.symbol}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
