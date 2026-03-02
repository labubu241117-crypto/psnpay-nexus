import { useState } from "react";
import { ArrowLeft, CreditCard, Wifi, Info, Contact, ChevronRight, RefreshCw, DollarSign, Send, CheckCircle2, Shield, Clock, Copy, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const providers = [
  { id: "emandiri", name: "EMoney Mandiri", code: "EMONEYMDR", initial: "P", color: "bg-primary/20 text-primary" },
  { id: "brizzi", name: "Brizzi BRI", code: "BRIZZIBRI", initial: "P", color: "bg-primary/20 text-primary" },
];

const nominalOptions = [20000, 50000, 100000, 200000, 500000, 1000000];

interface EMoneyScreenProps { onBack: () => void; }

export default function EMoneyScreen({ onBack }: EMoneyScreenProps) {
  const { t } = useI18n();
  const [cardNumber, setCardNumber] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null);
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [customNominal, setCustomNominal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [copiedTrx, setCopiedTrx] = useState(false);

  const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const finalNominal = selectedNominal || (customNominal ? parseInt(customNominal) : 0);
  const isValid = finalNominal >= 20000;
  const trxId = `TRX${Date.now().toString().slice(-10)}`;
  const trxDate = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });

  const handleDone = () => { setSelectedProvider(null); setSelectedNominal(null); setCustomNominal(""); setShowConfirm(false); setPaymentDone(false); };

  if (paymentDone && selectedProvider) {
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter"><CheckCircle2 className="w-12 h-12 text-[hsl(var(--neon-green))]" /></div>
        <div className="text-center"><h2 className="text-xl font-bold text-foreground">{t("emoney.paymentSuccess")}</h2></div>
        <div className="w-full glass-card p-5 neon-border space-y-3">
          {[["Provider", selectedProvider.name], [t("transfer.nominal"), `Rp ${finalNominal.toLocaleString("id-ID")}`], [t("transfer.adminFee"), t("emoney.free")]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{k}</p><p className="text-sm font-bold text-foreground">{v}</p></div>
          ))}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{t("transfer.total")}</p><p className="text-lg font-bold neon-text">Rp {finalNominal.toLocaleString("id-ID")}</p></div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{t("transfer.txId")}</p><div className="flex items-center gap-2"><p className="text-xs font-mono text-foreground">{trxId}</p><button onClick={() => { navigator.clipboard.writeText(trxId); setCopiedTrx(true); setTimeout(() => setCopiedTrx(false), 2000); }} className="text-primary">{copiedTrx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}</button></div></div>
          <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{t("transfer.status")}</p><span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">{t("common.success")}</span></div>
        </div>
        <button onClick={handleDone} className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">{t("transfer.backToHome")}</button>
      </div>
    );
  }

  if (showConfirm && selectedProvider) {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowConfirm(false)} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("emoney.confirmPayment")}</h2>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${selectedProvider.color} flex items-center justify-center text-lg font-bold`}>{selectedProvider.initial}</div>
          <div><p className="text-sm font-bold text-foreground">{selectedProvider.name}</p><p className="text-xs text-muted-foreground">{selectedProvider.code}</p></div>
        </div>
        <div className="glass-card p-5 neon-border space-y-3">
          {[["Provider", selectedProvider.name], [t("transfer.nominal"), `Rp ${finalNominal.toLocaleString("id-ID")}`], [t("transfer.adminFee"), t("emoney.free")]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{k}</p><p className="text-sm font-medium text-foreground">{v}</p></div>
          ))}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between"><p className="text-sm font-semibold text-foreground">{t("transfer.totalPayment")}</p><p className="text-xl font-bold neon-text">Rp {finalNominal.toLocaleString("id-ID")}</p></div>
        </div>
        <div className="flex items-center gap-2 px-1"><Shield className="w-4 h-4 text-primary flex-shrink-0" /><p className="text-[10px] text-muted-foreground">{t("common.endToEnd")}</p></div>
        <div className="space-y-3">
          <button onClick={() => setPaymentDone(true)} className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"><Send className="w-5 h-5" />{t("transfer.confirmAndSend")}</button>
          <button onClick={() => setShowConfirm(false)} className="w-full py-3 rounded-2xl bg-secondary text-muted-foreground font-semibold text-sm hover:bg-muted transition-all">{t("transfer.cancel")}</button>
        </div>
      </div>
    );
  }

  if (selectedProvider) {
    return (
      <div className="px-4 pb-28 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setSelectedProvider(null); setSelectedNominal(null); setCustomNominal(""); }} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("emoney.title")}</h2>
        </div>
        <div className="glass-card p-4 neon-border flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${selectedProvider.color} flex items-center justify-center text-lg font-bold`}>{selectedProvider.initial}</div>
          <div className="flex-1"><p className="text-sm font-bold text-foreground">{selectedProvider.name}</p><p className="text-xs text-muted-foreground">{selectedProvider.code}</p></div>
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-bold text-foreground">{t("emoney.selectNominal")}</p>
          <div className="grid grid-cols-3 gap-2">
            {nominalOptions.map(nom => (
              <button key={nom} onClick={() => { setSelectedNominal(nom); setCustomNominal(""); }} className={`py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedNominal === nom ? "gradient-neon-bg text-primary-foreground neon-glow" : "bg-secondary text-foreground hover:bg-muted"}`}>Rp {nom.toLocaleString("id-ID")}</button>
            ))}
          </div>
        </div>
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><DollarSign className="w-4 h-4 text-primary" />{t("topup.orEnterNominal")}</label>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
            <span className="text-sm font-semibold text-muted-foreground">Rp</span>
            <input type="text" inputMode="numeric" placeholder="Min. 20.000" value={customNominal} onChange={e => { setCustomNominal(e.target.value.replace(/\D/g, "")); setSelectedNominal(null); }} className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        {finalNominal > 0 && (
          <div className="glass-card p-4 space-y-2 animate-counter">
            <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{t("transfer.nominal")}</p><p className="text-sm font-bold text-foreground">Rp {finalNominal.toLocaleString("id-ID")}</p></div>
            <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{t("transfer.adminFee")}</p><p className="text-sm font-bold text-[hsl(var(--neon-green))]">{t("emoney.free")}</p></div>
            <div className="border-t border-border my-1" />
            <div className="flex items-center justify-between"><p className="text-sm font-semibold text-foreground">{t("transfer.total")}</p><p className="text-lg font-bold neon-text">Rp {finalNominal.toLocaleString("id-ID")}</p></div>
          </div>
        )}
        <button onClick={() => { if (isValid) setShowConfirm(true); }} disabled={!isValid} className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isValid ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
          <Send className="w-5 h-5" />{t("emoney.payNow")}
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("emoney.title")}</h2>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"><RefreshCw className="w-5 h-5" /></button>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-bold text-foreground">{t("emoney.cardNumber")}</p>
        <div className="glass-card p-3 flex items-center gap-3 neon-border">
          <CreditCard className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input type="text" inputMode="numeric" placeholder="Scan NFC..." value={formatCard(cardNumber)} onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary hover:neon-glow transition-all"><Wifi className="w-5 h-5" /></button>
        </div>
        <div className="rounded-xl bg-primary/10 p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-primary leading-relaxed">{t("emoney.scanOrEnter")}</p>
        </div>
      </div>
      <button className="w-full py-3.5 rounded-2xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-all">
        <Contact className="w-5 h-5" />{t("emoney.selectContact")}
      </button>
      <div className="space-y-3">
        {providers.map(provider => (
          <button key={provider.id} onClick={() => setSelectedProvider(provider)} className="w-full glass-card p-4 flex items-center gap-4 hover:neon-border transition-all duration-200">
            <div className={`w-12 h-12 rounded-full ${provider.color} flex items-center justify-center text-lg font-bold`}>{provider.initial}</div>
            <div className="flex-1 text-left"><p className="text-sm font-bold text-foreground">{provider.name}</p><p className="text-xs text-muted-foreground">{provider.code}</p></div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
