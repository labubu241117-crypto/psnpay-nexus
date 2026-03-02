import { useState } from "react";
import { ArrowLeft, CreditCard, Wifi, Info, Contact, ChevronRight, RefreshCw } from "lucide-react";

const providers = [
  { id: "emandiri", name: "EMoney Mandiri", code: "EMONEYMDR", initial: "P", color: "bg-primary/20 text-primary" },
  { id: "brizzi", name: "Brizzi BRI", code: "BRIZZIBRI", initial: "P", color: "bg-primary/20 text-primary" },
];

interface EMoneyScreenProps {
  onBack: () => void;
}

export default function EMoneyScreen({ onBack }: EMoneyScreenProps) {
  const [cardNumber, setCardNumber] = useState("");

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="px-4 pb-28 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Isi E-Money</h2>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Card Number Input */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-foreground">Nomor Kartu e-Money</p>
        <div className="glass-card p-3 flex items-center gap-3 neon-border">
          <CreditCard className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Scan kartu NFC atau masu..."
            value={formatCard(cardNumber)}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary hover:neon-glow transition-all">
            <Wifi className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="rounded-xl bg-primary/10 p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-primary leading-relaxed">
            Scan kartu atau masukkan 16 digit nomor yang tercetak di kartu
          </p>
        </div>
      </div>

      {/* Pilih dari Kontak */}
      <button className="w-full py-3.5 rounded-2xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-all">
        <Contact className="w-5 h-5" />
        Pilih dari Kontak
      </button>

      {/* Provider List */}
      <div className="space-y-3">
        {providers.map((provider) => (
          <button
            key={provider.id}
            className="w-full glass-card p-4 flex items-center gap-4 hover:neon-border transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-full ${provider.color} flex items-center justify-center text-lg font-bold`}>
              {provider.initial}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-foreground">{provider.name}</p>
              <p className="text-xs text-muted-foreground">{provider.code}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
