import { Shield, UserCheck, Lock, ChevronRight, BadgeCheck, User, KeyRound, FileText, Info, Fingerprint, LogOut } from "lucide-react";
import psnpayLogo from "@/assets/psnpay-logo.png";

const accountSettings = [
  { icon: User, label: "Profil", color: "text-primary" },
  { icon: Lock, label: "Password", color: "text-neon-green" },
  { icon: Fingerprint, label: "PIN", color: "text-neon-orange" },
];

const services = [
  { icon: Shield, label: "KYC & Menjadi Mitra", desc: "Verifikasi akun & jadi mitra", color: "text-neon-purple" },
  { icon: FileText, label: "Mutasi", desc: "Riwayat transaksi lengkap", color: "text-primary" },
  { icon: KeyRound, label: "Developer API", desc: "API keys & webhooks", color: "text-neon-cyan" },
];

export default function AccountScreen() {
  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
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
              <h2 className="text-xl font-bold text-foreground">Muhamad Rifki</h2>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                ✏️
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">labubu241117@gmail.co...</p>
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
            <button key={item.label} className="glass-card-hover p-4 flex flex-col items-center gap-3">
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
            <button key={item.label} className="glass-card-hover w-full p-4 flex items-center justify-between text-left">
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
