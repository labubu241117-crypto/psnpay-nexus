import { useState } from "react";
import { ArrowLeft, Copy, Check, Clock, Building2, AlertCircle } from "lucide-react";

const banks = [
  { code: "BCA", name: "Bank BCA", va: "8801", color: "from-[hsl(210,80%,45%)] to-[hsl(210,80%,35%)]" },
  { code: "BNI", name: "Bank BNI", va: "8802", color: "from-[hsl(25,80%,50%)] to-[hsl(25,70%,40%)]" },
  { code: "BRI", name: "Bank BRI", va: "8803", color: "from-[hsl(210,70%,40%)] to-[hsl(210,60%,30%)]" },
  { code: "MANDIRI", name: "Bank Mandiri", va: "8804", color: "from-[hsl(45,80%,50%)] to-[hsl(45,70%,40%)]" },
  { code: "BSI", name: "Bank BSI", va: "8805", color: "from-[hsl(142,60%,40%)] to-[hsl(142,50%,30%)]" },
  { code: "CIMB", name: "CIMB Niaga", va: "8806", color: "from-[hsl(0,70%,50%)] to-[hsl(0,60%,40%)]" },
  { code: "PERMATA", name: "Bank Permata", va: "8807", color: "from-[hsl(160,60%,40%)] to-[hsl(160,50%,30%)]" },
  { code: "DANAMON", name: "Bank Danamon", va: "8808", color: "from-[hsl(200,60%,45%)] to-[hsl(200,50%,35%)]" },
];

interface TransferBankDetailProps {
  onBack: () => void;
  nominal: string;
  currencySymbol: string;
}

export default function TransferBankDetail({ onBack, nominal, currencySymbol }: TransferBankDetailProps) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [copiedVA, setCopiedVA] = useState(false);

  const selectedBankData = banks.find((b) => b.code === selectedBank);

  // Generate a fake VA number based on bank prefix
  const vaNumber = selectedBankData
    ? `${selectedBankData.va} 0816 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`
    : "";

  // Memoize VA so it doesn't change on re-render
  const [generatedVA, setGeneratedVA] = useState<Record<string, string>>({});

  const getVA = (code: string) => {
    if (!generatedVA[code]) {
      const bank = banks.find((b) => b.code === code)!;
      const va = `${bank.va} 0816 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedVA((prev) => ({ ...prev, [code]: va }));
      return va;
    }
    return generatedVA[code];
  };

  const handleCopyVA = () => {
    if (!selectedBank) return;
    const va = getVA(selectedBank);
    navigator.clipboard.writeText(va.replace(/\s/g, ""));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const formattedNominal = nominal
    ? `${currencySymbol} ${parseInt(nominal).toLocaleString("id-ID")}`
    : `${currencySymbol} 0`;

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
        <h2 className="text-xl font-bold text-foreground">Transfer Bank</h2>
      </div>

      {/* Nominal Summary */}
      <div className="glass-card p-4 neon-border">
        <p className="text-xs text-muted-foreground">Total Top Up</p>
        <p className="text-2xl font-bold neon-text mt-1">{formattedNominal}</p>
      </div>

      {/* Bank Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-1">Pilih Bank</p>
        <div className="grid grid-cols-2 gap-2">
          {banks.map((bank) => {
            const isSelected = selectedBank === bank.code;
            return (
              <button
                key={bank.code}
                onClick={() => setSelectedBank(bank.code)}
                className={`glass-card p-3 flex items-center gap-3 transition-all duration-200 ${
                  isSelected ? "neon-border" : "hover:border-muted-foreground/30"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bank.color} flex items-center justify-center flex-shrink-0`}>
                  <Building2 className="w-4 h-4 text-foreground" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-xs font-bold truncate ${isSelected ? "text-primary" : "text-foreground"}`}>{bank.code}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{bank.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Virtual Account Detail */}
      {selectedBank && (
        <div className="space-y-4 animate-counter">
          <div className="glass-card p-5 neon-border space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${selectedBankData!.color} flex items-center justify-center`}>
                <Building2 className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">{selectedBankData!.name}</p>
                <p className="text-xs text-muted-foreground">Virtual Account</p>
              </div>
            </div>

            {/* VA Number */}
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Nomor Virtual Account</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-mono font-bold text-foreground tracking-wider">
                  {getVA(selectedBank)}
                </p>
                <button
                  onClick={handleCopyVA}
                  className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all"
                >
                  {copiedVA ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedVA && <p className="text-xs text-primary mt-1">Nomor VA disalin!</p>}
            </div>

            {/* Amount */}
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Jumlah Pembayaran</p>
              <p className="text-xl font-bold neon-text">{formattedNominal}</p>
            </div>

            {/* Expiry */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-neon-orange" />
              <p className="text-xs">Selesaikan pembayaran dalam <span className="font-bold text-foreground">24 jam</span></p>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Cara Pembayaran</p>
            </div>
            <ol className="space-y-2 text-xs text-muted-foreground pl-1">
              <li className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">1</span>
                <span>Buka aplikasi {selectedBankData!.name} atau ATM terdekat</span>
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">2</span>
                <span>Pilih menu Transfer → Virtual Account</span>
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">3</span>
                <span>Masukkan nomor VA: <span className="font-mono text-foreground">{getVA(selectedBank)}</span></span>
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">4</span>
                <span>Konfirmasi jumlah {formattedNominal} dan selesaikan pembayaran</span>
              </li>
            </ol>
          </div>

          {/* Confirm */}
          <button
            className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Saya Sudah Bayar
          </button>
        </div>
      )}
    </div>
  );
}
