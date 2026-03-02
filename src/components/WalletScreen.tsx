import { useState, useMemo } from "react";
import {
  Send, CreditCard, ArrowLeftRight, Key, Eye, EyeOff, RefreshCw,
  ArrowLeft, QrCode, Copy, Check, ChevronDown, ArrowDownLeft, Shield, Lock,
  ArrowUpDown, TrendingUp, Info
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import TokenDetailScreen from "@/components/TokenDetailScreen";

const walletTokens = [
  { symbol: "BNB", name: "BNB Smart Chain", network: "BEP20", balance: "0.000000", icon: "🔶", address: "0x7a3b...f92e" },
  { symbol: "ETH", name: "Ethereum", network: "ERC20", balance: "0.000000", icon: "💎", address: "0x7a3b...f92e" },
  { symbol: "POL", name: "Polygon", network: "POLYGON", balance: "0.000000", icon: "🟣", address: "0x7a3b...f92e" },
  { symbol: "PEPE", name: "PEPE", network: "ERC20", balance: "0.000000", icon: "🐸", address: "0x7a3b...f92e" },
  { symbol: "USDT", name: "Tether", network: "ERC20", balance: "0.000000", icon: "💲", address: "0x7a3b...f92e" },
  { symbol: "BTC", name: "Bitcoin", network: "BTC", balance: "0.000000", icon: "₿", address: "bc1q...xm4z" },
];

// Mock price data in USD
const mockPrices: Record<string, number> = {
  BNB: 620,
  ETH: 3800,
  POL: 0.85,
  PEPE: 0.0000125,
  USDT: 1,
  BTC: 97000,
};

type WalletView = "main" | "send" | "receive" | "privatekey" | "swap" | "detail";

export default function WalletScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [view, setView] = useState<WalletView>("main");
  const [selectedToken, setSelectedToken] = useState(walletTokens[0]);

  // Send state
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendConfirm, setSendConfirm] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Receive state
  const [copied, setCopied] = useState(false);

  // Private key state
  const [pinDialog, setPinDialog] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [keyRevealed, setKeyRevealed] = useState(false);

  // Swap state
  const [swapFrom, setSwapFrom] = useState(walletTokens[0]);
  const [swapTo, setSwapTo] = useState(walletTokens[4]); // USDT default
  const [swapAmount, setSwapAmount] = useState("");
  const [swapConfirm, setSwapConfirm] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  const MOCK_PIN = "123456";
  const MOCK_PRIVATE_KEY = "5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF";

  const swapEstimate = useMemo(() => {
    if (!swapAmount || isNaN(Number(swapAmount))) return "0.000000";
    const fromPrice = mockPrices[swapFrom.symbol] || 0;
    const toPrice = mockPrices[swapTo.symbol] || 1;
    const result = (Number(swapAmount) * fromPrice) / toPrice;
    return result < 0.01 ? result.toFixed(8) : result.toFixed(6);
  }, [swapAmount, swapFrom.symbol, swapTo.symbol]);

  const swapRate = useMemo(() => {
    const fromPrice = mockPrices[swapFrom.symbol] || 0;
    const toPrice = mockPrices[swapTo.symbol] || 1;
    const rate = fromPrice / toPrice;
    return rate < 0.01 ? rate.toFixed(8) : rate.toFixed(6);
  }, [swapFrom.symbol, swapTo.symbol]);

  const handleSwapTokens = () => {
    const temp = swapFrom;
    setSwapFrom(swapTo);
    setSwapTo(temp);
    setSwapAmount("");
    setSwapConfirm(false);
  };

  const handleSwap = () => {
    if (!swapAmount) return;
    if (!swapConfirm) {
      setSwapConfirm(true);
      return;
    }
    setSwapSuccess(true);
    toast.success("Swap berhasil!");
  };

  const resetSwap = () => {
    setSwapAmount("");
    setSwapConfirm(false);
    setSwapSuccess(false);
    setView("main");
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSend = () => {
    if (!sendAddress || !sendAmount) return;
    if (!sendConfirm) {
      setSendConfirm(true);
      return;
    }
    setSendSuccess(true);
    toast.success("Transaksi berhasil dikirim!");
  };

  const resetSend = () => {
    setSendAddress("");
    setSendAmount("");
    setSendConfirm(false);
    setSendSuccess(false);
    setView("main");
  };

  const handlePinSubmit = () => {
    if (pin === MOCK_PIN) {
      setPinDialog(false);
      setKeyRevealed(true);
      setView("privatekey");
      setPin("");
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const actions = [
    { icon: Send, label: "Kirim", onClick: () => setView("send") },
    { icon: ArrowDownLeft, label: "Terima", onClick: () => setView("receive") },
    { icon: ArrowLeftRight, label: "Tukar", onClick: () => setView("swap") },
    { icon: Key, label: "Private Key", onClick: () => { setKeyRevealed(false); setPinDialog(true); } },
  ];

  // ============== SEND VIEW ==============
  if (view === "send") {
    if (sendSuccess) {
      return (
        <div className="px-4 pb-28 pt-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center">
              <Check className="w-10 h-10 text-[hsl(var(--neon-green))]" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Transaksi Terkirim!</h2>
            <p className="text-sm text-muted-foreground text-center">
              {sendAmount} {selectedToken.symbol} berhasil dikirim ke
            </p>
            <p className="text-xs text-primary font-mono break-all px-8 text-center">{sendAddress}</p>
            <div className="glass-card p-3 w-full">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">TX Hash</span>
                <span className="text-foreground font-mono">0x{crypto.randomUUID().slice(0, 16)}...</span>
              </div>
            </div>
            <button onClick={resetSend} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold mt-4">
              Kembali ke Dompet
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-4 pb-28 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={resetSend} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Kirim {selectedToken.symbol}</h2>
        </div>

        {/* Token selector */}
        <div className="glass-card p-4">
          <label className="text-xs text-muted-foreground mb-2 block">Pilih Token</label>
          <div className="relative">
            <select
              value={selectedToken.symbol}
              onChange={(e) => setSelectedToken(walletTokens.find(t => t.symbol === e.target.value)!)}
              className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 pr-10 appearance-none text-sm font-medium"
            >
              {walletTokens.map(t => (
                <option key={t.symbol} value={t.symbol}>{t.icon} {t.name} ({t.symbol})</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Address input */}
        <div className="glass-card p-4 space-y-2">
          <label className="text-xs text-muted-foreground">Alamat Tujuan</label>
          <input
            type="text"
            placeholder="0x... atau alamat wallet"
            value={sendAddress}
            onChange={(e) => setSendAddress(e.target.value)}
            disabled={sendConfirm}
            className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 text-sm placeholder:text-muted-foreground/50 disabled:opacity-60"
          />
        </div>

        {/* Amount input */}
        <div className="glass-card p-4 space-y-2">
          <label className="text-xs text-muted-foreground">Jumlah</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="0.000000"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              disabled={sendConfirm}
              className="flex-1 bg-secondary text-foreground rounded-xl py-3 px-4 text-sm placeholder:text-muted-foreground/50 disabled:opacity-60"
            />
            <span className="text-sm font-bold text-primary">{selectedToken.symbol}</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Saldo: {selectedToken.balance} {selectedToken.symbol}
          </p>
        </div>

        {/* Confirmation */}
        {sendConfirm && (
          <div className="glass-card p-4 space-y-3 neon-border animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-semibold text-foreground text-sm">Konfirmasi Pengiriman</h3>
            <div className="space-y-2">
              {[
                ["Token", `${selectedToken.name} (${selectedToken.symbol})`],
                ["Network", selectedToken.network],
                ["Jumlah", `${sendAmount} ${selectedToken.symbol}`],
                ["Tujuan", sendAddress],
                ["Estimasi Gas", "~0.0005 " + selectedToken.symbol],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs text-muted-foreground">{k}</span>
                  <span className="text-xs text-foreground font-medium truncate max-w-[55%] text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {sendConfirm && (
            <button onClick={() => setSendConfirm(false)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm">
              Ubah
            </button>
          )}
          <button
            onClick={handleSend}
            disabled={!sendAddress || !sendAmount}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40"
          >
            {sendConfirm ? "Konfirmasi & Kirim" : "Lanjut"}
          </button>
        </div>
      </div>
    );
  }

  // ============== RECEIVE VIEW ==============
  if (view === "receive") {
    return (
      <div className="px-4 pb-28 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setView("main")} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Terima Kripto</h2>
        </div>

        {/* Token selector */}
        <div className="glass-card p-4">
          <label className="text-xs text-muted-foreground mb-2 block">Pilih Token</label>
          <div className="relative">
            <select
              value={selectedToken.symbol}
              onChange={(e) => setSelectedToken(walletTokens.find(t => t.symbol === e.target.value)!)}
              className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 pr-10 appearance-none text-sm font-medium"
            >
              {walletTokens.map(t => (
                <option key={t.symbol} value={t.symbol}>{t.icon} {t.name} ({t.symbol})</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* QR Code & Address */}
        <div className="glass-card p-6 neon-border flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Mock QR code pattern */}
            <div className="absolute inset-3 grid grid-cols-8 grid-rows-8 gap-[2px]">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${
                    Math.random() > 0.4 ? "bg-foreground" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-lg shadow-md">
                {selectedToken.icon}
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-foreground">{selectedToken.name}</p>
            <p className="text-xs text-muted-foreground">Network: {selectedToken.network}</p>
          </div>

          <div className="w-full glass-card p-3 flex items-center justify-between gap-2">
            <p className="text-xs font-mono text-foreground truncate flex-1">
              0x7a3bE91c2fD849eA3d12Bc4f07aD6eF5c8d2f92e
            </p>
            <button
              onClick={() => handleCopyAddress("0x7a3bE91c2fD849eA3d12Bc4f07aD6eF5c8d2f92e")}
              className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[hsl(var(--neon-green))]" />
              ) : (
                <Copy className="w-4 h-4 text-primary" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-destructive">
            <Shield className="w-3 h-3" />
            <span>Hanya kirim {selectedToken.symbol} ({selectedToken.network}) ke alamat ini</span>
          </div>
        </div>

        <button
          onClick={() => {
            handleCopyAddress("0x7a3bE91c2fD849eA3d12Bc4f07aD6eF5c8d2f92e");
            toast.success("Alamat berhasil disalin!");
          }}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Salin Alamat
        </button>
      </div>
    );
  }

  // ============== SWAP VIEW ==============
  if (view === "swap") {
    if (swapSuccess) {
      return (
        <div className="px-4 pb-28 pt-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center">
              <Check className="w-10 h-10 text-[hsl(var(--neon-green))]" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Swap Berhasil!</h2>
            <p className="text-sm text-muted-foreground text-center">
              {swapAmount} {swapFrom.symbol} → {swapEstimate} {swapTo.symbol}
            </p>
            <div className="glass-card p-3 w-full space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">TX Hash</span>
                <span className="text-foreground font-mono">0x{crypto.randomUUID().slice(0, 16)}...</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Rate</span>
                <span className="text-foreground">1 {swapFrom.symbol} = {swapRate} {swapTo.symbol}</span>
              </div>
            </div>
            <button onClick={resetSwap} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold mt-4">
              Kembali ke Dompet
            </button>
          </div>
        </div>
      );
    }

    const availableToTokens = walletTokens.filter(t => t.symbol !== swapFrom.symbol);

    return (
      <div className="px-4 pb-28 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={resetSwap} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Tukar Token</h2>
        </div>

        {/* From token */}
        <div className="glass-card p-4 space-y-3">
          <label className="text-xs text-muted-foreground">Dari</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
              {swapFrom.icon}
            </div>
            <div className="relative flex-1">
              <select
                value={swapFrom.symbol}
                onChange={(e) => {
                  const token = walletTokens.find(t => t.symbol === e.target.value)!;
                  if (token.symbol === swapTo.symbol) setSwapTo(swapFrom);
                  setSwapFrom(token);
                  setSwapConfirm(false);
                }}
                disabled={swapConfirm}
                className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 pr-10 appearance-none text-sm font-medium disabled:opacity-60"
              >
                {walletTokens.map(t => (
                  <option key={t.symbol} value={t.symbol}>{t.name} ({t.symbol})</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1">
            <input
              type="number"
              placeholder="0.000000"
              value={swapAmount}
              onChange={(e) => { setSwapAmount(e.target.value); setSwapConfirm(false); }}
              disabled={swapConfirm}
              className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 text-sm placeholder:text-muted-foreground/50 disabled:opacity-60"
            />
            <p className="text-[10px] text-muted-foreground">
              Saldo: {swapFrom.balance} {swapFrom.symbol}
            </p>
          </div>
        </div>

        {/* Swap direction button */}
        <div className="flex justify-center -my-2">
          <button
            onClick={handleSwapTokens}
            disabled={swapConfirm}
            className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            <ArrowUpDown className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* To token */}
        <div className="glass-card p-4 space-y-3">
          <label className="text-xs text-muted-foreground">Ke</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
              {swapTo.icon}
            </div>
            <div className="relative flex-1">
              <select
                value={swapTo.symbol}
                onChange={(e) => {
                  setSwapTo(walletTokens.find(t => t.symbol === e.target.value)!);
                  setSwapConfirm(false);
                }}
                disabled={swapConfirm}
                className="w-full bg-secondary text-foreground rounded-xl py-3 px-4 pr-10 appearance-none text-sm font-medium disabled:opacity-60"
              >
                {availableToTokens.map(t => (
                  <option key={t.symbol} value={t.symbol}>{t.name} ({t.symbol})</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="bg-secondary rounded-xl py-3 px-4">
            <p className="text-sm font-semibold text-foreground">
              ≈ {swapEstimate} <span className="text-primary">{swapTo.symbol}</span>
            </p>
          </div>
        </div>

        {/* Rate info */}
        <div className="glass-card p-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-foreground">
              1 {swapFrom.symbol} ≈ {swapRate} {swapTo.symbol}
            </p>
            <p className="text-[10px] text-muted-foreground">Estimasi harga • Termasuk fee 0.3%</p>
          </div>
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </div>

        {/* Confirmation details */}
        {swapConfirm && (
          <div className="glass-card p-4 space-y-3 neon-border animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-semibold text-foreground text-sm">Konfirmasi Swap</h3>
            <div className="space-y-2">
              {[
                ["Dari", `${swapAmount} ${swapFrom.symbol}`],
                ["Ke", `≈ ${swapEstimate} ${swapTo.symbol}`],
                ["Rate", `1 ${swapFrom.symbol} = ${swapRate} ${swapTo.symbol}`],
                ["Fee", "0.3%"],
                ["Slippage", "0.5%"],
                ["Network", swapFrom.network],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs text-muted-foreground">{k}</span>
                  <span className="text-xs text-foreground font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {swapConfirm && (
            <button onClick={() => setSwapConfirm(false)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm">
              Ubah
            </button>
          )}
          <button
            onClick={handleSwap}
            disabled={!swapAmount || Number(swapAmount) <= 0}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40"
          >
            {swapConfirm ? "Konfirmasi Swap" : "Preview Swap"}
          </button>
        </div>
      </div>
    );
  }

  // ============== DETAIL VIEW ==============
  if (view === "detail") {
    return (
      <TokenDetailScreen
        token={selectedToken}
        balanceVisible={balanceVisible}
        onBack={() => setView("main")}
      />
    );
  }

  // ============== PRIVATE KEY VIEW ==============
  if (view === "privatekey" && keyRevealed) {
    return (
      <div className="px-4 pb-28 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setView("main"); setKeyRevealed(false); }} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Private Key</h2>
        </div>

        {/* Warning */}
        <div className="glass-card p-4 border border-destructive/30 bg-destructive/5 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive text-sm">Peringatan Keamanan!</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Jangan bagikan private key Anda kepada siapapun. Siapa saja yang memiliki private key Anda dapat mengakses dan mengambil seluruh aset di dompet ini.
          </p>
        </div>

        {/* Key display */}
        <div className="glass-card p-5 neon-border space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Private Key Anda</span>
          </div>
          <div className="bg-secondary rounded-xl p-4">
            <p className="text-xs font-mono text-foreground break-all leading-relaxed select-all">
              {MOCK_PRIVATE_KEY}
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(MOCK_PRIVATE_KEY);
              toast.success("Private key disalin ke clipboard");
            }}
            className="w-full py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Salin Private Key
          </button>
        </div>

        <button
          onClick={() => { setView("main"); setKeyRevealed(false); }}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
        >
          Selesai
        </button>
      </div>
    );
  }

  // ============== MAIN VIEW ==============
  return (
    <>
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

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-3 mt-5">
            {actions.map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2 group" onClick={action.onClick}>
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
              <button
                key={token.symbol}
                onClick={() => { setSelectedToken(token); setView("detail"); }}
                className="w-full glass-card-hover p-4 flex items-center justify-between text-left"
              >
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
                  <p className="font-semibold text-sm text-foreground">
                    {balanceVisible ? token.balance : "***"}
                  </p>
                  <p className="text-xs text-muted-foreground">Balance</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PIN Dialog */}
      <Dialog open={pinDialog} onOpenChange={setPinDialog}>
        <DialogContent className="max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Masukkan PIN
            </DialogTitle>
            <DialogDescription>
              Masukkan PIN 6 digit untuk melihat Private Key Anda
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <input
              type="password"
              maxLength={6}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              onKeyDown={(e) => e.key === "Enter" && pin.length === 6 && handlePinSubmit()}
              className={`w-full bg-secondary text-center text-foreground rounded-xl py-4 px-4 text-2xl tracking-[0.5em] font-mono placeholder:text-muted-foreground/30 placeholder:tracking-[0.3em] transition-colors ${
                pinError ? "border-2 border-destructive animate-shake" : ""
              }`}
            />
            {pinError && (
              <p className="text-xs text-destructive text-center">PIN salah. Coba lagi.</p>
            )}
            <p className="text-[10px] text-muted-foreground text-center">
              Demo PIN: 123456
            </p>
            <button
              onClick={handlePinSubmit}
              disabled={pin.length !== 6}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40"
            >
              Konfirmasi
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
