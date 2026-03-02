import { useState } from "react";
import { ArrowLeft, Search, Banknote, PiggyBank, MapPin, Smartphone, Zap, Wifi, Gamepad2, Wallet, Radio, Truck, Film, FileText, Droplets, Recycle, DollarSign, CreditCard, Globe, Satellite, Phone as PhoneIcon, Building2, GraduationCap, Heart, HandHeart } from "lucide-react";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  serviceId: string;
  badge?: "Promo" | "Baru";
  iconColor?: string;
};

type Category = {
  title: string;
  items: MenuItem[];
};

const categories: Category[] = [
  {
    title: "Isi Ulang",
    items: [
      { icon: Smartphone, label: "Pulsa", serviceId: "pulsa", badge: "Promo", iconColor: "hsl(var(--neon-blue))" },
      { icon: Wifi, label: "Paket Data", serviceId: "paket-data", iconColor: "hsl(var(--neon-orange))" },
      { icon: Wallet, label: "Uang Elektronik", serviceId: "ewallet", iconColor: "hsl(var(--neon-green))" },
      { icon: Globe, label: "Roaming", serviceId: "service:roaming", iconColor: "hsl(var(--neon-purple))" },
    ],
  },
  {
    title: "Tagihan & Token Gratis Admin",
    items: [
      { icon: FileText, label: "Tagihan Saya", serviceId: "service:tagihan-saya", badge: "Promo", iconColor: "hsl(var(--neon-green))" },
      { icon: Zap, label: "Listrik PLN", serviceId: "token-pln", iconColor: "hsl(var(--neon-orange))" },
      { icon: Droplets, label: "PDAM", serviceId: "service:tagihan-pdam", iconColor: "hsl(var(--neon-blue))" },
      { icon: Satellite, label: "TV Kabel & Internet", serviceId: "service:tv-internet", iconColor: "hsl(var(--neon-cyan))" },
      { icon: PhoneIcon, label: "Telkom", serviceId: "service:telkom", iconColor: "hsl(var(--neon-green))" },
      { icon: Smartphone, label: "Pasca Bayar", serviceId: "service:pascabayar", iconColor: "hsl(var(--neon-blue))" },
      { icon: CreditCard, label: "Angsuran Kredit", serviceId: "finance", iconColor: "hsl(var(--neon-orange))" },
      { icon: CreditCard, label: "Kartu Kredit", serviceId: "service:kartu-kredit", iconColor: "hsl(var(--neon-purple))" },
      { icon: GraduationCap, label: "Biaya Pendidikan", serviceId: "service:pendidikan", badge: "Promo", iconColor: "hsl(var(--neon-orange))" },
      { icon: Recycle, label: "BPJS", serviceId: "service:tagihan-bpjs", iconColor: "hsl(var(--neon-green))" },
    ],
  },
  {
    title: "Hiburan",
    items: [
      { icon: Gamepad2, label: "Voucher Game", serviceId: "vgame", iconColor: "hsl(var(--neon-blue))" },
      { icon: Film, label: "Streaming", serviceId: "service:hiburan", badge: "Baru", iconColor: "hsl(var(--neon-red))" },
      { icon: Radio, label: "EMoney", serviceId: "emoney-service", iconColor: "hsl(var(--neon-cyan))" },
    ],
  },
  {
    title: "Transportasi & Lainnya",
    items: [
      { icon: Truck, label: "Saldo Ojol", serviceId: "service:saldo-ojol", iconColor: "hsl(var(--neon-green))" },
      { icon: Building2, label: "Hotel", serviceId: "service:hotel", iconColor: "hsl(var(--neon-blue))" },
    ],
  },
  {
    title: "Keuangan",
    items: [
      { icon: Banknote, label: "Transfer", serviceId: "transfer", iconColor: "hsl(var(--neon-blue))" },
      { icon: PiggyBank, label: "Simpanan", serviceId: "simpanan", iconColor: "hsl(var(--neon-green))" },
      { icon: MapPin, label: "Check-in", serviceId: "checkin", iconColor: "hsl(var(--neon-orange))" },
      { icon: HandHeart, label: "Donasi", serviceId: "service:donasi", iconColor: "hsl(var(--neon-purple))" },
      { icon: Heart, label: "Zakat", serviceId: "service:zakat", iconColor: "hsl(var(--neon-green))" },
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

  const handleItemClick = (serviceId: string) => {
    if (["transfer", "emoney-service", "simpanan", "checkin", "pulsa", "token-pln", "paket-data", "vgame"].includes(serviceId)) {
      const mapped = serviceId === "emoney-service" ? "emoney" : serviceId;
      onNavigate?.(mapped);
    } else if (serviceId === "finance") {
      onNavigate?.("service:finance");
    } else {
      onNavigate?.(serviceId.startsWith("service:") ? serviceId.replace("service:", "service:") : `service:${serviceId}`);
    }
  };

  return (
    <div className="pb-28 pt-6 space-y-4">
      {/* Header */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Pulsa, Tagihan & Tiket</h2>
        </div>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="glass-card p-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      {filteredCategories.map((cat) => (
        <div key={cat.title} className="glass-card mx-4 p-4">
          <h3 className="font-bold text-foreground mb-4 text-sm">{cat.title}</h3>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {cat.items.map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center gap-1.5 group relative"
                onClick={() => handleItemClick(item.serviceId)}
              >
                {/* Badge */}
                {item.badge && (
                  <span className={`absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.badge === "Promo"
                      ? "bg-[hsl(var(--neon-orange))] text-[hsl(var(--primary-foreground))]"
                      : "bg-[hsl(var(--neon-green))] text-[hsl(var(--primary-foreground))]"
                  }`}>
                    {item.badge}
                  </span>
                )}
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${item.iconColor || 'hsl(var(--primary))'}20` }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: item.iconColor || 'hsl(var(--primary))' }}
                  />
                </div>
                {/* Label */}
                <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight max-w-[72px]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
