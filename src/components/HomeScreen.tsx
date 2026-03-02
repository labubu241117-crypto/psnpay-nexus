import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff, ArrowLeftRight, PlusCircle, CreditCard, MoreHorizontal, Copy, Star, TrendingUp, TrendingDown, Store } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";

function AnimatedBalance({ value, visible }: { value: string; visible: boolean }) {
  const [display, setDisplay] = useState("Rp 0");
  useEffect(() => {
    if (!visible) return;
    const target = parseFloat(value.replace(/[Rp.\s]/g, ""));
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`Rp ${current.toLocaleString("id-ID")}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [value, visible]);

  if (!visible) return <span className="text-3xl font-bold tracking-tight">******</span>;
  return <span className="text-3xl font-bold tracking-tight animate-counter">{display}</span>;
}

const tokens = [
  { symbol: "BNB", name: "BNB Smart Chain", network: "BEP20", balance: "0.000000", change: "+2.1%", up: true },
  { symbol: "ETH", name: "Ethereum", network: "ERC20", balance: "0.000000", change: "+1.8%", up: true },
  { symbol: "POL", name: "Polygon", network: "POLYGON", balance: "0.000000", change: "-0.5%", up: false },
];

const mitraUMKM = [
  { name: "Toko Batik Masl...", location: "Jl. Sungai Saddang La..." },
  { name: "Batik Semar Yo...", location: "Mall GTC Makasar, Jl..." },
];

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const memberId = "169000000232";

  const handleCopy = () => {
    navigator.clipboard.writeText(memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const actions = [
    { icon: ArrowLeftRight, label: "Transfer" },
    { icon: PlusCircle, label: "Top Up" },
    { icon: CreditCard, label: "E-Money" },
    { icon: MoreHorizontal, label: "Lainnya", onClick: () => onNavigate?.("menu") },
  ];

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Muhamad Rifki</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground font-mono">{memberId}</span>
            <button onClick={handleCopy} className="text-muted-foreground hover:text-primary transition-colors">
              <Copy className="w-3.5 h-3.5" />
            </button>
            {copied && <span className="text-xs text-neon-green">Copied!</span>}
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden border-2 border-primary/30">
          <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="glass-card p-5 neon-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Saldo Tunai</p>
            <div className="flex items-center gap-3 mt-1">
              <AnimatedBalance value="Rp 1.250.000" visible={balanceVisible} />
              <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-muted-foreground hover:text-foreground transition-colors">
                {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Poin</p>
            <p className="text-2xl font-bold neon-text mt-1">0</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center gap-1">
            <Shield className="w-3 h-3" /> Encrypted
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-neon-green flex items-center gap-1">
            <Star className="w-3 h-3" /> Member
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <button key={action.label} className="action-button group" onClick={action.onClick}>
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-all group-hover:neon-glow">
              <action.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Banner Promo */}
      <div className="glass-card p-4 neon-border overflow-hidden relative">
        <div className="flex items-center gap-3">
          <img src={psnpayLogo} alt="PSNPAY" className="w-14 h-14 rounded-xl" />
          <div>
            <p className="font-bold text-foreground">Koperasi Cerdas Indonesia</p>
            <p className="text-xs text-muted-foreground mt-0.5">(KoaS) — Partner resmi PSNPAY</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -mr-8 -mt-8 blur-xl" />
      </div>


      {/* Mitra UMKM */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Mitra UMKM</h3>
          <button className="text-xs text-primary font-medium">view all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mitraUMKM.map((mitra, i) => (
            <div key={i} className="glass-card min-w-[160px] p-3 flex-shrink-0">
              <div className="w-full h-20 rounded-xl bg-secondary flex items-center justify-center mb-2">
                <Store className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm text-foreground truncate">{mitra.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mitra.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
