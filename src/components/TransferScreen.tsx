import { useState } from "react";
import { ArrowLeft, Building2, Hash, DollarSign, FileText, AlignLeft, Send, Wallet, Eye, EyeOff } from "lucide-react";

const bankList = [
  "BCA", "BNI", "BRI", "Mandiri", "BSI", "CIMB Niaga", "Danamon", "Permata", "BTPN", "Mega",
];

interface TransferScreenProps {
  onBack: () => void;
}

export default function TransferScreen({ onBack }: TransferScreenProps) {
  const [bank, setBank] = useState("");
  const [noRekening, setNoRekening] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [saldoVisible, setSaldoVisible] = useState(true);

  const isValid = bank && noRekening.length >= 8 && jumlah && tujuan;

  const handleSubmit = () => {
    if (!isValid) return;
    // placeholder action
    alert(`Transfer Rp ${parseInt(jumlah).toLocaleString("id-ID")} ke ${bank} - ${noRekening}`);
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
        <h2 className="text-xl font-bold text-foreground">Transfer</h2>
      </div>

      {/* Saldo Card */}
      <div className="glass-card p-4 neon-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Saldo Tersedia</p>
            <p className="text-lg font-bold text-foreground">
              {saldoVisible ? "Rp 1.250.000" : "••••••••"}
            </p>
          </div>
        </div>
        <button onClick={() => setSaldoVisible(!saldoVisible)} className="text-muted-foreground hover:text-foreground transition-colors">
          {saldoVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Bank Tujuan */}
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Building2 className="w-4 h-4 text-primary" />
            Bank Tujuan
          </label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all appearance-none"
          >
            <option value="" disabled>Pilih bank tujuan</option>
            {bankList.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Nomor Rekening */}
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Hash className="w-4 h-4 text-primary" />
            Nomor Rekening
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan nomor rekening"
            value={noRekening}
            onChange={(e) => setNoRekening(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
          />
        </div>

        {/* Jumlah Transfer */}
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <DollarSign className="w-4 h-4 text-primary" />
            Jumlah Transfer
          </label>
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
            <span className="text-sm font-semibold text-muted-foreground">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value.replace(/\D/g, ""))}
              className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          {jumlah && (
            <p className="text-xs text-primary pl-1">
              Rp {parseInt(jumlah || "0").toLocaleString("id-ID")}
            </p>
          )}
        </div>

        {/* Tujuan Transaksi */}
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="w-4 h-4 text-primary" />
            Tujuan Transaksi
          </label>
          <select
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all appearance-none"
          >
            <option value="" disabled>Pilih tujuan transaksi</option>
            <option value="Pembayaran">Pembayaran</option>
            <option value="Pembelian">Pembelian</option>
            <option value="Investasi">Investasi</option>
            <option value="Tabungan">Tabungan</option>
            <option value="Pinjaman">Pinjaman</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        {/* Keterangan */}
        <div className="glass-card p-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <AlignLeft className="w-4 h-4 text-primary" />
            Keterangan <span className="text-xs text-muted-foreground">(opsional)</span>
          </label>
          <textarea
            placeholder="Tambahkan catatan..."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            rows={3}
            className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          isValid
            ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
            : "bg-secondary text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5" />
        Kirim Transfer
      </button>
    </div>
  );
}
