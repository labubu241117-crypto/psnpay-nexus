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
import { useI18n, languages as i18nLanguages } from "@/lib/i18n";

type AccountView = "main" | "profile" | "password" | "pin" | "kyc" | "general-settings" | "security" | "invite" | "help" | "chatbot";

export default function AccountScreen({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { t, lang, setLang } = useI18n();
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
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const currentLangLabel = i18nLanguages.find(l => l.code === lang)?.label || "Indonesia";

  const accountSettings = [
    { icon: User, label: t("account.profile"), color: "text-primary", view: "profile" as AccountView },
    { icon: Lock, label: t("account.password"), color: "text-neon-green", view: "password" as AccountView },
    { icon: Fingerprint, label: t("account.pin"), color: "text-neon-orange", view: "pin" as AccountView },
  ];

  const services = [
    { icon: Shield, label: t("account.kyc"), desc: t("account.kycDesc"), color: "text-neon-purple", view: "kyc" as AccountView },
    { icon: FileText, label: t("account.mutation"), desc: t("account.mutationDesc"), color: "text-primary", view: "mutasi" as any },
    { icon: KeyRound, label: t("account.devApi"), desc: t("account.devApiDesc"), color: "text-neon-cyan", view: null },
  ];

  const handleBack = () => {
    setView("main");
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
          <h2 className="text-xl font-bold text-foreground">{t("account.profile")}</h2>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden border-2 border-primary/30">
              <img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("account.profile")}</label>
            <input value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">No. Handphone</label>
            <input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <button
          onClick={() => { setProfileSaving(true); setTimeout(() => { setProfileSaving(false); toast({ title: t("common.success") + " ✅" }); }, 1200); }}
          disabled={profileSaving || !profileName.trim() || !profileEmail.trim()}
          className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {t("common.save")}
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
          <h3 className="text-xl font-bold text-foreground">{t("common.success")}</h3>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">
            {t("common.back")}
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
          <h2 className="text-xl font-bold text-foreground">{t("account.password")}</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: "Password Lama", value: oldPassword, set: setOldPassword, show: showOld, toggle: () => setShowOld(!showOld) },
            { label: "Password Baru", value: newPassword, set: setNewPassword, show: showNew, toggle: () => setShowNew(!showNew) },
            { label: "Konfirmasi", value: confirmPassword, set: setConfirmPassword, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
          ].map((field, i) => (
            <div key={i} className="space-y-2">
              <label className="text-sm font-medium text-foreground">{field.label}</label>
              <div className="relative">
                <input type={field.show ? "text" : "password"} value={field.value} onChange={e => field.set(e.target.value)} className="w-full p-3 pr-12 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <button onClick={field.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {field.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setPwSuccess(true)} disabled={!pwValid} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">
          {t("account.password")}
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
            <div key={i} className={`w-11 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold ${value[i] ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary text-muted-foreground"}`}>
              {value[i] ? "•" : ""}
            </div>
          ))}
        </div>
        <input type="tel" maxLength={6} value={value} onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••" autoFocus />
      </div>
    );

    if (pinStep === "success") {
      return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{t("common.success")}</h3>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">{t("common.back")}</button>
        </div>
      );
    }

    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">{t("account.pin")}</h2>
        </div>

        <div className="flex items-center gap-2 justify-center">
          {["verify", "new", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${pinStep === s ? "gradient-neon-bg text-primary-foreground" : ["verify", "new", "confirm"].indexOf(pinStep) > i ? "bg-neon-green text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
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
            <PinInput value={currentPin} onChange={setCurrentPin} label="PIN" />
            <button onClick={() => { if (currentPin === "123456") { setPinError(""); setPinStep("new"); setCurrentPin(""); } else { setPinError("PIN salah. Demo PIN: 123456"); } }} disabled={currentPin.length !== 6} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">
              {t("common.continue")}
            </button>
          </>
        )}
        {pinStep === "new" && (
          <>
            <PinInput value={newPin} onChange={setNewPin} label="PIN Baru" />
            <button onClick={() => setPinStep("confirm")} disabled={newPin.length !== 6} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">{t("common.continue")}</button>
          </>
        )}
        {pinStep === "confirm" && (
          <>
            <PinInput value={confirmPin} onChange={setConfirmPin} label="Konfirmasi PIN" />
            <button onClick={() => { if (confirmPin === newPin) { setPinStep("success"); } else { setPinError("PIN tidak cocok"); setConfirmPin(""); } }} disabled={confirmPin.length !== 6} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">{t("common.save")}</button>
          </>
        )}
      </div>
    );
  }

  // ─── KYC ───
  if (view === "kyc") {
    if (kycStep === "submitted") {
      return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center"><CheckCircle2 className="w-10 h-10 text-neon-green" /></div>
          <h3 className="text-xl font-bold text-foreground">{t("common.success")}</h3>
          <button onClick={handleBack} className="mt-4 px-8 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">{t("common.back")}</button>
        </div>
      );
    }
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("account.kyc")}</h2>
        </div>
        <div className="flex items-center gap-2 justify-center">
          {["info", "upload", "review"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${kycStep === s ? "gradient-neon-bg text-primary-foreground" : ["info", "upload", "review"].indexOf(kycStep) > i ? "bg-neon-green text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
              {i < 2 && <div className={`w-8 h-0.5 ${["info", "upload", "review"].indexOf(kycStep) > i ? "bg-neon-green" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        {kycStep === "info" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nama</label>
              <input value={kycName} onChange={e => setKycName(e.target.value)} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">NIK</label>
              <input value={kycNik} onChange={e => setKycNik(e.target.value.replace(/\D/g, "").slice(0, 16))} placeholder="16 digit NIK" maxLength={16} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alamat</label>
              <textarea value={kycAddress} onChange={e => setKycAddress(e.target.value)} rows={3} className="w-full p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
            <button onClick={() => setKycStep("upload")} disabled={!kycName.trim() || kycNik.length !== 16 || !kycAddress.trim()} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">{t("common.continue")}</button>
          </div>
        )}
        {kycStep === "upload" && (
          <div className="space-y-4">
            <button onClick={() => setKtpUploaded(true)} className={`w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center gap-3 ${ktpUploaded ? "border-neon-green bg-neon-green/5" : "border-border"}`}>
              {ktpUploaded ? <><CheckCircle2 className="w-10 h-10 text-neon-green" /><span className="text-sm text-neon-green">KTP ✓</span></> : <><Camera className="w-6 h-6 text-muted-foreground" /><span className="text-sm text-foreground">Upload KTP</span></>}
            </button>
            <button onClick={() => setSelfieUploaded(true)} className={`w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center gap-3 ${selfieUploaded ? "border-neon-green bg-neon-green/5" : "border-border"}`}>
              {selfieUploaded ? <><CheckCircle2 className="w-10 h-10 text-neon-green" /><span className="text-sm text-neon-green">Selfie ✓</span></> : <><User className="w-6 h-6 text-muted-foreground" /><span className="text-sm text-foreground">Selfie + KTP</span></>}
            </button>
            <button onClick={() => setKycStep("review")} disabled={!ktpUploaded || !selfieUploaded} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold disabled:opacity-50">{t("common.continue")}</button>
          </div>
        )}
        {kycStep === "review" && (
          <div className="space-y-4">
            <div className="glass-card p-4 space-y-3">
              {[["Nama", kycName], ["NIK", kycNik.slice(0, 4) + "****" + kycNik.slice(-4)], ["Alamat", kycAddress]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm"><span className="text-muted-foreground">{k}</span><span className="text-foreground font-medium">{v}</span></div>
              ))}
            </div>
            <button onClick={() => setKycStep("submitted")} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold">{t("common.continue")}</button>
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
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("settings.title")}</h2>
        </div>

        <div className="space-y-2">
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><Bell className="w-5 h-5 text-primary" /></div>
              <div><p className="font-medium text-sm text-foreground">{t("settings.notification")}</p><p className="text-xs text-muted-foreground">{t("settings.notifDesc")}</p></div>
            </div>
            <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1"><div className="w-5 h-5 rounded-full bg-primary-foreground translate-x-5" /></div>
          </div>

          <button onClick={() => setShowLanguagePicker(true)} className="glass-card w-full p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><Languages className="w-5 h-5 text-primary" /></div>
              <div><p className="font-medium text-sm text-foreground">{t("settings.language")}</p><p className="text-xs text-muted-foreground">{currentLangLabel}</p></div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><Smartphone className="w-5 h-5 text-primary" /></div>
              <div><p className="font-medium text-sm text-foreground">{t("settings.display")}</p><p className="text-xs text-muted-foreground">{theme === "dark" ? t("settings.darkMode") : t("settings.lightMode")}</p></div>
            </div>
            <button onClick={toggleTheme} className="w-12 h-7 rounded-full bg-primary/20 flex items-center px-1 transition-all">
              <div className={`w-5 h-5 rounded-full bg-primary transition-transform ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {showLanguagePicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setShowLanguagePicker(false)}>
            <div className="w-full max-w-md bg-background rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{t("settings.selectLanguage")}</h3>
                <button onClick={() => setShowLanguagePicker(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><X className="w-4 h-4 text-foreground" /></button>
              </div>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {i18nLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLanguagePicker(false); toast({ title: `${t("settings.languageChanged")} ${l.label} ${l.flag}` }); }}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${lang === l.code ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"}`}
                  >
                    <div className="flex items-center gap-3"><span className="text-2xl">{l.flag}</span><span className="font-medium text-sm text-foreground">{l.label}</span></div>
                    {lang === l.code && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="glass-card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">{t("settings.about")}</h3>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("settings.version")}</span><span className="text-foreground">1.0.0</span></div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("settings.build")}</span><span className="text-foreground">2026.03.02</span></div>
        </div>
      </div>
    );
  }

  // ─── Keamanan Akun ───
  if (view === "security") {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("account.security")}</h2>
        </div>
        <div className="space-y-2">
          {[
            { icon: Lock, label: t("account.password"), desc: t("account.securityDesc"), action: () => setView("password") },
            { icon: Fingerprint, label: t("account.pin"), desc: "PIN", action: () => setView("pin") },
            { icon: Smartphone, label: "2FA", desc: "SMS", toggle: true },
            { icon: Eye, label: "Biometrik", desc: "Fingerprint/Face", toggle: true },
          ].map((item, i) => (
            <button key={i} onClick={item.action || undefined} className="glass-card w-full p-4 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><item.icon className="w-5 h-5 text-primary" /></div>
                <div><p className="font-medium text-sm text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              </div>
              {item.toggle ? <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1"><div className="w-5 h-5 rounded-full bg-primary-foreground translate-x-5" /></div> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </button>
          ))}
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
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("account.inviteFriends")}</h2>
        </div>
        <div className="glass-card p-6 neon-border text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto"><Gift className="w-8 h-8 text-primary" /></div>
          <h3 className="text-lg font-bold text-foreground">{t("account.inviteFriends")}</h3>
          <p className="text-sm text-muted-foreground">{t("account.inviteDesc")}</p>
        </div>
        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-2xl bg-secondary border border-border text-foreground font-bold text-center tracking-widest">{referralCode}</div>
            <button onClick={() => { navigator.clipboard?.writeText(referralCode); toast({ title: t("home.copied") }); }} className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground"><Copy className="w-5 h-5" /></button>
          </div>
        </div>
        <button onClick={() => { if (navigator.share) navigator.share({ title: "PSNPAY", text: `${referralCode}` }); else toast({ title: t("home.copied") }); }} className="w-full py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-semibold flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" /> {t("qr.share")}
        </button>
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
          <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("account.helpCenter")}</h2>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input placeholder={t("common.search") + "..."} className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground" />
        </div>
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
        <button onClick={() => setView("chatbot")} className="w-full p-3 rounded-2xl bg-secondary flex items-center gap-3 text-left hover:bg-accent transition-colors">
          <MessageCircle className="w-5 h-5 text-primary" />
          <div><p className="text-sm font-medium text-foreground">{t("account.chatbot")}</p><p className="text-xs text-muted-foreground">{t("account.chatbotDesc")}</p></div>
        </button>
      </div>
    );
  }

  // ─── Chat Bot ───
  if (view === "chatbot") {
    const botResponses: Record<string, string> = {
      "saldo": "Untuk cek saldo, buka menu Dompet di tab bawah.",
      "transfer": "Untuk transfer, buka menu Home → Transfer.",
      "kyc": "Untuk verifikasi KYC, buka Akun → KYC & Menjadi Mitra.",
      "pin": "Untuk ubah PIN, buka Akun → PIN. Demo PIN: 123456.",
    };
    const handleSendChat = () => {
      if (!chatInput.trim()) return;
      const userMsg = chatInput.trim();
      setChatMessages(prev => [...prev, { from: "user", text: userMsg }]);
      setChatInput("");
      setTimeout(() => {
        const key = Object.keys(botResponses).find(k => userMsg.toLowerCase().includes(k));
        setChatMessages(prev => [...prev, { from: "bot", text: key ? botResponses[key] : "Terima kasih. Tim kami akan segera menghubungi Anda. 🌐" }]);
      }, 800);
    };
    return (
      <div className="flex flex-col h-screen max-h-screen">
        <div className="px-4 pt-6 pb-3 flex items-center gap-3 border-b border-border">
          <button onClick={() => setView("main")} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-primary" /></div>
            <div><h2 className="text-base font-bold text-foreground">{t("account.chatbot")}</h2><p className="text-xs text-neon-green">● Online</p></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-28">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.from === "user" ? "gradient-neon-bg text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex items-center gap-2 max-w-md mx-auto">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendChat()} placeholder="..." className="flex-1 p-3 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button onClick={handleSendChat} disabled={!chatInput.trim()} className="w-12 h-12 rounded-2xl gradient-neon-bg flex items-center justify-center text-primary-foreground disabled:opacity-50"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main ───
  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t("account.title")}</h2>
        <button onClick={toggleTheme} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary hover:neon-glow transition-all">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="glass-card p-6 neon-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-secondary overflow-hidden border-2 border-primary/30"><img src={psnpayLogo} alt="Avatar" className="w-full h-full object-cover" /></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neon-green flex items-center justify-center"><BadgeCheck className="w-3.5 h-3.5 text-primary-foreground" /></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{profileName}</h2>
              <button onClick={() => setView("profile")} className="text-muted-foreground hover:text-primary transition-colors">✏️</button>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{profileEmail.length > 22 ? profileEmail.slice(0, 22) + "..." : profileEmail}</p>
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full gradient-neon-bg text-primary-foreground font-semibold mt-2"><BadgeCheck className="w-3 h-3" /> {t("home.member")}</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4"><Info className="w-4 h-4 text-primary" /><h3 className="font-semibold text-foreground">{t("account.memberInfo")}</h3></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-3"><p className="text-xs text-muted-foreground">{t("account.memberId")}</p><p className="text-sm font-semibold neon-text mt-0.5 truncate">169000000...</p></div>
          <div className="glass-card p-3"><p className="text-xs text-muted-foreground">{t("account.status")}</p><p className="text-sm font-semibold status-success mt-0.5">{t("home.member")}</p></div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("account.settings")}</h3>
        <div className="grid grid-cols-3 gap-3">
          {accountSettings.map((item) => (
            <button key={item.label} onClick={() => setView(item.view)} className="glass-card-hover p-4 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center"><item.icon className={`w-5 h-5 ${item.color}`} /></div>
              <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("account.services")}</h3>
        <div className="space-y-2">
          {services.map((item) => (
            <button key={item.label} onClick={() => { if (item.view === "mutasi") onNavigate?.("mutasi"); else if (item.view) setView(item.view); }} className="glass-card-hover w-full p-4 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center"><item.icon className={`w-5 h-5 ${item.color}`} /></div>
                <div><p className="font-medium text-sm text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">{t("account.others")}</h3>
        <div className="space-y-2">
          {[
            { icon: Settings, label: t("account.generalSettings"), desc: t("account.generalSettingsDesc"), color: "text-primary", action: () => setView("general-settings") },
            { icon: ShieldCheck, label: t("account.security"), desc: t("account.securityDesc"), color: "text-neon-green", action: () => setView("security") },
            { icon: Users, label: t("account.inviteFriends"), desc: t("account.inviteDesc"), color: "text-neon-orange", action: () => setView("invite") },
            { icon: HelpCircle, label: t("account.helpCenter"), desc: t("account.helpDesc"), color: "text-neon-purple", action: () => setView("help") },
            { icon: MessageCircle, label: t("account.chatbot"), desc: t("account.chatbotDesc"), color: "text-neon-cyan", action: () => setView("chatbot") },
            { icon: Globe, label: t("account.lumadex"), desc: "lumadex.io", color: "text-primary", action: () => window.open("https://lumadex.io", "_blank") },
          ].map((item) => (
            <button key={item.label} onClick={item.action} className="glass-card-hover w-full p-4 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                  {item.label === t("account.lumadex") ? <img src={lumadexLogo} alt="Lumadex" className="w-6 h-6 object-contain" /> : <item.icon className={`w-5 h-5 ${item.color}`} />}
                </div>
                <div><p className="font-medium text-sm text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              </div>
              {item.label === t("account.lumadex") ? <ExternalLink className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full py-3 rounded-2xl border border-destructive/30 text-destructive font-semibold text-sm flex items-center justify-center gap-2 hover:bg-destructive/5 transition-all">
        <LogOut className="w-4 h-4" /> {t("account.logout")}
      </button>
    </div>
  );
}
