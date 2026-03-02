import { useState } from "react";
import BottomNav, { type TabId } from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import WalletScreen from "@/components/WalletScreen";
import ActivityScreen from "@/components/ActivityScreen";
import AccountScreen from "@/components/AccountScreen";
import QrScreen from "@/components/QrScreen";
import MenuScreen from "@/components/MenuScreen";
import TransferScreen from "@/components/TransferScreen";
import TopUpScreen from "@/components/TopUpScreen";
import EMoneyScreen from "@/components/EMoneyScreen";
import ServiceScreen from "@/components/ServiceScreen";
import SimpananScreen from "@/components/SimpananScreen";
import CheckInScreen from "@/components/CheckInScreen";
import PulsaScreen from "@/components/PulsaScreen";
import TokenPlnScreen from "@/components/TokenPlnScreen";
import PaketDataScreen from "@/components/PaketDataScreen";
import VGameScreen from "@/components/VGameScreen";
import MutasiScreen from "@/components/MutasiScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [overlay, setOverlay] = useState<string | null>(null);

  const handleNavigate = (screen: string) => {
    if (screen === "wallet") {
      setActiveTab("wallet");
    } else {
      setOverlay(screen);
    }
  };

  if (overlay) {
    const isService = overlay.startsWith("service:");
    const serviceId = isService ? overlay.replace("service:", "") : null;

    return (
      <div className="min-h-screen max-w-md mx-auto relative">
        {overlay === "menu" && <MenuScreen onBack={() => setOverlay(null)} onNavigate={(s) => setOverlay(s)} />}
        {overlay === "transfer" && <TransferScreen onBack={() => setOverlay(null)} />}
        {overlay === "topup" && <TopUpScreen onBack={() => setOverlay(null)} />}
        {overlay === "emoney" && <EMoneyScreen onBack={() => setOverlay(null)} />}
        {overlay === "simpanan" && <SimpananScreen onBack={() => setOverlay("menu")} />}
        {overlay === "checkin" && <CheckInScreen onBack={() => setOverlay("menu")} />}
        {overlay === "pulsa" && <PulsaScreen onBack={() => setOverlay("menu")} />}
        {overlay === "token-pln" && <TokenPlnScreen onBack={() => setOverlay("menu")} />}
        {overlay === "paket-data" && <PaketDataScreen onBack={() => setOverlay("menu")} />}
        {overlay === "vgame" && <VGameScreen onBack={() => setOverlay("menu")} />}
        {overlay === "mutasi" && <MutasiScreen onBack={() => setOverlay(null)} />}
        {isService && serviceId && <ServiceScreen serviceId={serviceId} onBack={() => setOverlay("menu")} />}
        <BottomNav active={activeTab} onChange={(tab) => { setOverlay(null); setActiveTab(tab); }} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen onNavigate={handleNavigate} />;
      case "wallet": return <WalletScreen />;
      case "activity": return <ActivityScreen />;
      case "account": return <AccountScreen onNavigate={handleNavigate} />;
      case "qr": return <QrScreen />;
      default: return <HomeScreen onNavigate={handleNavigate} />;
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
