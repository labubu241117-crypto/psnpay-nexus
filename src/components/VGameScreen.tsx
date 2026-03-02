import { useState } from "react";
import { ArrowLeft, Gamepad2, Search, Tag, Send, ChevronDown, Star } from "lucide-react";

type Game = {
  id: string;
  name: string;
  icon: string;
  idLabel: string;
  idPlaceholder: string;
  hasServer?: boolean;
  products: Product[];
};

type Product = {
  name: string;
  price: number;
  original?: number;
  discount?: number;
  popular?: boolean;
};

const games: Game[] = [
  {
    id: "ml", name: "Mobile Legends", icon: "🎮", idLabel: "User ID", idPlaceholder: "Masukkan User ID", hasServer: true,
    products: [
      { name: "11 Diamonds", price: 3800, original: 4000, discount: 5 },
      { name: "22 Diamonds", price: 7200, original: 7500, discount: 4 },
      { name: "56 Diamonds", price: 15800, original: 16500, discount: 4, popular: true },
      { name: "112 Diamonds", price: 30500, original: 32000, discount: 5 },
      { name: "184 Diamonds", price: 49500, original: 52000, discount: 5, popular: true },
      { name: "240 Diamonds", price: 63000, original: 66000, discount: 5 },
      { name: "296 Diamonds", price: 77000, original: 80000, discount: 4 },
      { name: "408 Diamonds", price: 105000, original: 110000, discount: 5 },
      { name: "568 Diamonds", price: 145000, original: 152000, discount: 5 },
      { name: "Starlight Member", price: 149000, original: 155000, discount: 4 },
      { name: "Weekly Diamond Pass", price: 28500, original: 30000, discount: 5 },
    ],
  },
  {
    id: "ff", name: "Free Fire", icon: "🔥", idLabel: "Player ID", idPlaceholder: "Masukkan Player ID",
    products: [
      { name: "5 Diamonds", price: 1500 },
      { name: "12 Diamonds", price: 3200, original: 3500, discount: 9 },
      { name: "50 Diamonds", price: 10500, original: 11000, discount: 5, popular: true },
      { name: "70 Diamonds", price: 14500, original: 15000, discount: 3 },
      { name: "140 Diamonds", price: 28000, original: 30000, discount: 7, popular: true },
      { name: "355 Diamonds", price: 69000, original: 72000, discount: 4 },
      { name: "720 Diamonds", price: 138000, original: 145000, discount: 5 },
      { name: "Weekly Membership", price: 28000, original: 29000, discount: 3 },
    ],
  },
  {
    id: "pubg", name: "PUBG Mobile", icon: "🎯", idLabel: "Player ID", idPlaceholder: "Masukkan Player ID",
    products: [
      { name: "60 UC", price: 15000, original: 16000, discount: 6, popular: true },
      { name: "325 UC", price: 75000, original: 79000, discount: 5 },
      { name: "660 UC", price: 149000, original: 155000, discount: 4 },
      { name: "1800 UC", price: 375000, original: 395000, discount: 5, popular: true },
      { name: "3850 UC", price: 749000, original: 790000, discount: 5 },
    ],
  },
  {
    id: "gi", name: "Genshin Impact", icon: "⚔️", idLabel: "UID", idPlaceholder: "Masukkan UID", hasServer: true,
    products: [
      { name: "60 Genesis Crystals", price: 16000, original: 17000, discount: 6 },
      { name: "300+30 Genesis Crystals", price: 79000, original: 82000, discount: 4, popular: true },
      { name: "980+110 Genesis Crystals", price: 249000, original: 260000, discount: 4 },
      { name: "1980+260 Genesis Crystals", price: 479000, original: 500000, discount: 4 },
      { name: "3280+600 Genesis Crystals", price: 799000, original: 835000, discount: 4, popular: true },
      { name: "Blessing of the Welkin Moon", price: 75000, original: 79000, discount: 5 },
    ],
  },
  {
    id: "valorant", name: "Valorant", icon: "🎯", idLabel: "Riot ID", idPlaceholder: "Player#TAG",
    products: [
      { name: "125 VP", price: 15000, original: 16000, discount: 6 },
      { name: "420 VP", price: 45000, original: 48000, discount: 6, popular: true },
      { name: "700 VP", price: 75000, original: 79000, discount: 5 },
      { name: "1375 VP", price: 145000, original: 152000, discount: 5, popular: true },
      { name: "2400 VP", price: 245000, original: 258000, discount: 5 },
      { name: "4000 VP", price: 399000, original: 420000, discount: 5 },
    ],
  },
  {
    id: "roblox", name: "Roblox", icon: "🧱", idLabel: "Username", idPlaceholder: "Masukkan Username",
    products: [
      { name: "80 Robux", price: 15000 },
      { name: "160 Robux", price: 29000, original: 30000, discount: 3 },
      { name: "240 Robux", price: 42000, original: 45000, discount: 7, popular: true },
      { name: "320 Robux", price: 55000, original: 58000, discount: 5 },
      { name: "800 Robux", price: 135000, original: 142000, discount: 5, popular: true },
      { name: "1700 Robux", price: 269000, original: 280000, discount: 4 },
    ],
  },
  {
    id: "steam", name: "Steam Wallet", icon: "🎲", idLabel: "Email Steam", idPlaceholder: "email@example.com",
    products: [
      { name: "IDR 12.000", price: 12000 },
      { name: "IDR 45.000", price: 45000 },
      { name: "IDR 60.000", price: 60000, popular: true },
      { name: "IDR 90.000", price: 90000 },
      { name: "IDR 120.000", price: 120000 },
      { name: "IDR 250.000", price: 250000, popular: true },
      { name: "IDR 400.000", price: 400000 },
      { name: "IDR 600.000", price: 600000 },
    ],
  },
];

