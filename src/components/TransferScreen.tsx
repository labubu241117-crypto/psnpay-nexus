import { useState } from "react";
import { ArrowLeft, Building2, Hash, DollarSign, FileText, AlignLeft, Send, Wallet, Eye, EyeOff, Shield, CheckCircle2, Copy, Check, CreditCard } from "lucide-react";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedTrx, setCopiedTrx] = useState(false);

  const isValid = bank && noRekening.length >= 8 && jumlah && tujuan;
  const trxId = `TRX${Date.now().toString().slice(-10)}`;
  const trxDate = new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" });
  const nominal = parseInt(jumlah || "0");
  const adminFee = 2500;
  const total = nominal + adminFee;

  const handleCopyTrx = () => {
    navigator.clipboard.writeText(trxId);
    setCopiedTrx(true);
    setTimeout(() => setCopiedTrx(false), 2000);
  };

  const handleReset = () => {
    setBank("");
    setNoRekening("");
    setJumlah("");
    setTujuan("");
    setKeterangan("");
    setShowConfirm(false);
    setShowSuccess(false);
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter">
          <CheckCircle2 className="w-12 h-12 text-[hsl(var(--neon-green))]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Transfer Berhasil!</h2>
          <p className="text-sm text-muted-foreground mt-1">Dana telah dikirim ke rekening tujuan</p>
        </div>

        <div className="w-full glass-card p-5 neon-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Bank Tujuan</p>
            <p className="text-sm font-bold text-foreground">{bank}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">No. Rekening</p>
            <p className="text-sm font-medium text-foreground">{noRekening}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Nominal</p>
            <p className="text-sm font-bold text-foreground">Rp {nominal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Biaya Admin</p>
            <p className="text-sm font-medium text-foreground">Rp {adminFee.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total</p>
            <p className="text-lg font-bold neon-text">Rp {total.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">ID Transaksi</p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-foreground">{trxId}</p>
              <button onClick={handleCopyTrx} className="text-primary hover:text-foreground transition-colors">
                {copiedTrx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Waktu</p>
            <p className="text-xs text-foreground">{trxDate}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">Berhasil</span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Confirmation Screen
  if (showConfirm) {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowConfirm(false)} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Konfirmasi Transfer</h2>
        </div>

        <div className="glass-card p-5 neon-border space-y-3">
          <p className="text-sm font-bold text-foreground mb-2">Detail Transfer</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Bank Tujuan</p>
            <p className="text-sm font-medium text-foreground">{bank}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">No. Rekening</p>
            <p className="text-sm font-medium text-foreground">{noRekening}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Tujuan</p>
            <p className="text-sm font-medium text-foreground">{tujuan}</p>
          </div>
          {keterangan && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Keterangan</p>
              <p className="text-sm font-medium text-foreground max-w-[60%] text-right truncate">{keterangan}</p>
            </div>
          )}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Nominal</p>
            <p className="text-sm font-bold text-foreground">Rp {nominal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Biaya Admin</p>
            <p className="text-sm font-medium text-foreground">Rp {adminFee.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total Pembayaran</p>
            <p className="text-xl font-bold neon-text">Rp {total.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Sumber Dana</p>
            <p className="text-sm font-bold text-foreground">Saldo PSNPAY — Rp 1.250.000</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1">
          <Shield className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-[10px] text-muted-foreground">Transaksi ini dilindungi enkripsi end-to-end</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowSuccess(true)}
            className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Konfirmasi & Kirim
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="w-full py-3 rounded-2xl bg-secondary text-muted-foreground font-semibold text-sm hover:bg-muted transition-all"
          >
            Batal
          </button>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
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

      {/* Summary */}
      {isValid && (
        <div className="glass-card p-4 space-y-2 animate-counter">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Nominal</p>
            <p className="text-sm font-bold text-foreground">Rp {nominal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Biaya Admin</p>
            <p className="text-sm font-medium text-foreground">Rp {adminFee.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border my-1" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total</p>
            <p className="text-lg font-bold neon-text">Rp {total.toLocaleString("id-ID")}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={() => setShowConfirm(true)}
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
