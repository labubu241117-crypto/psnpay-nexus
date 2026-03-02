import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Phone, Navigation, Star, Search } from "lucide-react";

const mitraList = [
  { id: 1, name: "Agen PSNPAY - Pak Budi", address: "Jl. Sungai Saddang Lama No. 12, Makassar", distance: "0.3 km", rating: 4.8, hours: "08:00 - 21:00", phone: "0812-3456-7890", open: true },
  { id: 2, name: "Konter Jaya Makmur", address: "Jl. AP Pettarani Blok B No. 5, Makassar", distance: "0.7 km", rating: 4.6, hours: "09:00 - 22:00", phone: "0813-4567-8901", open: true },
  { id: 3, name: "Toko Berkah Sejahtera", address: "Mall GTC Makassar, Lt. 1 No. 15", distance: "1.2 km", rating: 4.9, hours: "10:00 - 21:00", phone: "0821-5678-9012", open: true },
  { id: 4, name: "Agen Pulsa Ibu Ani", address: "Jl. Boulevard Ruko No. 8, Makassar", distance: "1.5 km", rating: 4.5, hours: "07:00 - 20:00", phone: "0856-6789-0123", open: false },
  { id: 5, name: "Mitra Digital Corner", address: "Jl. Urip Sumoharjo No. 22, Makassar", distance: "2.1 km", rating: 4.7, hours: "08:30 - 21:30", phone: "0878-7890-1234", open: true },
  { id: 6, name: "Konter Cahaya Cell", address: "Jl. Hertasning Baru No. 3, Makassar", distance: "2.8 km", rating: 4.4, hours: "09:00 - 20:00", phone: "0811-8901-2345", open: true },
];

interface MitraDetailProps {
  onBack: () => void;
  nominal: string;
  currencySymbol: string;
}

export default function MitraDetail({ onBack, nominal, currencySymbol }: MitraDetailProps) {
  const [search, setSearch] = useState("");
  const [selectedMitra, setSelectedMitra] = useState<number | null>(null);

  const formattedNominal = nominal
    ? `${currencySymbol} ${parseInt(nominal).toLocaleString("id-ID")}`
    : `${currencySymbol} 0`;

  const filtered = mitraList.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.address.toLowerCase().includes(search.toLowerCase())
  );

  const selected = mitraList.find((m) => m.id === selectedMitra);

  return (
    <div className="px-4 pb-28 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">Bayar Tunai</h2>
          <p className="text-xs text-muted-foreground">Pilih mitra/agen terdekat</p>
        </div>
      </div>

      {/* Nominal Summary */}
      <div className="glass-card p-4 neon-border">
        <p className="text-xs text-muted-foreground">Total Top Up</p>
        <p className="text-2xl font-bold neon-text mt-1">{formattedNominal}</p>
      </div>

      {/* Search */}
      <div className="glass-card p-3 flex items-center gap-3">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari mitra atau lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      {/* Mitra List */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-1">
          {filtered.length} Mitra Ditemukan
        </p>

        {filtered.map((mitra) => {
          const isSelected = selectedMitra === mitra.id;
          return (
            <button
              key={mitra.id}
              onClick={() => setSelectedMitra(mitra.id)}
              className={`w-full glass-card p-4 text-left transition-all duration-200 ${
                isSelected ? "neon-border" : "hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isSelected ? "gradient-neon-bg" : "bg-secondary"
                }`}>
                  <MapPin className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-foreground truncate">{mitra.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                      mitra.open
                        ? "bg-[hsl(var(--neon-green)/0.15)] text-[hsl(var(--neon-green))]"
                        : "bg-[hsl(var(--neon-red)/0.15)] text-[hsl(var(--neon-red))]"
                    }`}>
                      {mitra.open ? "Buka" : "Tutup"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{mitra.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Navigation className="w-3 h-3 text-primary" /> {mitra.distance}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-[hsl(var(--neon-orange))]" /> {mitra.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {mitra.hours}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Mitra Detail */}
      {selected && (
        <div className="space-y-4 animate-counter">
          <div className="glass-card p-5 neon-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl gradient-neon-bg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.address}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Jarak</p>
                <p className="text-sm font-bold text-foreground">{selected.distance}</p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Rating</p>
                <p className="text-sm font-bold text-foreground">⭐ {selected.rating}</p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Jam Operasional</p>
                <p className="text-sm font-bold text-foreground">{selected.hours}</p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Telepon</p>
                <p className="text-sm font-bold text-foreground">{selected.phone}</p>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Jumlah yang harus dibayar</p>
              <p className="text-xl font-bold neon-text">{formattedNominal}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Cara Pembayaran:</p>
              <ol className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">1</span>
                  <span>Kunjungi lokasi mitra di atas</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">2</span>
                  <span>Sebutkan nomor member PSNPAY Anda</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">3</span>
                  <span>Bayar tunai sejumlah {formattedNominal}</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">4</span>
                  <span>Saldo akan masuk otomatis dalam 1-5 menit</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={`tel:${selected.phone}`}
              className="flex-1 py-3 rounded-2xl bg-secondary text-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-all"
            >
              <Phone className="w-4 h-4" /> Hubungi
            </a>
            <button className="flex-1 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <Navigation className="w-4 h-4" /> Navigasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
