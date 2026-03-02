import { useState, useEffect } from "react";
import { ArrowLeft, Send, Phone, Zap, Wifi, Gamepad2, Wallet, Radio, Truck, Film, Droplets, Recycle, DollarSign, PiggyBank, MapPin, CreditCard, Globe, FileText, Satellite, Smartphone, GraduationCap, HandHeart, Heart, Star, StarOff } from "lucide-react";
import { addTransaction, getTransactionsByService, type Transaction } from "@/lib/transaction-history";
import { addFavorite, getFavoritesByService, removeFavorite, type Favorite } from "@/lib/favorites";
import TransactionHistory from "./TransactionHistory";
import FavoritePicker from "./FavoritePicker";

type ServiceConfig = {
  title: string;
  icon: React.ElementType;
  fields: FieldConfig[];
  nominals?: number[];
};

type FieldConfig = {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "number" | "select";
  options?: string[];
  inputMode?: "numeric" | "text" | "tel";
};

const serviceConfigs: Record<string, ServiceConfig> = {
  simpanan: {
    title: "Simpanan",
    icon: PiggyBank,
    fields: [
      { key: "jenis", label: "Jenis Simpanan", placeholder: "Pilih jenis simpanan", type: "select", options: ["Simpanan Pokok", "Simpanan Wajib", "Simpanan Sukarela", "Deposito"] },
      { key: "nominal", label: "Nominal", placeholder: "Masukkan nominal", type: "number", inputMode: "numeric" },
      { key: "keterangan", label: "Keterangan", placeholder: "Tambahkan catatan", type: "text" },
    ],
  },
  checkin: {
    title: "Check-in",
    icon: MapPin,
    fields: [
      { key: "lokasi", label: "Lokasi", placeholder: "Pilih lokasi", type: "select", options: ["Kantor Pusat", "Cabang Makassar", "Cabang Jakarta", "Cabang Surabaya", "Cabang Bandung"] },
      { key: "keterangan", label: "Keterangan", placeholder: "Tujuan kunjungan", type: "text" },
    ],
  },
  pulsa: {
    title: "Pulsa",
    icon: Phone,
    fields: [
      { key: "provider", label: "Operator", placeholder: "Pilih operator", type: "select", options: ["Telkomsel", "Indosat", "XL Axiata", "Tri", "Smartfren"] },
      { key: "nomor", label: "Nomor HP", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
    ],
    nominals: [5000, 10000, 15000, 20000, 25000, 50000, 100000, 200000],
  },
  "token-pln": {
    title: "Token PLN",
    icon: Zap,
    fields: [
      { key: "idpel", label: "No. Meter / ID Pelanggan", placeholder: "Masukkan nomor meter", type: "text", inputMode: "numeric" },
    ],
    nominals: [20000, 50000, 100000, 200000, 500000, 1000000],
  },
  "paket-data": {
    title: "Paket Data",
    icon: Wifi,
    fields: [
      { key: "provider", label: "Operator", placeholder: "Pilih operator", type: "select", options: ["Telkomsel", "Indosat", "XL Axiata", "Tri", "Smartfren"] },
      { key: "nomor", label: "Nomor HP", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
      { key: "paket", label: "Pilih Paket", placeholder: "Pilih paket data", type: "select", options: ["1 GB / 30 Hari - Rp 15.000", "3 GB / 30 Hari - Rp 35.000", "6 GB / 30 Hari - Rp 55.000", "12 GB / 30 Hari - Rp 85.000", "25 GB / 30 Hari - Rp 120.000", "Unlimited / 30 Hari - Rp 150.000"] },
    ],
  },
  vgame: {
    title: "Voucher Game",
    icon: Gamepad2,
    fields: [
      { key: "game", label: "Pilih Game", placeholder: "Pilih game", type: "select", options: ["Mobile Legends", "Free Fire", "PUBG Mobile", "Genshin Impact", "Valorant", "Roblox", "Steam Wallet"] },
      { key: "userid", label: "User ID / Server", placeholder: "Masukkan User ID", type: "text" },
    ],
    nominals: [10000, 25000, 50000, 100000, 250000, 500000],
  },
  ewallet: {
    title: "E-Wallet",
    icon: Wallet,
    fields: [
      { key: "provider", label: "Pilih E-Wallet", placeholder: "Pilih provider", type: "select", options: ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"] },
      { key: "nomor", label: "Nomor HP / Akun", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
    ],
    nominals: [20000, 50000, 100000, 200000, 500000, 1000000],
  },
  "saldo-ojol": {
    title: "Saldo Ojol",
    icon: Truck,
    fields: [
      { key: "provider", label: "Pilih Layanan", placeholder: "Pilih layanan", type: "select", options: ["GrabDriver", "GoDriver", "Maxim Driver", "InDriver"] },
      { key: "nomor", label: "Nomor HP Driver", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
    ],
    nominals: [20000, 50000, 100000, 200000, 500000],
  },
  hiburan: {
    title: "Hiburan",
    icon: Film,
    fields: [
      { key: "layanan", label: "Pilih Layanan", placeholder: "Pilih layanan", type: "select", options: ["Netflix", "Spotify", "Disney+", "YouTube Premium", "Vidio", "WeTV", "Viu"] },
      { key: "akun", label: "Email / Akun", placeholder: "email@example.com", type: "text" },
      { key: "paket", label: "Pilih Paket", placeholder: "Pilih paket", type: "select", options: ["1 Bulan - Basic", "1 Bulan - Standard", "1 Bulan - Premium", "3 Bulan - Basic", "3 Bulan - Premium", "12 Bulan - Premium"] },
    ],
  },
  "tagihan-pln": {
    title: "Tagihan PLN",
    icon: Zap,
    fields: [
      { key: "idpel", label: "No. ID Pelanggan", placeholder: "Masukkan ID pelanggan PLN", type: "text", inputMode: "numeric" },
    ],
  },
  "tagihan-pdam": {
    title: "Tagihan PDAM",
    icon: Droplets,
    fields: [
      { key: "wilayah", label: "Wilayah", placeholder: "Pilih wilayah", type: "select", options: ["PDAM Makassar", "PDAM Jakarta", "PDAM Surabaya", "PDAM Bandung", "PDAM Semarang", "PDAM Medan"] },
      { key: "idpel", label: "No. Pelanggan", placeholder: "Masukkan nomor pelanggan", type: "text", inputMode: "numeric" },
    ],
  },
  "tagihan-bpjs": {
    title: "Tagihan BPJS",
    icon: Recycle,
    fields: [
      { key: "jenis", label: "Jenis BPJS", placeholder: "Pilih jenis", type: "select", options: ["BPJS Kesehatan", "BPJS Ketenagakerjaan"] },
      { key: "noba", label: "No. Virtual Account / KTP", placeholder: "Masukkan nomor", type: "text", inputMode: "numeric" },
      { key: "periode", label: "Periode", placeholder: "Pilih periode", type: "select", options: ["1 Bulan", "3 Bulan", "6 Bulan", "12 Bulan"] },
    ],
  },
  finance: {
    title: "Finance / Cicilan",
    icon: DollarSign,
    fields: [
      { key: "lembaga", label: "Lembaga Keuangan", placeholder: "Pilih lembaga", type: "select", options: ["Adira Finance", "FIF Group", "BAF", "WOM Finance", "Kredivo", "Akulaku", "Home Credit"] },
      { key: "nocontract", label: "No. Kontrak / Pinjaman", placeholder: "Masukkan nomor kontrak", type: "text" },
    ],
  },
  roaming: {
    title: "Roaming",
    icon: Globe,
    fields: [
      { key: "provider", label: "Operator", placeholder: "Pilih operator", type: "select", options: ["Telkomsel", "Indosat", "XL Axiata", "Tri", "Smartfren"] },
      { key: "nomor", label: "Nomor HP", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
      { key: "negara", label: "Negara Tujuan", placeholder: "Pilih negara", type: "select", options: ["Malaysia", "Singapura", "Thailand", "Jepang", "Korea Selatan", "Australia", "Amerika Serikat", "Inggris", "Arab Saudi", "Turki"] },
      { key: "paket", label: "Paket Roaming", placeholder: "Pilih paket", type: "select", options: ["Data 1GB / 7 Hari - Rp 99.000", "Data 3GB / 15 Hari - Rp 199.000", "Data 5GB / 30 Hari - Rp 299.000", "Nelpon + Data 3GB / 15 Hari - Rp 350.000", "Unlimited / 7 Hari - Rp 450.000"] },
    ],
  },
  "tagihan-saya": {
    title: "Tagihan Saya",
    icon: FileText,
    fields: [
      { key: "jenis", label: "Jenis Tagihan", placeholder: "Pilih jenis tagihan", type: "select", options: ["Listrik PLN", "PDAM", "BPJS Kesehatan", "BPJS Ketenagakerjaan", "Telkom/IndiHome", "TV Kabel", "Kartu Kredit", "Angsuran"] },
      { key: "idpel", label: "No. Pelanggan / ID", placeholder: "Masukkan nomor pelanggan", type: "text", inputMode: "numeric" },
    ],
  },
  "tv-internet": {
    title: "TV Kabel & Internet",
    icon: Satellite,
    fields: [
      { key: "provider", label: "Provider", placeholder: "Pilih provider", type: "select", options: ["IndiHome", "First Media", "MNC Vision", "Transvision", "MyRepublic", "Biznet", "CBN", "Oxygen"] },
      { key: "idpel", label: "No. Pelanggan", placeholder: "Masukkan nomor pelanggan", type: "text", inputMode: "numeric" },
    ],
  },
  telkom: {
    title: "Telkom",
    icon: Phone,
    fields: [
      { key: "jenis", label: "Jenis Layanan", placeholder: "Pilih layanan", type: "select", options: ["Telepon Rumah", "Speedy / IndiHome", "Telkom Flexi"] },
      { key: "idpel", label: "No. Telepon / ID Pelanggan", placeholder: "Masukkan nomor", type: "text", inputMode: "numeric" },
    ],
  },
  pascabayar: {
    title: "Pasca Bayar",
    icon: Smartphone,
    fields: [
      { key: "provider", label: "Operator", placeholder: "Pilih operator", type: "select", options: ["Telkomsel Halo", "Indosat Matrix", "XL Prioritas", "Tri Pascabayar", "Smartfren Pascabayar"] },
      { key: "nomor", label: "Nomor HP Pascabayar", placeholder: "08xxxxxxxxxx", type: "text", inputMode: "tel" },
    ],
  },
  "kartu-kredit": {
    title: "Kartu Kredit",
    icon: CreditCard,
    fields: [
      { key: "bank", label: "Bank Penerbit", placeholder: "Pilih bank", type: "select", options: ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Bank Mega", "Permata", "Citibank", "HSBC", "Standard Chartered"] },
      { key: "nokartu", label: "Nomor Kartu Kredit", placeholder: "xxxx xxxx xxxx xxxx", type: "text", inputMode: "numeric" },
    ],
  },
  pendidikan: {
    title: "Biaya Pendidikan",
    icon: GraduationCap,
    fields: [
      { key: "institusi", label: "Institusi Pendidikan", placeholder: "Pilih institusi", type: "select", options: ["Universitas Indonesia", "ITB", "UGM", "Unhas", "Unair", "Undip", "UNM", "Universitas Brawijaya", "ITS", "Lainnya"] },
      { key: "nim", label: "NIM / No. Pendaftaran", placeholder: "Masukkan NIM", type: "text" },
      { key: "jenis", label: "Jenis Pembayaran", placeholder: "Pilih jenis", type: "select", options: ["SPP", "UKT", "Biaya Wisuda", "Biaya Pendaftaran", "Biaya Praktikum", "Lainnya"] },
    ],
  },
  donasi: {
    title: "Donasi",
    icon: HandHeart,
    fields: [
      { key: "lembaga", label: "Lembaga Donasi", placeholder: "Pilih lembaga", type: "select", options: ["ACT", "Dompet Dhuafa", "Rumah Zakat", "BAZNAS", "Kitabisa.com", "Aksi Cepat Tanggap", "PMI", "UNICEF Indonesia"] },
      { key: "program", label: "Program Donasi", placeholder: "Pilih program", type: "select", options: ["Bencana Alam", "Pendidikan Anak", "Kesehatan", "Pangan", "Pembangunan Masjid", "Umum"] },
      { key: "nominal", label: "Nominal Donasi", placeholder: "Masukkan nominal", type: "number", inputMode: "numeric" },
      { key: "nama", label: "Nama Donatur", placeholder: "Nama Anda (atau Hamba Allah)", type: "text" },
    ],
  },
  zakat: {
    title: "Zakat",
    icon: Heart,
    fields: [
      { key: "jenis", label: "Jenis Zakat", placeholder: "Pilih jenis zakat", type: "select", options: ["Zakat Mal", "Zakat Fitrah", "Zakat Penghasilan", "Zakat Emas & Perak", "Zakat Perdagangan"] },
      { key: "lembaga", label: "Lembaga Penyalur", placeholder: "Pilih lembaga", type: "select", options: ["BAZNAS", "Dompet Dhuafa", "Rumah Zakat", "LAZ Al Azhar", "Yayasan Dana Sosial Al Falah", "NU Care - LAZISNU", "LAZISMU"] },
      { key: "nominal", label: "Nominal Zakat", placeholder: "Masukkan nominal", type: "number", inputMode: "numeric" },
      { key: "nama", label: "Nama Muzakki", placeholder: "Nama lengkap Anda", type: "text" },
    ],
  },
};

interface ServiceScreenProps {
  serviceId: string;
  onBack: () => void;
}

export default function ServiceScreen({ serviceId, onBack }: ServiceScreenProps) {
  const config = serviceConfigs[serviceId];
  const [values, setValues] = useState<Record<string, string>>({});
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [tagihan, setTagihan] = useState<{ found: boolean; amount?: number } | null>(null);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    setHistory(getTransactionsByService(serviceId));
    setFavorites(getFavoritesByService(serviceId));
  }, [serviceId, showResult]);

  const generateFavLabel = () => {
    const firstText = config.fields.find(f => f.type === "text" && values[f.key]);
    const firstSelect = config.fields.find(f => f.type === "select" && values[f.key]);
    return [firstSelect && values[firstSelect.key], firstText && values[firstText.key]].filter(Boolean).join(" - ") || config.title;
  };

  const handleSaveFavorite = () => {
    addFavorite({ serviceId, label: generateFavLabel(), values: { ...values } });
    setFavorites(getFavoritesByService(serviceId));
  };

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavoritesByService(serviceId));
  };

  const handleLoadFavorite = (favValues: Record<string, string>) => {
    setValues(favValues);
  };

  if (!config) {
    return (
      <div className="px-4 pb-28 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Layanan Tidak Ditemukan</h2>
        </div>
      </div>
    );
  }

  const Icon = config.icon;
  const isPascabayar = ["tagihan-pln", "tagihan-pdam", "tagihan-bpjs", "finance", "tagihan-saya", "tv-internet", "telkom", "pascabayar", "kartu-kredit", "pendidikan"].includes(serviceId);

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const allFieldsFilled = config.fields.every((f) => values[f.key]?.trim());
  const hasNominal = config.nominals ? (selectedNominal !== null) : true;
  const isValid = allFieldsFilled && hasNominal;

  const handleCekTagihan = () => {
    // Simulate bill check
    const amount = Math.floor(Math.random() * 500000) + 50000;
    setTagihan({ found: true, amount });
  };

  const handleSubmit = () => {
    const total = isPascabayar ? tagihan?.amount : selectedNominal;
    addTransaction({
      serviceId,
      serviceTitle: config.title,
      values: { ...values },
      nominal: total || undefined,
    });
    setShowResult(true);
  };

  // Success Screen
  if (showResult) {
    const total = isPascabayar ? tagihan?.amount : selectedNominal;
    return (
      <div className="px-4 pb-28 pt-6 flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--neon-green)/0.15)] flex items-center justify-center mt-8 animate-counter">
          <Icon className="w-10 h-10 text-[hsl(var(--neon-green))]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">
            {isPascabayar ? "Pembayaran Berhasil!" : "Transaksi Berhasil!"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{config.title} telah diproses</p>
        </div>

        <div className="w-full glass-card p-5 neon-border space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Layanan</p>
            <p className="text-sm font-bold text-foreground">{config.title}</p>
          </div>
          {config.fields.map((f) => (
            <div key={f.key} className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="text-sm font-medium text-foreground max-w-[60%] text-right truncate">{values[f.key]}</p>
            </div>
          ))}
          {total && (
            <>
              <div className="border-t border-border" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Total</p>
                <p className="text-lg font-bold neon-text">Rp {total.toLocaleString("id-ID")}</p>
              </div>
            </>
          )}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] status-success">Berhasil</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Waktu</p>
            <p className="text-xs text-foreground">{new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-4 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">{config.title}</h2>
        </div>
      </div>

      {/* Saldo */}
      <div className="glass-card p-4 neon-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Saldo PSNPAY</p>
          <p className="text-lg font-bold text-foreground">Rp 1.250.000</p>
        </div>
      </div>

      {/* Favorites */}
      <FavoritePicker favorites={favorites} onSelect={handleLoadFavorite} onRemove={handleRemoveFavorite} />

      {/* Fields */}
      <div className="space-y-4">
        {config.fields.map((field) => (
          <div key={field.key} className="glass-card p-4 space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
            {field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all appearance-none"
              >
                <option value="" disabled>{field.placeholder}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                inputMode={field.inputMode || "text"}
                placeholder={field.placeholder}
                value={values[field.key] || ""}
                onChange={(e) => handleChange(field.key, field.inputMode === "numeric" || field.inputMode === "tel" ? e.target.value.replace(/[^0-9+]/g, "") : e.target.value)}
                className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
              />
            )}
          </div>
        ))}
      </div>

      {/* Save Favorite Button */}
      {allFieldsFilled && (
        <button
          onClick={handleSaveFavorite}
          className="w-full py-3 rounded-xl bg-secondary text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-muted transition-all"
        >
          <Star className="w-4 h-4 text-primary" />
          Simpan sebagai Favorit
        </button>
      )}

      {/* Nominal Selection (Prabayar) */}
      {config.nominals && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground px-1">Pilih Nominal</p>
          <div className="grid grid-cols-3 gap-2">
            {config.nominals.map((nom) => (
              <button
                key={nom}
                onClick={() => setSelectedNominal(nom)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedNominal === nom
                    ? "gradient-neon-bg text-primary-foreground neon-glow"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                Rp {nom.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cek Tagihan (Pascabayar) */}
      {isPascabayar && allFieldsFilled && !tagihan && (
        <button
          onClick={handleCekTagihan}
          className="w-full py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-all"
        >
          Cek Tagihan
        </button>
      )}

      {/* Tagihan Result */}
      {tagihan?.found && (
        <div className="glass-card p-5 neon-border space-y-3 animate-counter">
          <p className="text-sm font-bold text-foreground">Detail Tagihan</p>
          {config.fields.map((f) => (
            <div key={f.key} className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="text-sm text-foreground">{values[f.key]}</p>
            </div>
          ))}
          <div className="border-t border-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total Tagihan</p>
            <p className="text-xl font-bold neon-text">Rp {tagihan.amount?.toLocaleString("id-ID")}</p>
          </div>
        </div>
      )}

      {/* Summary for Prabayar */}
      {!isPascabayar && selectedNominal && allFieldsFilled && (
        <div className="glass-card p-4 space-y-2 animate-counter">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Harga</p>
            <p className="text-sm font-bold text-foreground">Rp {selectedNominal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Biaya Admin</p>
            <p className="text-sm font-bold text-[hsl(var(--neon-green))]">Gratis</p>
          </div>
          <div className="border-t border-border my-1" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Total Bayar</p>
            <p className="text-lg font-bold neon-text">Rp {selectedNominal.toLocaleString("id-ID")}</p>
          </div>
        </div>
      )}

      {/* Transaction History */}
      {history.length > 0 && <TransactionHistory transactions={history} />}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isPascabayar ? !tagihan?.found : !isValid}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          (isPascabayar ? tagihan?.found : isValid)
            ? "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
            : "bg-secondary text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5" />
        {isPascabayar ? "Bayar Tagihan" : "Bayar Sekarang"}
      </button>
    </div>
  );
}

export { serviceConfigs };
