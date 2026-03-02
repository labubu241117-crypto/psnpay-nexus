import { Home, Wallet, QrCode, FileText, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const tabKeys = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "wallet", icon: Wallet, labelKey: "nav.wallet" },
  { id: "qr", icon: QrCode, labelKey: "nav.qr" },
  { id: "activity", icon: FileText, labelKey: "nav.activity" },
  { id: "account", icon: User, labelKey: "nav.account" },
] as const;

export type TabId = typeof tabKeys[number]["id"];

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="mx-4 mb-4 rounded-3xl glass-card border-t-0 px-2 py-2 flex items-center justify-around">
          {tabKeys.map((tab) => {
            if (tab.id === "qr") {
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  className="relative -mt-8 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full gradient-neon-bg flex items-center justify-center animate-pulse-neon">
                    <QrCode className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] mt-1 text-primary font-medium">{t(tab.labelKey)}</span>
                </button>
              );
            }

            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? "neon-text" : ""}`} />
                <span className={`text-[10px] font-medium ${isActive ? "neon-text" : ""}`}>{t(tab.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
