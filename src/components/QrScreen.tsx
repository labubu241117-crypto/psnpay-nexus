import { useState } from "react";
import { QrCode, Flashlight, Image, Copy, Check, Share2, Download, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function QrScreen() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"scan" | "myqr">("scan");
  const [flashOn, setFlashOn] = useState(false);
  const [copied, setCopied] = useState(false);

  const walletAddress = "0x8f3C...a2c1b7E9";
  const fullAddress = "0x8f3C4D2E1A9B7F6C5D4E3A2C1B7E9F0D8C7A6B";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">{t("qr.title")}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t("qr.subtitle")}</p>
      </div>

      <div className="glass-card p-1 flex gap-1">
        {[
          { id: "scan" as const, label: t("qr.scanQr") },
          { id: "myqr" as const, label: t("qr.myQr") },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "gradient-neon-bg text-primary-foreground neon-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "scan" ? (
        <>
          <div className="relative aspect-square max-w-[280px] mx-auto">
            <div className="w-full h-full rounded-3xl neon-border glass-card flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-4">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
              </div>
              <div className="absolute inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
              <div className="flex flex-col items-center gap-3">
                <QrCode className="w-16 h-16 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">{t("qr.pointCamera")}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button onClick={() => setFlashOn(!flashOn)} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${flashOn ? "gradient-neon-bg neon-glow" : "bg-secondary"}`}>
                <Flashlight className={`w-6 h-6 ${flashOn ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              <span className="text-xs text-muted-foreground">{t("qr.flash")}</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center transition-all group-hover:neon-glow">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{t("qr.gallery")}</span>
            </button>
          </div>

          <div className="glass-card p-4 space-y-2">
            <p className="text-sm font-bold text-foreground">{t("qr.howToPay")}</p>
            <div className="space-y-2">
              {[t("qr.step1"), t("qr.step2"), t("qr.step3"), t("qr.step4")].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 rounded-3xl neon-border glass-card flex items-center justify-center animate-pulse-neon p-6">
              <div className="w-full h-full rounded-2xl bg-foreground/90 flex items-center justify-center relative">
                <QrCode className="w-32 h-32 text-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-lg gradient-neon-bg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">PSN</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">Muhamad Rifki</p>
              <p className="text-sm text-muted-foreground mt-1">PSNPAY Wallet</p>
            </div>
          </div>

          <div className="glass-card p-4 neon-border">
            <p className="text-xs text-muted-foreground mb-2">{t("qr.walletAddress")}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-mono text-foreground">{walletAddress}</p>
              <button onClick={handleCopy} className="text-primary hover:text-foreground transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Share2, label: t("qr.share") },
              { icon: Download, label: t("qr.save") },
              { icon: RefreshCw, label: t("qr.refresh") },
            ].map((action) => (
              <button key={action.label} className="glass-card-hover p-4 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">{t("qr.recentReceived")}</h3>
            <div className="space-y-2">
              {[
                { name: "Ahmad S.", amount: "+Rp 50.000", time: "2 jam lalu" },
                { name: "Dewi R.", amount: "+Rp 125.000", time: "Kemarin" },
                { name: "Budi P.", amount: "+Rp 75.000", time: "3 hari lalu" },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold status-success">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