const serverOptions = ["Asia", "Europe", "America", "Other"];

interface VGameScreenProps {
  onBack: () => void;
}

export default function VGameScreen({ onBack }: VGameScreenProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [searchGame, setSearchGame] = useState("");
  const [showResult, setShowResult] = useState(false);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(searchGame.toLowerCase())
  );

  const canCheckout = selectedGame && userId.trim() && selectedProduct;

  // Success
  if (showResult) {
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter">
          <Gamepad2 className="w-10 h-10 text-[hsl(var(--neon-green))]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Pembelian Berhasil!</h2>
          <p className="text-sm text-muted-foreground mt-1">{selectedGame?.name} - {selectedProduct}</p>
        </div>
        <div className="w-full glass-card p-5 neon-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Game</p>
            <p className="text-sm font-bold text-foreground">{selectedGame?.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{selectedGame?.idLabel}</p>
            <p className="text-sm font-medium text-foreground">{userId}</p>
          </div>
          {selectedGame?.hasServer && serverId && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Server</p>
              <p className="text-sm font-medium text-foreground">{serverId}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Item</p>
            <p className="text-sm font-medium text-foreground max-w-[60%] text-right">{selectedProduct}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total</p>
            <p className="text-lg font-bold neon-text">Rp {selectedPrice.toLocaleString("id-ID")}</p>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">Berhasil</span>
          </div>
        </div>
        <button onClick={onBack} className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
          Kembali
        </button>
      </div>
    );
  }

  // Game Selection
  if (!selectedGame) {
    return (
      <div className="pb-28 min-h-screen">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Voucher Game</h2>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="glass-card p-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari game..."
              value={searchGame}
              onChange={(e) => setSearchGame(e.target.value)}
              className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Game List */}
        <div className="px-4 space-y-3">
          <p className="text-sm font-bold text-muted-foreground">Pilih Game</p>
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="w-full glass-card p-4 flex items-center gap-4 text-left hover:border-primary/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl">
                {game.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{game.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{game.products.length} produk tersedia</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Game Detail
  return (
    <div className="pb-28 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => { setSelectedGame(null); setUserId(""); setServerId(""); setSelectedProduct(null); }} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedGame.icon}</span>
            <h2 className="text-xl font-bold text-foreground">{selectedGame.name}</h2>
          </div>
        </div>
      </div>

      {/* User ID Input */}
      <div className="px-4 mb-4 space-y-3">
        <div className="glass-card p-4 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{selectedGame.idLabel}</label>
          <input
            type="text"
            placeholder={selectedGame.idPlaceholder}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
          />
        </div>
        {selectedGame.hasServer && (
          <div className="glass-card p-4 space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Server</label>
            <select
              value={serverId}
              onChange={(e) => setServerId(e.target.value)}
              className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all appearance-none"
            >
              <option value="" disabled>Pilih Server</option>
              {serverOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="px-4 flex-1 overflow-y-auto space-y-3 pb-4">
        <p className="text-sm font-bold text-muted-foreground">Pilih Item</p>
        <div className="grid grid-cols-2 gap-3">
          {selectedGame.products.map((p) => (
            <button
              key={p.name}
              onClick={() => { setSelectedProduct(p.name); setSelectedPrice(p.price); }}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                selectedProduct === p.name
                  ? "border-primary bg-primary/10 neon-glow"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {p.popular && (
                <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  <Star className="w-2.5 h-2.5" /> Popular
                </span>
              )}
              <p className="text-sm font-bold text-foreground pr-12">{p.name}</p>
              <div className="mt-2">
                {p.original && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground line-through">Rp{p.original.toLocaleString("id-ID")}</span>
                    <span className="text-[10px] font-bold text-[hsl(var(--neon-red))]">-{p.discount}%</span>
                  </div>
                )}
                <p className="text-sm font-bold text-primary">Rp{p.price.toLocaleString("id-ID")}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 py-3 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 flex-1">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Gratis Admin</span>
          </div>
          <button
            onClick={() => setShowResult(true)}
            disabled={!canCheckout}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              canCheckout
                ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
