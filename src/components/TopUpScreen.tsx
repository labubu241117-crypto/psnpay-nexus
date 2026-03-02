import { useState } from "react";
import { ArrowLeft, Wallet, Eye, EyeOff, Coins, DollarSign, CreditCard, QrCode, Store, Send } from "lucide-react";
import TransferBankDetail from "@/components/TransferBankDetail";
import MitraDetail from "@/components/MitraDetail";
import QrisDetail from "@/components/QrisDetail";
import { useI18n } from "@/lib/i18n";

const currencies = [
  { code: "IDR", label: "Rupiah (IDR)", symbol: "Rp" },
  { code: "USD", label: "US Dollar (USD)", symbol: "$" },
  { code: "EUR", label: "Euro (EUR)", symbol: "€" },
  { code: "SGD", label: "Dollar Singapura (SGD)", symbol: "S$" },
  { code: "MYR", label: "Ringgit Malaysia (MYR)", symbol: "RM" },
  { code: "AUD", label: "Dollar Australia (AUD)", symbol: "A$" },
];

const nominalPresets: Record<string, number[]> = {
  IDR: [50000, 100000, 200000, 500000, 1000000, 2000000],
  USD: [5, 10, 25, 50, 100, 200],
  EUR: [5, 10, 25, 50, 100, 200],
  SGD: [10, 20, 50, 100, 200, 500],
  MYR: [20, 50, 100, 200, 500, 1000],
  AUD: [10, 20, 50, 100, 200, 500],
};

interface TopUpScreenProps { onBack: () => void; }

export default function TopUpScreen({ onBack }: TopUpScreenProps) {
  const { t } = useI18n();
  const [currency, setCurrency] = useState("IDR");
  const [nominal, setNominal] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [saldoVisible, setSaldoVisible] = useState(true);
  const [showBankDetail, setShowBankDetail] = useState(false);
  const [showMitraDetail, setShowMitraDetail] = useState(false);
  const [showQrisDetail, setShowQrisDetail] = useState(false);

  const currentCurrency = currencies.find(c => c.code === currency)!;
  const presets = nominalPresets[currency] || nominalPresets.IDR;

  const paymentMethods = [
    { id: "bank", label: t("topup.bankTransfer"), icon: CreditCard, desc: "BCA, BNI, BRI, Mandiri" },
    { id: "qris", label: t("topup.qris"), icon: QrCode, desc: "QRIS" },
    { id: "tunai", label: t("topup.cashAgent"), icon: Store, desc: "" },
  ];

  const formatNominal = (val: number) => {
    if (currency === "IDR") return `Rp ${val.toLocaleString("id-ID")}`;
    return `${currentCurrency.symbol}${val.toLocaleString("en-US")}`;
  };

  const handlePreset = (val: number) => { setSelectedPreset(val); setNominal(val.toString()); };
  const isValid = nominal && paymentMethod;

  const handleSubmit = () => {
    if (!isValid) return;
    if (paymentMethod === "bank") { setShowBankDetail(true); return; }
    if (paymentMethod === "tunai") { setShowMitraDetail(true); return; }
    if (paymentMethod === "qris") { setShowQrisDetail(true); return; }
  };

  if (showBankDetail) return <TransferBankDetail onBack={() => setShowBankDetail(false)} nominal={nominal} currencySymbol={currentCurrency.symbol} />;
  if (showMitraDetail) return <MitraDetail onBack={() => setShowMitraDetail(false)} nominal={nominal} currencySymbol={currentCurrency.symbol} />;
  if (showQrisDetail) return <QrisDetail onBack={() => setShowQrisDetail(false)} nominal={nominal} currencySymbol={currentCurrency.symbol} />;

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold text-foreground">{t("topup.title")}</h2>
      </div>

      <div className="glass-card p-4 neon-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><Wallet className="w-5 h-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground">{t("transfer.availableBalance")}</p><p className="text-lg font-bold text-foreground">{saldoVisible ? "Rp 1.250.000" : "••••••••"}</p></div>
        </div>
        <button onClick={() => setSaldoVisible(!saldoVisible)} className="text-muted-foreground hover:text-foreground transition-colors">{saldoVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}</button>
      </div>

      <div className="glass-card p-4 space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><Coins className="w-4 h-4 text-primary" />{t("topup.currency")}</label>
        <select value={currency} onChange={e => { setCurrency(e.target.value); setSelectedPreset(null); setNominal(""); }} className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all appearance-none">
          {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-1">{t("topup.selectNominal")}</p>
        <div className="grid grid-cols-3 gap-2">
          {presets.map(val => (
            <button key={val} onClick={() => handlePreset(val)} className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedPreset === val ? "gradient-neon-bg text-primary-foreground neon-glow" : "bg-secondary text-foreground hover:bg-muted"}`}>{formatNominal(val)}</button>
          ))}
        </div>
      </div>

      <div className="glass-card p-4 space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><DollarSign className="w-4 h-4 text-primary" />{t("topup.orEnterNominal")}</label>
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
          <span className="text-sm font-semibold text-muted-foreground">{currentCurrency.symbol}</span>
          <input type="text" inputMode="numeric" placeholder="0" value={nominal} onChange={e => { setNominal(e.target.value.replace(/\D/g, "")); setSelectedPreset(null); }} className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        {nominal && <p className="text-xs text-primary pl-1">{currentCurrency.symbol} {parseInt(nominal || "0").toLocaleString("id-ID")}</p>}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-1">{t("topup.paymentMethod")}</p>
        <div className="space-y-2">
          {paymentMethods.map(method => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            return (
              <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full glass-card p-4 flex items-center gap-4 transition-all duration-200 ${isSelected ? "neon-border" : "hover:border-muted-foreground/30"}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? "gradient-neon-bg" : "bg-secondary"}`}><Icon className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} /></div>
                <div className="text-left flex-1"><p className="text-sm font-semibold text-foreground">{method.label}</p>{method.desc && <p className="text-xs text-muted-foreground">{method.desc}</p>}</div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>{isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}</div>
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!isValid} className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isValid ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
        <Send className="w-5 h-5" />{t("topup.topupNow")}
      </button>
    </div>
  );
}
