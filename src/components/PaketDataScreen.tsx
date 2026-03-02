import { useState, useEffect } from "react";
import { ArrowLeft, X, Contact, Zap, ChevronDown, Send, Tag } from "lucide-react";

const operators: Record<string, { name: string; prefixes: string[] }> = {
  telkomsel: { name: "Telkomsel", prefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"] },
  indosat: { name: "IM3", prefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"] },
  xl: { name: "XL", prefixes: ["0817", "0818", "0819", "0859", "0877", "0878"] },
  tri: { name: "Tri", prefixes: ["0895", "0896", "0897", "0898", "0899"] },
  smartfren: { name: "Smartfren", prefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"] },
};

function detectOperator(num: string) {
  const clean = num.replace(/\D/g, "");
  for (const [, op] of Object.entries(operators)) {
    if (op.prefixes.some((p) => clean.startsWith(p))) return op.name;
  }
  return null;
}

function formatPhone(num: string) {
  const clean = num.replace(/\D/g, "").slice(0, 13);
  return clean.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

type FilterKey = "kuota" | "nama" | "masa";

const kuotaOptions = ["Semua", "1-5 GB", "5-20 GB", "20-50 GB", "50+ GB"];
const masaOptions = ["Semua", "7 Hari", "14 Hari", "30 Hari"];

const flashSaleProducts = [
  { name: "Freedom Play 5GB / 7 Hari", quota: "5GB", validity: "7 Hari", price: 23900, original: 25000, discount: 4, sold: 3, isNew: true, quotaNum: 5 },
  { name: "Freedom Internet 18GB / 7 Hari", quota: "18GB", validity: "7 Hari", price: 32670, original: 34000, discount: 4, sold: 32, isNew: true, quotaNum: 18 },
];

const regularProducts = [
  { name: "Freedom Internet 1.5GB / 7 Hari", quota: "1.5GB", validity: "7 Hari", price: 12500, original: 13000, discount: 4, sold: 15, isNew: false, quotaNum: 1.5 },
  { name: "Freedom Play 10GB / 14 Hari", quota: "10GB", validity: "14 Hari", price: 42000, original: 45000, discount: 7, sold: 22, isNew: true, quotaNum: 10 },
  { name: "Freedom Internet 35GB / 30 Hari", quota: "35GB", validity: "30 Hari", price: 65000, original: 70000, discount: 7, sold: 42, isNew: false, quotaNum: 35 },
  { name: "Freedom Combo 20GB / 30 Hari", quota: "20GB", validity: "30 Hari", price: 55000, original: 58000, discount: 5, sold: 31, isNew: true, quotaNum: 20 },
  { name: "Freedom Internet 3GB / 7 Hari", quota: "3GB", validity: "7 Hari", price: 18500, original: 20000, discount: 8, sold: 56, isNew: false, quotaNum: 3 },
  { name: "Freedom Combo 50GB / 30 Hari", quota: "50GB", validity: "30 Hari", price: 95000, original: 105000, discount: 10, sold: 18, isNew: true, quotaNum: 50 },
  { name: "Freedom Internet 8GB / 14 Hari", quota: "8GB", validity: "14 Hari", price: 35000, original: 38000, discount: 8, sold: 29, isNew: false, quotaNum: 8 },
  { name: "Unlimited Sosmed 30 Hari", quota: "Unlimited", validity: "30 Hari", price: 28000, original: 30000, discount: 7, sold: 67, isNew: true, quotaNum: 999 },
];

interface PaketDataScreenProps {
  onBack: () => void;
}

export default function PaketDataScreen({ onBack }: PaketDataScreenProps) {
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
  const [filterKuota, setFilterKuota] = useState("Semua");
  const [filterMasa, setFilterMasa] = useState("Semua");
  const [showResult, setShowResult] = useState(false);

  // Flash sale countdown
  const [countdown, setCountdown] = useState(11038);
  useEffect(() => {
    const t = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const fH = String(Math.floor(countdown / 3600)).padStart(2, "0");
  const fM = String(Math.floor((countdown % 3600) / 60)).padStart(2, "0");
  const fS = String(countdown % 60).padStart(2, "0");

  const operator = detectOperator(phone);
  const phoneClean = phone.replace(/\D/g, "");

  const filterProduct = (p: { quotaNum: number; validity: string }) => {
    if (filterKuota !== "Semua") {
      if (filterKuota === "1-5 GB" && (p.quotaNum < 1 || p.quotaNum > 5)) return false;
      if (filterKuota === "5-20 GB" && (p.quotaNum < 5 || p.quotaNum > 20)) return false;
      if (filterKuota === "20-50 GB" && (p.quotaNum < 20 || p.quotaNum > 50)) return false;
      if (filterKuota === "50+ GB" && p.quotaNum < 50) return false;
    }
    if (filterMasa !== "Semua" && p.validity !== filterMasa) return false;
    return true;
  };

  const filteredRegular = regularProducts.filter(filterProduct);

  const canCheckout = phoneClean.length >= 10 && selected;

  const handleSelect = (name: string, price: number) => {
    setSelected(name);
    setSelectedPrice(price);
  };

  // Success
  if (showResult) {
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter">
          <Zap className="w-10 h-10 text-[hsl(var(--neon-green))]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Pembelian Berhasil!</h2>
          <p className="text-sm text-muted-foreground mt-1">Paket Data telah diproses</p>
        </div>
        <div className="w-full glass-card p-5 neon-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Nomor</p>
            <p className="text-sm font-bold text-foreground">{formatPhone(phone)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Paket</p>
            <p className="text-sm font-medium text-foreground max-w-[60%] text-right">{selected}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total</p>
            <p className="text-lg font-bold neon-text">Rp {selectedPrice.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">Berhasil</span>
          </div>
        </div>
        <button onClick={onBack} className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Paket Data</h2>
        </div>
      </div>

      {/* Phone Input */}
      <div className="px-4 mb-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Masukkan nomor HP"
            value={formatPhone(phone)}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            className="flex-1 bg-transparent text-2xl font-bold text-foreground font-mono tracking-wider outline-none placeholder:text-muted-foreground placeholder:text-lg placeholder:font-normal placeholder:tracking-normal"
          />
          <div className="flex items-center gap-2">
            {operator && (
              <span className="text-xs px-2 py-1 rounded-lg bg-secondary font-bold text-foreground">{operator}</span>
            )}
            {phone && (
              <button onClick={() => setPhone("")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Contact className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 mb-4 flex gap-2">
        {([
          { key: "kuota" as FilterKey, label: "Kuota" },
          { key: "nama" as FilterKey, label: "Nama Paket" },
          { key: "masa" as FilterKey, label: "Masa Berlaku" },
        ]).map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
            className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
              activeFilter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
            }`}
          >
            {f.label}
            <ChevronDown className="w-3 h-3" />
          </button>
        ))}
      </div>

      {/* Filter Dropdown */}
      {activeFilter === "kuota" && (
        <div className="px-4 mb-4">
          <div className="glass-card p-3 flex flex-wrap gap-2">
            {kuotaOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => { setFilterKuota(opt); setActiveFilter(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterKuota === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
      {activeFilter === "masa" && (
        <div className="px-4 mb-4">
          <div className="glass-card p-3 flex flex-wrap gap-2">
            {masaOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => { setFilterMasa(opt); setActiveFilter(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterMasa === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flash Sale */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-black text-foreground tracking-tight">FLASH</span>
            <span className="text-sm font-black text-primary tracking-tight">SALE</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground">BERAKHIR DALAM</span>
            <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{fH}</span>
            <span className="text-foreground font-bold">:</span>
            <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{fM}</span>
            <span className="text-foreground font-bold">:</span>
            <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{fS}</span>
          </div>
        </div>
      </div>

      {/* Flash Sale Products */}
      <div className="px-4 space-y-3 mb-4">
        {flashSaleProducts.filter(filterProduct).map((p) => (
          <button
            key={p.name}
            onClick={() => handleSelect(p.name, p.price)}
            className={`w-full glass-card p-4 text-left transition-all duration-200 ${
              selected === p.name ? "neon-border" : "hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-3">
                <p className="text-sm font-bold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.quota} | {p.validity}</p>
                {p.isNew && (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded mt-1 inline-block">Baru</span>
                )}
                <p className="text-xs text-muted-foreground mt-1 underline">Selengkapnya</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</p>
                  <span className="text-[10px] font-bold text-[hsl(var(--neon-red))] bg-[hsl(var(--neon-orange)/0.15)] px-1 py-0.5 rounded flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5" />-{p.discount}%
                  </span>
                </div>
                <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
                <div className="mt-1 flex items-center gap-1 justify-end">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${Math.min(p.sold * 3, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{p.sold} TERJUAL</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border mx-4 mb-4" />

      {/* Regular Products */}
      <div className="px-4 space-y-3 flex-1 overflow-y-auto pb-4">
        {filteredRegular.map((p) => (
          <button
            key={p.name}
            onClick={() => handleSelect(p.name, p.price)}
            className={`w-full glass-card p-4 text-left transition-all duration-200 ${
              selected === p.name ? "neon-border" : "hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-3">
                <p className="text-sm font-bold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.quota} | {p.validity}</p>
                {p.isNew && (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded mt-1 inline-block">Baru</span>
                )}
              </div>
              <div className="text-right shrink-0">
                {p.original && (
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</p>
                    <span className="text-[10px] font-bold text-[hsl(var(--neon-red))]">-{p.discount}%</span>
                  </div>
                )}
                <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
                {p.sold > 0 && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">🔥 {p.sold} terjual</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 py-3 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 flex-1">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Gratis Admin</span>
          </div>
          <button
            onClick={() => setShowResult(true)}
            disabled={!canCheckout}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              canCheckout
                ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
