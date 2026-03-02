import { useState, useMemo } from "react";
import {
  Shield, UserCheck, Lock, ChevronRight, BadgeCheck, User, KeyRound,
  FileText, Info, Fingerprint, LogOut, Sun, Moon, ArrowLeft, Eye, EyeOff,
  Camera, Save, CheckCircle2, Upload, AlertTriangle, X, Settings, ShieldCheck,
  Users, HelpCircle, MessageCircle, Globe, Bell, Languages, Smartphone,
  Copy, Share2, Gift, Search, Send, ExternalLink
} from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";
import lumadexLogo from "@/assets/lumadex-logo.png";
import { useTheme } from "@/hooks/use-theme";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type AccountView = "main" | "profile" | "password" | "pin" | "kyc" | "general-settings" | "security" | "invite" | "help" | "chatbot";

const accountSettings = [
  { icon: User, label: "Profil", color: "text-primary", view: "profile" as AccountView },
  { icon: Lock, label: "Password", color: "text-neon-green", view: "password" as AccountView },
  { icon: Fingerprint, label: "PIN", color: "text-neon-orange", view: "pin" as AccountView },
];

const services = [
  { icon: Shield, label: "KYC & Menjadi Mitra", desc: "Verifikasi akun & jadi mitra", color: "text-neon-purple", view: "kyc" as AccountView },
  { icon: FileText, label: "Mutasi", desc: "Riwayat transaksi lengkap", color: "text-primary", view: "mutasi" as any },
  { icon: KeyRound, label: "Developer API", desc: "API keys & webhooks", color: "text-neon-cyan", view: null },
];

interface AccountScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function AccountScreen({ onNavigate }: AccountScreenProps) {
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

