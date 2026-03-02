import { useState, useEffect } from "react";
import { ArrowLeft, X, Contact, Smartphone, Send } from "lucide-react";

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

const pulsaProducts = [
  { nominal: 5000, price: 6850, original: 7200, validity: "7 hari", discount: 5 },
  { nominal: 10000, price: 11800, original: 12200, validity: "15 hari", discount: 3 },
  { nominal: 12000, price: 12800, original: 13150, validity: "15 hari", discount: 3 },
  { nominal: 15000, price: 12600, original: 16000, validity: "20 hari", discount: 21 },
  { nominal: 20000, price: 20575, original: 21400, validity: "30 hari", discount: 4 },
  { nominal: 25000, price: 22800, original: 26000, validity: "30 hari", discount: 12 },
  { nominal: 30000, price: 29500, original: 30500, validity: "30 hari", discount: 3 },
  { nominal: 50000, price: 48750, original: 50500, validity: "30 hari", discount: 3 },
  { nominal: 100000, price: 97500, original: 101000, validity: "30 hari", discount: 3 },
];

const dataProducts = [
  { name: "Freedom Play 5GB / 7 Hari", quota: "5GB", validity: "7 Hari", price: 23900, original: 25000, discount: 4, sold: 2, isNew: true },
  { name: "Freedom Internet 18GB / 7 Hari", quota: "18GB", validity: "7 Hari", price: 32670, original: 34000, discount: 4, sold: 27, isNew: true },
  { name: "Freedom Internet 1.5GB / 7 Hari", quota: "1.5GB", validity: "7 Hari", price: 12500, original: 13000, discount: 4, sold: 15, isNew: false },
  { name: "Freedom Internet 35GB / 30 Hari", quota: "35GB", validity: "30 Hari", price: 65000, original: 70000, discount: 7, sold: 42, isNew: false },
  { name: "Freedom Combo 20GB / 30 Hari", quota: "20GB", validity: "30 Hari", price: 55000, original: 58000, discount: 5, sold: 31, isNew: true },
];

const roamingProducts = [
  { name: "Umroh Haji 14GB 15 Hari", quota: "15GB", validity: "15 Hari", price: 298000, original: 350000, discount: 15 },
  { name: "Umroh Haji 7GB 12 Hari", quota: "7GB", validity: "12 Hari", price: 198000, original: 250000, discount: 21 },
  { name: "Umroh Haji 51GB 12 Hari", quota: "51GB", validity: "12 Hari", price: 410000, original: null, discount: 0 },
  { name: "Asia 3GB 7 Hari", quota: "3GB", validity: "7 Hari", price: 150000, original: 175000, discount: 14 },
];

interface PulsaScreenProps {
  onBack: () => void;
}

type TabType = "pulsa" | "data" | "roaming";

