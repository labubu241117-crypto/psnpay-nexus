import { useState } from "react";
import { ArrowLeft, Search, Banknote, PiggyBank, MapPin, Smartphone, Zap, Wifi, Gamepad2, Wallet, Radio, Truck, Film, FileText, Droplets, Recycle, DollarSign } from "lucide-react";

const categories = [
  {
    title: "Keuangan",
    icon: Banknote,
    items: [
      { icon: Banknote, label: "Transfer" },
      { icon: PiggyBank, label: "Simpanan" },
      { icon: MapPin, label: "Check-in" },
    ],
  },
  {
    title: "Prabayar",
    icon: Smartphone,
    items: [
      { icon: Smartphone, label: "Pulsa" },
      { icon: Zap, label: "Token PLN" },
      { icon: Wifi, label: "Paket Data" },
      { icon: Gamepad2, label: "V-Game" },
      { icon: Wallet, label: "EWallet" },
      { icon: Radio, label: "EMoney" },
      { icon: Truck, label: "Saldo Ojol" },
      { icon: Film, label: "Hiburan" },
    ],
  },
  {
    title: "Pascabayar",
    icon: FileText,
    items: [
      { icon: Zap, label: "T-Pln" },
      { icon: Droplets, label: "T-Pdam" },
      { icon: Recycle, label: "T-Bpjs" },
      { icon: DollarSign, label: "Finance" },
    ],
  },
];

interface MenuScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export default function MenuScreen({ onBack, onNavigate }: MenuScreenProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-foreground">Menu Lainnya</h2>
      </div>

      {/* Search */}
      <div className="glass-card p-3 flex items-center gap-3">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      {/* Categories */}
      {filteredCategories.map((cat) => (
        <div key={cat.title}>
          <div className="flex items-center gap-2 mb-3">
            <cat.icon className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">{cat.title}</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {cat.items.map((item) => (
              <button key={item.label} className="action-button group" onClick={() => {
                if (item.label === "Transfer") onNavigate?.("transfer");
              }}>
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-all group-hover:neon-glow">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