  // Chat bot state
  const [chatMessages, setChatMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Halo! 👋 Saya asisten virtual PSNPAY. Ada yang bisa saya bantu?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleBack = () => {
    setView("main");
    // Reset states
    setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    setShowOld(false); setShowNew(false); setShowConfirm(false);
    setPwSuccess(false);
    setPinStep("verify"); setCurrentPin(""); setNewPin(""); setConfirmPin(""); setPinError("");
    setKycStep("info"); setKycNik(""); setKycAddress(""); setKtpUploaded(false); setSelfieUploaded(false);
    setChatMessages([{ from: "bot", text: "Halo! 👋 Saya asisten virtual PSNPAY. Ada yang bisa saya bantu?" }]);
    setChatInput("");
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

  // ─── Pengaturan Umum ───
  if (view === "general-settings") {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Pengaturan Umum</h2>
        </div>

        <div className="space-y-2">
          {[
            { icon: Bell, label: "Notifikasi", desc: "Atur notifikasi push & email", toggle: true },
            { icon: Languages, label: "Bahasa", desc: "Indonesia", toggle: false },
            { icon: Smartphone, label: "Tampilan", desc: theme === "dark" ? "Mode Gelap" : "Mode Terang", toggle: true, isTheme: true },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              {item.isTheme ? (
                <button onClick={toggleTheme} className="w-12 h-7 rounded-full bg-primary/20 flex items-center px-1 transition-all">
                  <div className={`w-5 h-5 rounded-full bg-primary transition-transform ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              ) : item.toggle ? (
                <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1">
                  <div className="w-5 h-5 rounded-full bg-primary-foreground translate-x-5" />
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Tentang Aplikasi</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Versi</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Build</span>
            <span className="text-foreground">2026.03.02</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── Keamanan Akun ───
  if (view === "security") {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Keamanan Akun</h2>
        </div>

        <div className="glass-card p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">Tingkatkan keamanan akun Anda dengan mengaktifkan fitur-fitur berikut.</p>
        </div>

        <div className="space-y-2">
          {[
            { icon: Lock, label: "Ubah Password", desc: "Ganti password login Anda", action: () => setView("password") },
            { icon: Fingerprint, label: "Ubah PIN", desc: "Ganti PIN transaksi", action: () => setView("pin") },
            { icon: Smartphone, label: "Autentikasi 2 Faktor", desc: "Aktif - via SMS", toggle: true },
            { icon: Eye, label: "Biometrik", desc: "Login dengan sidik jari/wajah", toggle: true },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action || undefined}
              className="glass-card w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              {item.toggle ? (
                <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1">
                  <div className="w-5 h-5 rounded-full bg-primary-foreground translate-x-5" />
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>

        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Perangkat Aktif</h3>
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-neon-green" />
            <div>
              <p className="text-sm font-medium text-foreground">Perangkat ini</p>
              <p className="text-xs text-muted-foreground">Terakhir login: Hari ini</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Undang Teman ───
  if (view === "invite") {
    const referralCode = "PSNPAY-RIFKI2026";
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Undang Teman</h2>
        </div>

        <div className="glass-card p-6 neon-border text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Ajak Teman, Dapat Bonus!</h3>
          <p className="text-sm text-muted-foreground">Undang teman pakai kode referral dan dapatkan bonus saldo untuk setiap teman yang bergabung.</p>
        </div>

        <div className="glass-card p-4 space-y-3">
          <p className="text-xs text-muted-foreground font-medium">Kode Referral Anda</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-2xl bg-secondary border border-border text-foreground font-bold text-center tracking-widest">
              {referralCode}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(referralCode);
                toast({ title: "Kode referral disalin! 📋" });
              }}
              className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: "PSNPAY", text: `Gabung PSNPAY pakai kode referral saya: ${referralCode}` });
            } else {
              toast({ title: "Link dibagikan! 🔗" });
            }
          }}
          className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" /> Bagikan ke Teman
        </button>

        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Statistik Referral</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-3 text-center">
              <p className="text-2xl font-bold neon-text">3</p>
              <p className="text-xs text-muted-foreground">Teman Terdaftar</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-2xl font-bold text-neon-green">Rp 15.000</p>
              <p className="text-xs text-muted-foreground">Total Bonus</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Pusat Bantuan ───
  if (view === "help") {
    const faqs = [
      { q: "Bagaimana cara top up saldo?", a: "Buka menu Home, pilih Top Up, lalu pilih metode pembayaran yang tersedia." },
      { q: "Bagaimana cara transfer ke bank?", a: "Pilih menu Transfer, masukkan nomor rekening tujuan dan nominal transfer." },
      { q: "Berapa lama proses KYC?", a: "Proses verifikasi KYC membutuhkan 1-3 hari kerja setelah pengajuan." },
      { q: "Bagaimana jika lupa PIN?", a: "Hubungi admin melalui fitur Chat Bot Admin untuk reset PIN." },
    ];
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Pusat Bantuan</h2>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input placeholder="Cari pertanyaan..." className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground" />
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">FAQ</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card p-4 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <p className="font-medium text-sm text-foreground pr-4">{faq.q}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Hubungi Kami</h3>
          <button onClick={() => setView("chatbot")} className="w-full p-3 rounded-2xl bg-secondary flex items-center gap-3 text-left hover:bg-accent transition-colors">
            <MessageCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Chat Bot Admin</p>
              <p className="text-xs text-muted-foreground">Respon cepat 24/7</p>
            </div>
          </button>
          <a href="mailto:support@psnpay.com" className="w-full p-3 rounded-2xl bg-secondary flex items-center gap-3 text-left hover:bg-accent transition-colors">
            <Send className="w-5 h-5 text-neon-green" />
            <div>
              <p className="text-sm font-medium text-foreground">Email Support</p>
              <p className="text-xs text-muted-foreground">support@psnpay.com</p>
            </div>
          </a>
        </div>
      </div>
    );
  }

  // ─── Chat Bot Admin ───
  if (view === "chatbot") {
    const botResponses: Record<string, string> = {
      "saldo": "Untuk cek saldo, buka menu Dompet di tab bawah. Saldo akan ditampilkan di bagian atas.",
      "transfer": "Untuk transfer, buka menu Home → Transfer → Masukkan rekening tujuan dan nominal.",
      "kyc": "Untuk verifikasi KYC, buka Akun → KYC & Menjadi Mitra → Ikuti langkah-langkahnya.",
      "pin": "Untuk ubah PIN, buka Akun → PIN. PIN demo: 123456.",
      "mitra": "Untuk menjadi mitra, selesaikan proses KYC terlebih dahulu di menu Akun.",
    };

    const handleSendChat = () => {
      if (!chatInput.trim()) return;
      const userMsg = chatInput.trim();
      setChatMessages(prev => [...prev, { from: "user" as const, text: userMsg }]);
      setChatInput("");
      
      setTimeout(() => {
        const key = Object.keys(botResponses).find(k => userMsg.toLowerCase().includes(k));
        const reply = key ? botResponses[key] : "Terima kasih atas pertanyaannya. Tim kami akan segera menghubungi Anda. Untuk bantuan lebih lanjut, kunjungi lumadex.io 🌐";
        setChatMessages(prev => [...prev, { from: "bot" as const, text: reply }]);
      }, 800);
    };

    return (
      <div className="flex flex-col h-screen max-h-screen">
        <div className="px-4 pt-6 pb-3 flex items-center gap-3 border-b border-border">
          <button onClick={() => setView("main")} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Chat Bot Admin</h2>
              <p className="text-xs text-neon-green">● Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-28">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.from === "user"
                  ? "gradient-neon-bg text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex items-center gap-2 max-w-md mx-auto">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendChat()}
              placeholder="Ketik pesan..."
              className="flex-1 p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSendChat}
              disabled={!chatInput.trim()}
              className="w-12 h-12 rounded-2xl gradient-neon-bg flex items-center justify-center text-primary-foreground disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
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
              onClick={() => {
                if (item.view === "mutasi") {
                  onNavigate?.("mutasi");
                } else if (item.view) {
                  setView(item.view);
                }
              }}
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

      {/* Menu Lainnya */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Lainnya</h3>
        <div className="space-y-2">
          {[
            { icon: Settings, label: "Pengaturan Umum", desc: "Notifikasi, bahasa, tampilan", color: "text-primary", action: () => setView("general-settings") },
            { icon: ShieldCheck, label: "Keamanan Akun", desc: "Password, PIN, 2FA", color: "text-neon-green", action: () => setView("security") },
            { icon: Users, label: "Undang Teman", desc: "Dapatkan bonus referral", color: "text-neon-orange", action: () => setView("invite") },
            { icon: HelpCircle, label: "Pusat Bantuan", desc: "FAQ & bantuan lainnya", color: "text-neon-purple", action: () => setView("help") },
            { icon: MessageCircle, label: "Chat Bot Admin", desc: "Tanya langsung ke admin", color: "text-neon-cyan", action: () => setView("chatbot") },
            { icon: Globe, label: "Lumadex Website", desc: "lumadex.io", color: "text-primary", action: () => window.open("https://lumadex.io", "_blank") },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="glass-card-hover w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                  {item.label === "Lumadex Website" ? (
                    <img src={lumadexLogo} alt="Lumadex" className="w-6 h-6 object-contain" />
                  ) : (
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              {item.label === "Lumadex Website" ? (
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
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
