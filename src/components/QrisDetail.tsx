import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, Clock, Download, RefreshCw } from "lucide-react";

interface QrisDetailProps {
  onBack: () => void;
  nominal: string;
  currencySymbol: string;
}

export default function QrisDetail({ onBack, nominal, currencySymbol }: QrisDetailProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const formattedNominal = nominal
    ? `${currencySymbol} ${parseInt(nominal).toLocaleString("id-ID")}`
    : `${currencySymbol} 0`;

  const trxId = `QRIS${Date.now().toString().slice(-10)}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCopy = () => {
    navigator.clipboard.writeText(trxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div>
          <h2 className="text-xl font-bold text-foreground">Pembayaran QRIS</h2>
          <p className="text-xs text-muted-foreground">Scan QR untuk top up instan</p>
        </div>
      </div>

      {/* Nominal */}
      <div className="glass-card p-4 neon-border">
        <p className="text-xs text-muted-foreground">Total Pembayaran</p>
        <p className="text-2xl font-bold neon-text mt-1">{formattedNominal}</p>
      </div>

      {/* QR Code */}
      <div className="glass-card p-6 neon-border flex flex-col items-center space-y-4">
        {/* Timer */}
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${timeLeft < 60 ? "text-[hsl(var(--neon-red))]" : "text-[hsl(var(--neon-orange))]"}`} />
          <p className="text-sm text-muted-foreground">
            Berlaku{" "}
            <span className={`font-bold ${timeLeft < 60 ? "text-[hsl(var(--neon-red))]" : "text-foreground"}`}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </p>
        </div>

        {/* QR Display */}
        <div className="w-56 h-56 rounded-3xl bg-foreground p-4 flex items-center justify-center relative">
          <div className="w-full h-full relative">
            {/* Simulated QR pattern */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Corner squares */}
              <rect x="10" y="10" width="50" height="50" rx="4" fill="hsl(var(--background))" />
              <rect x="15" y="15" width="40" height="40" rx="2" fill="hsl(var(--foreground))" />
              <rect x="22" y="22" width="26" height="26" rx="2" fill="hsl(var(--background))" />
              <rect x="28" y="28" width="14" height="14" rx="1" fill="hsl(var(--foreground))" />

              <rect x="140" y="10" width="50" height="50" rx="4" fill="hsl(var(--background))" />
              <rect x="145" y="15" width="40" height="40" rx="2" fill="hsl(var(--foreground))" />
              <rect x="152" y="22" width="26" height="26" rx="2" fill="hsl(var(--background))" />
              <rect x="158" y="28" width="14" height="14" rx="1" fill="hsl(var(--foreground))" />

              <rect x="10" y="140" width="50" height="50" rx="4" fill="hsl(var(--background))" />
              <rect x="15" y="145" width="40" height="40" rx="2" fill="hsl(var(--foreground))" />
              <rect x="22" y="152" width="26" height="26" rx="2" fill="hsl(var(--background))" />
              <rect x="28" y="158" width="14" height="14" rx="1" fill="hsl(var(--foreground))" />

              {/* Data modules */}
              {Array.from({ length: 12 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => {
                  const x = 70 + col * 8;
                  const y = 10 + row * 8;
                  if (x > 130 && y < 60) return null;
                  if (x < 60) return null;
                  const show = ((row * 7 + col * 13 + 3) % 3) !== 0;
                  return show ? (
                    <rect key={`${row}-${col}`} x={x} y={y} width="6" height="6" rx="1" fill="hsl(var(--background))" />
                  ) : null;
                })
              )}
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => {
                  const x = 70 + col * 8;
                  const y = 100 + row * 8;
                  if (x < 60 && y > 140) return null;
                  const show = ((row * 11 + col * 7 + 5) % 3) !== 0;
                  return show ? (
                    <rect key={`b${row}-${col}`} x={x} y={y} width="6" height="6" rx="1" fill="hsl(var(--background))" />
                  ) : null;
                })
              )}

              {/* Center logo */}
              <rect x="80" y="80" width="40" height="40" rx="8" fill="hsl(var(--primary))" />
              <text x="100" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--primary-foreground))">P</text>
            </svg>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Scan QR di atas menggunakan aplikasi e-wallet atau mobile banking
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 w-full">
          <button className="flex-1 py-3 rounded-xl bg-secondary text-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-muted transition-all">
            <Download className="w-4 h-4" /> Simpan QR
          </button>
          <button className="flex-1 py-3 rounded-xl bg-secondary text-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-muted transition-all">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">ID Transaksi</p>
            <p className="text-sm font-mono font-bold text-foreground mt-0.5">{trxId}</p>
          </div>
          <button
            onClick={handleCopy}
            className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && <p className="text-xs text-primary">ID disalin!</p>}
      </div>

      {/* Supported apps */}
      <div className="glass-card p-4 space-y-3">
        <p className="text-xs font-semibold text-foreground">Aplikasi yang Didukung</p>
        <div className="flex flex-wrap gap-2">
          {["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja", "BCA Mobile", "BRI Mobile", "Mandiri Livin'"].map((app) => (
            <span key={app} className="text-[10px] px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-medium">
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Confirm */}
      <button className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
        Saya Sudah Bayar
      </button>
    </div>
  );
}