export default function PulsaScreen({ onBack }: PulsaScreenProps) {
  const [phone, setPhone] = useState("");
  const [tab, setTab] = useState<TabType>("pulsa");
  const [selectedPulsa, setSelectedPulsa] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<number | null>(null);
  const [selectedRoaming, setSelectedRoaming] = useState<number | null>(null);
  const [flashTimer, setFlashTimer] = useState(11802); // ~3h 16m

  const operator = detectOperator(phone);

  useEffect(() => {
    const t = setInterval(() => setFlashTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const fH = String(Math.floor(flashTimer / 3600)).padStart(2, "0");
  const fM = String(Math.floor((flashTimer % 3600) / 60)).padStart(2, "0");
  const fS = String(flashTimer % 60).padStart(2, "0");

  const getSelectedItem = () => {
    if (tab === "pulsa" && selectedPulsa !== null) return { price: pulsaProducts[selectedPulsa].price };
    if (tab === "data" && selectedData !== null) return { price: dataProducts[selectedData].price };
    if (tab === "roaming" && selectedRoaming !== null) return { price: roamingProducts[selectedRoaming].price };
    return null;
  };

  const canCheckout = phone.replace(/\D/g, "").length >= 10 && getSelectedItem();

  const handleCheckout = () => {
    const item = getSelectedItem();
    if (!item) return;
    alert(`Checkout Rp${item.price.toLocaleString("id-ID")} untuk ${phone}`);
  };

  return (
    <div className="pb-28 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">
            {tab === "pulsa" ? "Pulsa" : tab === "data" ? "Data" : "Roaming"}
          </h2>
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

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex border-b border-border">
          {(["pulsa", "data", "roaming"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold capitalize transition-all ${
                tab === t
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {t === "pulsa" ? "Pulsa" : t === "data" ? "Data" : "Roaming"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
        {/* PULSA TAB */}
        {tab === "pulsa" && (
          <div className="grid grid-cols-2 gap-3">
            {pulsaProducts.map((p, i) => {
              const isSelected = selectedPulsa === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedPulsa(i)}
                  className={`glass-card p-4 text-left transition-all duration-200 relative ${
                    isSelected ? "neon-border" : "hover:border-muted-foreground/30"
                  }`}
                >
                  {p.discount > 0 && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-[hsl(var(--neon-red))] bg-[hsl(var(--neon-red)/0.1)] px-1.5 py-0.5 rounded">
                      -{p.discount}%
                    </span>
                  )}
                  <p className="text-2xl font-bold text-foreground">
                    {(p.nominal / 1000).toLocaleString()}<sub className="text-sm font-medium text-muted-foreground">rb</sub>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">Berlaku untuk {p.validity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
                    <p className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</p>
                  </div>
                  {p.discount >= 10 && (
                    <p className="text-[10px] font-bold text-[hsl(var(--neon-green))] mt-1">Lebih Murah</p>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* DATA TAB */}
        {tab === "data" && (
          <div className="space-y-4">
            {/* Flash Sale Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-foreground">
                ⚡ <span className="text-primary">FLASH</span> SALE
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>BERAKHIR DALAM</span>
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-mono font-bold">{fH}</span>:
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-mono font-bold">{fM}</span>:
                <span className="bg-foreground text-background px-1.5 py-0.5 rounded font-mono font-bold">{fS}</span>
              </div>
            </div>

            {dataProducts.map((p, i) => {
              const isSelected = selectedData === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedData(i)}
                  className={`w-full glass-card p-4 text-left transition-all duration-200 ${
                    isSelected ? "neon-border" : "hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.quota} | {p.validity}</p>
                      {p.isNew && (
                        <span className="text-[10px] font-bold text-[hsl(var(--neon-orange))] bg-[hsl(var(--neon-orange)/0.1)] px-1.5 py-0.5 rounded mt-1 inline-block">Baru</span>
                      )}
                    </div>
                    <div className="text-right">
                      {p.original && (
                        <p className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</p>
                      )}
                      <div className="flex items-center gap-1">
                        {p.discount > 0 && (
                          <span className="text-[10px] font-bold text-[hsl(var(--neon-red))] bg-[hsl(var(--neon-orange)/0.15)] px-1 py-0.5 rounded">⚡-{p.discount}%</span>
                        )}
                        <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
                      </div>
                      {p.sold > 0 && (
                        <p className="text-[10px] text-[hsl(var(--neon-red))] font-bold mt-0.5">🔥 {p.sold} TERJUAL</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ROAMING TAB */}
        {tab === "roaming" && (
          <div className="space-y-4">
            <p className="text-sm font-bold text-foreground">Umroh Haji</p>
            {roamingProducts.map((p, i) => {
              const isSelected = selectedRoaming === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedRoaming(i)}
                  className={`w-full glass-card p-4 text-left transition-all duration-200 ${
                    isSelected ? "neon-border" : "hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.quota} | {p.validity}</p>
                    </div>
                    <div className="text-right">
                      {p.original && (
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</p>
                          <span className="text-[10px] font-bold text-[hsl(var(--neon-red))] bg-[hsl(var(--neon-orange)/0.15)] px-1 py-0.5 rounded">-{p.discount}%</span>
                        </div>
                      )}
                      <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="px-4 pt-2">
        <button
          onClick={handleCheckout}
          disabled={!canCheckout}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            canCheckout
              ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
