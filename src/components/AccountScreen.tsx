import { useState, useMemo } from "react";
import {
  Shield, UserCheck, Lock, ChevronRight, BadgeCheck, User, KeyRound,
  FileText, Info, Fingerprint, LogOut, Sun, Moon, ArrowLeft, Eye, EyeOff,
  Camera, Save, CheckCircle2, Upload, AlertTriangle, X
} from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";
import { useTheme } from "@/hooks/use-theme";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type AccountView = "main" | "profile" | "password" | "pin" | "kyc";

const accountSettings = [
  { icon: User, label: "Profil", color: "text-primary", view: "profile" as AccountView },
  { icon: Lock, label: "Password", color: "text-neon-green", view: "password" as AccountView },
  { icon: Fingerprint, label: "PIN", color: "text-neon-orange", view: "pin" as AccountView },
];

const services = [
  { icon: Shield, label: "KYC & Menjadi Mitra", desc: "Verifikasi akun & jadi mitra", color: "text-neon-purple", view: "kyc" as AccountView },
  { icon: FileText, label: "Mutasi", desc: "Riwayat transaksi lengkap", color: "text-primary", view: null },
  { icon: KeyRound, label: "Developer API", desc: "API keys & webhooks", color: "text-neon-cyan", view: null },
];

export default function AccountScreen() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [view, setView] = useState<AccountView>("main");

  // Profile state
  const [profileName, setProfileName] = useState("Muhamad Rifki");
  const [profileEmail, setProfileEmail] = useState("labubu241117@gmail.com");
  const [profilePhone, setProfilePhone] = useState("081234567890");
  const [profileSaving, setProfileSaving] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  // PIN state
  const [pinStep, setPinStep] = useState<"verify" | "new" | "confirm" | "success">("verify");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");

  // KYC state
  const [kycStep, setKycStep] = useState<"info" | "upload" | "review" | "submitted">("info");
  const [kycName, setKycName] = useState("Muhamad Rifki");
  const [kycNik, setKycNik] = useState("");
  const [kycAddress, setKycAddress] = useState("");
  const [ktpUploaded, setKtpUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  const handleBack = () => {
    setView("main");
    // Reset states
    setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    setShowOld(false); setShowNew(false); setShowConfirm(false);
    setPwSuccess(false);
    setPinStep("verify"); setCurrentPin(""); setNewPin(""); setConfirmPin(""); setPinError("");
    setKycStep("info"); setKycNik(""); setKycAddress(""); setKtpUploaded(false); setSelfieUploaded(false);
  };

  // ─── Edit Profil ───
  if (view === "profile") {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Edit Profil</h2>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden border-2 border-primary/30">
              <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Tap ikon kamera untuk ganti foto</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
            <input
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={profileEmail}
              onChange={e => setProfileEmail(e.target.value)}
              className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">No. Handphone</label>
            <input
              value={profilePhone}
              onChange={e => setProfilePhone(e.target.value)}
              className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setProfileSaving(true);
            setTimeout(() => {
              setProfileSaving(false);
              toast({ title: "Profil berhasil diperbarui ✅" });
            }, 1200);
          }}
          disabled={profileSaving || !profileName.trim() || !profileEmail.trim()}
          className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {profileSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    );
  }

  // ─── Ubah Password ───
  if (view === "password") {
    if (pwSuccess) {
      return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Password Berhasil Diubah</h3>
          <p className="text-sm text-muted-foreground text-center">Gunakan password baru untuk login selanjutnya.</p>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">
            Kembali ke Akun
          </button>
        </div>
      );
    }

    const pwValid = oldPassword.length >= 6 && newPassword.length >= 6 && newPassword === confirmPassword;

    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Ubah Password</h2>
        </div>

        <div className="glass-card p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-neon-orange shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">Password minimal 6 karakter. Pastikan password baru berbeda dari yang lama.</p>
        </div>

        <div className="space-y-4">
          {/* Old Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password Lama</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Masukkan password lama"
                className="w-full p-3 pr-12 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password Baru</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru"
                className="w-full p-3 pr-12 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className="w-full p-3 pr-12 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-destructive">Password tidak cocok</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setPwSuccess(true)}
          disabled={!pwValid}
          className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
        >
          Ubah Password
        </button>
      </div>
    );
  }

  // ─── Ubah PIN ───
  if (view === "pin") {
    const PinInput = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex gap-3 justify-center">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className={`w-11 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold ${
                value[i] ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary text-muted-foreground"
              }`}
            >
              {value[i] ? "•" : ""}
            </div>
          ))}
        </div>
        <input
          type="tel"
          maxLength={6}
          value={value}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 6);
            onChange(v);
          }}
          className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="••••••"
          autoFocus
        />
      </div>
    );

    if (pinStep === "success") {
      return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground">PIN Berhasil Diubah</h3>
          <p className="text-sm text-muted-foreground text-center">Gunakan PIN baru untuk transaksi selanjutnya.</p>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">
            Kembali ke Akun
          </button>
        </div>
      );
    }

    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Ubah PIN</h2>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 justify-center">
          {["verify", "new", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                pinStep === s ? "gradient-neon-bg text-primary-foreground" :
                ["verify", "new", "confirm"].indexOf(pinStep) > i ? "bg-neon-green text-primary-foreground" :
                "bg-secondary text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${["verify", "new", "confirm"].indexOf(pinStep) > i ? "bg-neon-green" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {pinError && (
          <div className="glass-card p-3 border border-destructive/30 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <p className="text-xs text-destructive">{pinError}</p>
          </div>
        )}

        {pinStep === "verify" && (
          <>
            <PinInput value={currentPin} onChange={setCurrentPin} label="Masukkan PIN Lama" />
            <button
              onClick={() => {
                if (currentPin === "123456") {
                  setPinError("");
                  setPinStep("new");
                  setCurrentPin("");
                } else {
                  setPinError("PIN lama salah. Demo PIN: 123456");
                }
              }}
              disabled={currentPin.length !== 6}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
            >
              Verifikasi
            </button>
          </>
        )}

        {pinStep === "new" && (
          <>
            <PinInput value={newPin} onChange={setNewPin} label="Masukkan PIN Baru" />
            <button
              onClick={() => { setPinStep("confirm"); }}
              disabled={newPin.length !== 6}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
            >
              Lanjutkan
            </button>
          </>
        )}

        {pinStep === "confirm" && (
          <>
            <PinInput value={confirmPin} onChange={setConfirmPin} label="Konfirmasi PIN Baru" />
            {confirmPin.length === 6 && confirmPin !== newPin && (
              <p className="text-xs text-destructive text-center">PIN tidak cocok</p>
            )}
            <button
              onClick={() => {
                if (confirmPin === newPin) {
                  setPinStep("success");
                } else {
                  setPinError("PIN tidak cocok, coba lagi");
                  setConfirmPin("");
                }
              }}
              disabled={confirmPin.length !== 6}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
            >
              Ubah PIN
            </button>
          </>
        )}
      </div>
    );
  }

  // ─── KYC & Menjadi Mitra ───
  if (view === "kyc") {
    if (kycStep === "submitted") {
      return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Pengajuan Terkirim!</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Dokumen KYC Anda sedang diverifikasi. Proses membutuhkan 1-3 hari kerja.
          </p>
          <div className="glass-card p-4 w-full">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-neon-orange font-semibold">⏳ Dalam Review</span>
            </div>
          </div>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">
            Kembali ke Akun
          </button>
        </div>
      );
    }

    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">KYC & Menjadi Mitra</h2>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 justify-center">
          {["info", "upload", "review"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                kycStep === s ? "gradient-neon-bg text-primary-foreground" :
                ["info", "upload", "review"].indexOf(kycStep) > i ? "bg-neon-green text-primary-foreground" :
                "bg-secondary text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${["info", "upload", "review"].indexOf(kycStep) > i ? "bg-neon-green" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="flex justify-center text-xs text-muted-foreground gap-6">
          <span>Data Diri</span>
          <span>Dokumen</span>
          <span>Review</span>
        </div>

        {kycStep === "info" && (
          <div className="space-y-4">
            <div className="glass-card p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Lengkapi data diri sesuai KTP untuk verifikasi identitas dan menjadi mitra PSNPAY.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nama Sesuai KTP</label>
              <input
                value={kycName}
                onChange={e => setKycName(e.target.value)}
                className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">NIK (Nomor Induk Kependudukan)</label>
              <input
                value={kycNik}
                onChange={e => setKycNik(e.target.value.replace(/\D/g, "").slice(0, 16))}
                placeholder="16 digit NIK"
                maxLength={16}
                className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {kycNik && kycNik.length !== 16 && (
                <p className="text-xs text-destructive">NIK harus 16 digit</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alamat Lengkap</label>
              <textarea
                value={kycAddress}
                onChange={e => setKycAddress(e.target.value)}
                placeholder="Alamat sesuai KTP"
                rows={3}
                className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <button
              onClick={() => setKycStep("upload")}
              disabled={!kycName.trim() || kycNik.length !== 16 || !kycAddress.trim()}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
            >
              Lanjutkan
            </button>
          </div>
        )}

        {kycStep === "upload" && (
          <div className="space-y-4">
            <div className="glass-card p-4 flex items-start gap-3">
              <Upload className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Upload foto KTP dan selfie dengan KTP untuk verifikasi identitas.</p>
            </div>

            {/* KTP Upload */}
            <button
              onClick={() => setKtpUploaded(true)}
              className={`w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center gap-3 transition-all ${
                ktpUploaded ? "border-neon-green bg-neon-green/5" : "border-border hover:border-primary/50"
              }`}
            >
              {ktpUploaded ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-neon-green" />
                  <span className="text-sm font-medium text-neon-green">Foto KTP Terupload</span>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <Camera className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Upload Foto KTP</span>
                  <span className="text-xs text-muted-foreground">Tap untuk memilih foto</span>
                </>
              )}
            </button>

            {/* Selfie Upload */}
            <button
              onClick={() => setSelfieUploaded(true)}
              className={`w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center gap-3 transition-all ${
                selfieUploaded ? "border-neon-green bg-neon-green/5" : "border-border hover:border-primary/50"
              }`}
            >
              {selfieUploaded ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-neon-green" />
                  <span className="text-sm font-medium text-neon-green">Selfie Terupload</span>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Selfie dengan KTP</span>
                  <span className="text-xs text-muted-foreground">Pegang KTP di samping wajah</span>
                </>
              )}
            </button>

            <button
              onClick={() => setKycStep("review")}
              disabled={!ktpUploaded || !selfieUploaded}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50"
            >
              Lanjutkan
            </button>
          </div>
        )}

        {kycStep === "review" && (
          <div className="space-y-4">
            <div className="glass-card p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Periksa kembali data Anda sebelum mengirimkan pengajuan KYC.</p>
            </div>

            <div className="glass-card p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nama</span>
                <span className="text-foreground font-medium">{kycName}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NIK</span>
                <span className="text-foreground font-medium">{kycNik.slice(0, 4)}****{kycNik.slice(-4)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Alamat</span>
                <span className="text-foreground font-medium text-right max-w-[60%]">{kycAddress}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Foto KTP</span>
                <span className="text-neon-green font-medium">✓ Uploaded</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Selfie KTP</span>
                <span className="text-neon-green font-medium">✓ Uploaded</span>
              </div>
            </div>

            <button
              onClick={() => setKycStep("submitted")}
              className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold"
            >
              Kirim Pengajuan KYC
            </button>
            <button
              onClick={() => setKycStep("info")}
              className="w-full py-3 rounded-2xl border border-border text-muted-foreground font-medium"
            >
              Edit Data
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── Main Account Screen ───
  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header with theme toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Akun Saya</h2>
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary hover:neon-glow transition-all"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6 neon-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-secondary overflow-hidden border-2 border-primary/30">
              <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neon-green flex items-center justify-center">
              <BadgeCheck className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{profileName}</h2>
              <button onClick={() => setView("profile")} className="text-muted-foreground hover:text-primary transition-colors">
                ✏️
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{profileEmail.length > 22 ? profileEmail.slice(0, 22) + "..." : profileEmail}</p>
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full gradient-neon-bg text-primary-foreground font-semibold mt-2">
              <BadgeCheck className="w-3 h-3" /> member
            </span>
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Informasi Member</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-3">
            <p className="text-xs text-muted-foreground">ID Member</p>
            <p className="text-sm font-semibold neon-text mt-0.5 truncate">169000000...</p>
          </div>
          <div className="glass-card p-3">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-semibold status-success mt-0.5">member</p>
          </div>
        </div>
      </div>

      {/* Pengaturan Akun */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Pengaturan Akun</h3>
        <div className="grid grid-cols-3 gap-3">
          {accountSettings.map((item) => (
            <button key={item.label} onClick={() => setView(item.view)} className="glass-card-hover p-4 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layanan & Lainnya */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Layanan & Lainnya</h3>
        <div className="space-y-2">
          {services.map((item) => (
            <button
              key={item.label}
              onClick={() => item.view && setView(item.view)}
              className="glass-card-hover w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full p-4 rounded-2xl border border-destructive/30 flex items-center justify-center gap-2 text-destructive font-medium transition-all hover:bg-destructive/10">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
