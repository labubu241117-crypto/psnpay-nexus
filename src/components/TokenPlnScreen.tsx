import { useState, useEffect } from "react";
import { ArrowLeft, Zap, ScanLine, Tag, Info, Send } from "lucide-react";

type TabId = "token" | "tagihan" | "nontaglis";

const tokenNominals = [
  { nominal: 20000, price: 19700, discount: 2, sold: 0 },
  { nominal: 50000, price: 49500, discount: 1, sold: 12 },
  { nominal: 100000, price: 99500, discount: 1, sold: 44 },
  { nominal: 200000, price: 199000, discount: 1, sold: 28 },
  { nominal: 500000, price: 498500, discount: 0.3, sold: 8 },
  { nominal: 1000000, price: 998000, discount: 0.2, sold: 3 },
];

const regularNominals = [
  { nominal: 20000, price: 19750, discount: 1 },
  { nominal: 50000, price: 49800, discount: 0.4 },
  { nominal: 100000, price: 99700, discount: 0.3 },
  { nominal: 200000, price: 199500, discount: 0.3 },
  { nominal: 500000, price: 499000, discount: 0.2 },
  { nominal: 1000000, price: 999000, discount: 0.1 },
];

interface TokenPlnScreenProps {
  onBack: () => void;
}

export default function TokenPlnScreen({ onBack }: TokenPlnScreenProps) {
  const [tab, setTab] = useState<TabId>("token");
  const [noPelanggan, setNoPelanggan] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [tagihan, setTagihan] = useState<{ found: boolean; amount?: number; name?: string; periode?: string } | null>(null);

  // Flash sale countdown
  const [countdown, setCountdown] = useState({ h: 3, m: 9, s: 47 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const handleCekTagihan = () => {
    setTagihan({
      found: true,
      amount: Math.floor(Math.random() * 500000) + 80000,
      name: "AHMAD FAUZI",
      periode: "FEB 2026",
    });
  };

  const handleBayar = () => setShowResult(true);

  // Success
  if (showResult) {
    const total = tab === "token" ? selectedNominal : tagihan?.amount;
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter">
          <Zap className="w-10 h-10 text-[hsl(var(--neon-green))]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Pembayaran Berhasil!</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {tab === "token" ? "Token Listrik" : tab === "tagihan" ? "Tagihan Listrik" : "PLN Non-Taglis"} telah diproses
          </p>
        </div>
        <div className="w-full glass-card p-5 neon-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">No. Pelanggan</p>
            <p className="text-sm font-bold text-foreground">{noPelanggan}</p>
          </div>
          {total && (
            <>
              <div className="border-t border-border" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Total</p>
                <p className="text-lg font-bold neon-text">Rp {total.toLocaleString("id-ID")}</p>
              </div>
            </>
          )}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">Berhasil</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Waktu</p>
            <p className="text-xs text-foreground">{new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}</p>
          </div>
        </div>
        <button onClick={onBack} className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
          Kembali
        </button>
      </div>
    );
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "token", label: "Token Listrik" },
    { id: "tagihan", label: "Tagihan Listrik" },
    { id: "nontaglis", label: "PLN Non-Taglis" },
  ];

  return (
    <div className="pb-28 pt-6 space-y-0">
      {/* Header */}
      <div className="px-4 flex items-center gap-3 mb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Listrik PLN</h2>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mb-4">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Diskon s.d. Rp 5.000</p>
              <p className="text-xs text-muted-foreground">Khusus pengguna PSNPAY</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              Klaim
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 flex border-b border-border mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setTagihan(null); setSelectedNominal(null); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-all relative ${
              tab === t.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Input No Pelanggan */}
      <div className="px-4 mb-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="No. Pelanggan"
            value={noPelanggan}
            onChange={(e) => setNoPelanggan(e.target.value.replace(/[^0-9]/g, ""))}
            className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <ScanLine className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {tab === "token" && (
        <div className="px-4 space-y-5">
          {/* Flash Sale */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-black text-foreground tracking-tight">FLASH</span>
                <span className="text-sm font-black text-primary tracking-tight">SALE</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-muted-foreground">BERAKHIR DALAM</span>
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{pad(countdown.h)}</span>
                <span className="text-foreground font-bold">:</span>
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{pad(countdown.m)}</span>
                <span className="text-foreground font-bold">:</span>
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-bold font-mono">{pad(countdown.s)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tokenNominals.slice(0, 2).map((item) => (
                <button
                  key={item.nominal}
                  onClick={() => setSelectedNominal(item.price)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedNominal === item.price
                      ? "border-primary bg-primary/10 neon-glow"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <p className="text-2xl font-bold text-foreground">{(item.nominal / 1000).toFixed(0)}<span className="text-sm font-normal">rb</span></p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground line-through">Rp{item.nominal.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-primary font-bold flex items-center"><Zap className="w-3 h-3" />-{item.discount}%</span>
                  </div>
                  <p className="text-sm font-bold text-primary mt-0.5">Rp{item.price.toLocaleString("id-ID")}</p>
                  <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${Math.min(item.sold * 2, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-1">{item.sold} TERJUAL</p>
                </button>
              ))}
            </div>
          </div>

          {/* Regular */}
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-3">
              {regularNominals.map((item) => (
                <button
                  key={`reg-${item.nominal}`}
                  onClick={() => setSelectedNominal(item.price)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedNominal === item.price
                      ? "border-primary bg-primary/10 neon-glow"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <p className="text-2xl font-bold text-foreground">{(item.nominal / 1000).toFixed(0)}<span className="text-sm font-normal">rb</span></p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground line-through">Rp{item.nominal.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-primary font-bold">-{item.discount}%</span>
                  </div>
                  <p className="text-sm font-bold text-primary mt-0.5">Rp{item.price.toLocaleString("id-ID")}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "tagihan" && (
        <div className="px-4 space-y-4">
          <div className="glass-card p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Catatan:</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • Pembayaran listrik tidak bisa dilakukan pada jam 23.45 - 00.30 setiap harinya.
              </p>
            </div>
          </div>

          {noPelanggan.length >= 10 && !tagihan && (
            <button onClick={handleCekTagihan} className="w-full py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm hover:bg-muted transition-all">
              Cek Tagihan
            </button>
          )}

          {tagihan?.found && (
            <div className="glass-card p-5 neon-border space-y-3 animate-counter">
              <p className="text-sm font-bold text-foreground">Detail Tagihan</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Nama</p>
                <p className="text-sm text-foreground">{tagihan.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Periode</p>
                <p className="text-sm text-foreground">{tagihan.periode}</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Total Tagihan</p>
                <p className="text-xl font-bold neon-text">Rp {tagihan.amount?.toLocaleString("id-ID")}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "nontaglis" && (
        <div className="px-4 space-y-4">
          <div className="glass-card p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Catatan:</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • Pembayaran Listrik Non Taglis tidak bisa dilakukan pada pukul 23.45 - 00.30 setiap harinya.
              </p>
            </div>
          </div>

          {noPelanggan.length >= 10 && !tagihan && (
            <button onClick={handleCekTagihan} className="w-full py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm hover:bg-muted transition-all">
              Lihat Tagihan
            </button>
          )}

          {tagihan?.found && (
            <div className="glass-card p-5 neon-border space-y-3 animate-counter">
              <p className="text-sm font-bold text-foreground">Detail Tagihan</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Nama</p>
                <p className="text-sm text-foreground">{tagihan.name}</p>
              </div>
              <div className="border-t border-border" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Total</p>
                <p className="text-xl font-bold neon-text">Rp {tagihan.amount?.toLocaleString("id-ID")}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 py-3 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 flex-1">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Gratis Admin</span>
          </div>
          <button
            onClick={handleBayar}
            disabled={tab === "token" ? (!noPelanggan || !selectedNominal) : !tagihan?.found}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              (tab === "token" ? (noPelanggan && selectedNominal) : tagihan?.found)
                ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            {tab === "token" ? "Lanjutkan" : "Lihat Tagihan"}
          </button>
        </div>
      </div>
    </div>
  );
}
