import { useState } from "react";
import BottomNav, { type TabId } from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import WalletScreen from "@/components/WalletScreen";
import ActivityScreen from "@/components/ActivityScreen";
import AccountScreen from "@/components/AccountScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen />;
      case "wallet": return <WalletScreen />;
      case "activity": return <ActivityScreen />;
      case "account": return <AccountScreen />;
      case "qr": return (
        <div className="px-4 pb-28 pt-6 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="w-48 h-48 rounded-3xl neon-border glass-card flex items-center justify-center animate-pulse-neon">
            <span className="text-6xl font-bold neon-text">QR</span>
          </div>
          <p className="text-muted-foreground text-sm">Scan or show QR to pay</p>
        </div>
      );
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative">
      {renderScreen()}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default Index;
