import { useState } from "react";
import { ArrowLeft, Search, Banknote, PiggyBank, MapPin, Smartphone, Zap, Wifi, Gamepad2, Wallet, Radio, Truck, Film, FileText, Droplets, Recycle, DollarSign, CreditCard, Globe, Satellite, Phone as PhoneIcon, Building2, GraduationCap, Heart, HandHeart, Sparkles, Tag, Gift } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type MenuItem = { icon: React.ElementType; label: string; serviceId: string; badge?: "Promo" | "Baru"; iconColor?: string; };
type Category = { title: string; items: MenuItem[]; };

interface MenuScreenProps { onBack: () => void; onNavigate?: (screen: string) => void; }

export default function MenuScreen({ onBack, onNavigate }: MenuScreenProps) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");

  const banners = [
    { id: 1, title: "Pulsa 25RB", subtitle: "Semua Operator", price: "22.800", oldPrice: "26.000", accent: "var(--neon-orange)", icon: Smartphone },
    { id: 2, title: "Paket Data 6GB", subtitle: "30 Hari Aktif", price: "13.000", oldPrice: "15.000", accent: "var(--neon-blue)", icon: Wifi },
    { id: 3, title: "Token PLN 50RB", subtitle: t("common.freeAdmin"), price: "49.500", oldPrice: "51.000", accent: "var(--neon-green)", icon: Zap },
    { id: 4, title: "Cashback 20%", subtitle: "E-Wallet Top Up", price: "Min. 50RB", oldPrice: "", accent: "var(--neon-purple)", icon: Gift },
  ];

  const categories: Category[] = [
    {
      title: t("menu.topUpCat"),
      items: [
        { icon: Smartphone, label: "Pulsa", serviceId: "pulsa", badge: "Promo", iconColor: "hsl(var(--neon-blue))" },
        { icon: Wifi, label: "Paket Data", serviceId: "paket-data", iconColor: "hsl(var(--neon-orange))" },
        { icon: Wallet, label: "E-Wallet", serviceId: "ewallet", iconColor: "hsl(var(--neon-green))" },
        { icon: Globe, label: "Roaming", serviceId: "service:roaming", iconColor: "hsl(var(--neon-purple))" },
      ],
    },
    {
      title: t("menu.billsCat"),
      items: [
        { icon: FileText, label: t("activity.bills"), serviceId: "service:tagihan-saya", badge: "Promo", iconColor: "hsl(var(--neon-green))" },
        { icon: Zap, label: "Listrik PLN", serviceId: "token-pln", iconColor: "hsl(var(--neon-orange))" },
        { icon: Droplets, label: "PDAM", serviceId: "service:tagihan-pdam", iconColor: "hsl(var(--neon-blue))" },
        { icon: Satellite, label: "TV & Internet", serviceId: "service:tv-internet", iconColor: "hsl(var(--neon-cyan))" },
        { icon: PhoneIcon, label: "Telkom", serviceId: "service:telkom", iconColor: "hsl(var(--neon-green))" },
        { icon: Smartphone, label: "Pasca Bayar", serviceId: "service:pascabayar", iconColor: "hsl(var(--neon-blue))" },
        { icon: CreditCard, label: "Angsuran", serviceId: "finance", iconColor: "hsl(var(--neon-orange))" },
        { icon: CreditCard, label: "Kartu Kredit", serviceId: "service:kartu-kredit", iconColor: "hsl(var(--neon-purple))" },
        { icon: GraduationCap, label: "Pendidikan", serviceId: "service:pendidikan", badge: "Promo", iconColor: "hsl(var(--neon-orange))" },
        { icon: Recycle, label: "BPJS", serviceId: "service:tagihan-bpjs", iconColor: "hsl(var(--neon-green))" },
      ],
    },
    {
      title: t("menu.entertainment"),
      items: [
        { icon: Gamepad2, label: "Voucher Game", serviceId: "vgame", iconColor: "hsl(var(--neon-blue))" },
        { icon: Film, label: "Streaming", serviceId: "service:hiburan", badge: "Baru", iconColor: "hsl(var(--neon-red))" },
        { icon: Radio, label: "EMoney", serviceId: "emoney-service", iconColor: "hsl(var(--neon-cyan))" },
      ],
    },
    {
      title: t("menu.transport"),
      items: [
        { icon: Truck, label: "Saldo Ojol", serviceId: "service:saldo-ojol", iconColor: "hsl(var(--neon-green))" },
        { icon: Building2, label: "Hotel", serviceId: "service:hotel", iconColor: "hsl(var(--neon-blue))" },
      ],
    },
    {
      title: t("menu.finance"),
      items: [
        { icon: Banknote, label: t("home.transfer"), serviceId: "transfer", iconColor: "hsl(var(--neon-blue))" },
        { icon: PiggyBank, label: "Simpanan", serviceId: "simpanan", iconColor: "hsl(var(--neon-green))" },
        { icon: MapPin, label: "Check-in", serviceId: "checkin", iconColor: "hsl(var(--neon-orange))" },
        { icon: HandHeart, label: "Donasi", serviceId: "service:donasi", iconColor: "hsl(var(--neon-purple))" },
        { icon: Heart, label: "Zakat", serviceId: "service:zakat", iconColor: "hsl(var(--neon-green))" },
      ],
    },
  ];

  const filteredCategories = categories.map(cat => ({ ...cat, items: cat.items.filter(item => item.label.toLowerCase().includes(search.toLowerCase())) })).filter(cat => cat.items.length > 0);

  const handleItemClick = (serviceId: string) => {
    if (["transfer", "emoney-service", "simpanan", "checkin", "pulsa", "token-pln", "paket-data", "vgame"].includes(serviceId)) {
      onNavigate?.(serviceId === "emoney-service" ? "emoney" : serviceId);
    } else if (serviceId === "finance") {
      onNavigate?.("service:finance");
    } else {
      onNavigate?.(serviceId.startsWith("service:") ? serviceId : `service:${serviceId}`);
    }
  };

  return (
    <div className="pb-28 pt-6 space-y-4">
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-xl font-bold text-foreground">{t("menu.title")}</h2>
        </div>
      </div>

      <div className="px-4">
        <div className="glass-card p-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder={t("menu.search")} value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {banners.map(banner => (
            <div key={banner.id} className="snap-start shrink-0 w-[75%] rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{ background: `linear-gradient(135deg, hsl(${banner.accent} / 0.2) 0%, hsl(${banner.accent} / 0.05) 100%)`, border: `1px solid hsl(${banner.accent} / 0.3)` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `hsl(${banner.accent} / 0.15)` }}>
                <banner.icon className="w-7 h-7" style={{ color: `hsl(${banner.accent})` }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Tag className="w-3 h-3" style={{ color: `hsl(${banner.accent})` }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `hsl(${banner.accent})` }}>{t("menu.cheaper")}</span>
                </div>
                <p className="text-sm font-bold text-foreground truncate">{banner.title}</p>
                <p className="text-[11px] text-muted-foreground">{banner.subtitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  {banner.oldPrice && <span className="text-[11px] text-muted-foreground line-through">Rp {banner.oldPrice}</span>}
                  <span className="text-sm font-bold" style={{ color: `hsl(${banner.accent})` }}>Rp {banner.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-2">
          {banners.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />)}
        </div>
      </div>

      {filteredCategories.map(cat => (
        <div key={cat.title} className="glass-card mx-4 p-4">
          <h3 className="font-bold text-foreground mb-4 text-sm">{cat.title}</h3>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {cat.items.map(item => (
              <button key={item.label} className="flex flex-col items-center gap-1.5 group relative" onClick={() => handleItemClick(item.serviceId)}>
                {item.badge && (
                  <span className={`absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded ${item.badge === "Promo" ? "bg-[hsl(var(--neon-orange))] text-[hsl(var(--primary-foreground))]" : "bg-[hsl(var(--neon-green))] text-[hsl(var(--primary-foreground))]"}`}>{item.badge}</span>
                )}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ backgroundColor: `${item.iconColor || 'hsl(var(--primary))'}20` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.iconColor || 'hsl(var(--primary))' }} />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight max-w-[72px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
