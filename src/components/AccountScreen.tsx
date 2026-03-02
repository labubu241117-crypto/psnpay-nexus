import { Shield, UserCheck, Wallet, Code, LogOut, ChevronRight, Fingerprint, BadgeCheck } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";

const settingsItems = [
  { icon: Shield, label: "Security", desc: "2FA, biometrics, PIN" },
  { icon: UserCheck, label: "KYC Verification", desc: "Verified • Level 2" },
  { icon: Fingerprint, label: "Biometric Login", desc: "Face ID enabled" },
  { icon: Wallet, label: "Cold Wallet", desc: "Connect hardware wallet" },
  { icon: Code, label: "Developer API", desc: "API keys & webhooks" },
];

export default function AccountScreen() {
  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground">Account</h2>

      {/* Profile Card */}
      <div className="glass-card p-6 neon-border flex items-center gap-4">
        <div className="relative">
          <img src={psnpayLogo} alt="Avatar" className="w-16 h-16 rounded-2xl" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-green flex items-center justify-center">
            <BadgeCheck className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
        <div>
          <p className="font-bold text-lg text-foreground">Alex Crypto</p>
          <p className="text-sm text-muted-foreground">alex@psnpay.id</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full gradient-neon-bg text-primary-foreground font-semibold">
              Holder
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-neon-green font-semibold">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        {settingsItems.map((item) => (
          <button key={item.label} className="glass-card-hover w-full p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
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

      {/* Logout */}
      <button className="w-full p-4 rounded-2xl border border-destructive/30 flex items-center justify-center gap-2 text-destructive font-medium transition-all hover:bg-destructive/10">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
