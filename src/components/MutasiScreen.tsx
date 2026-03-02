import { useState, useMemo } from "react";
import { format, isWithinInterval, startOfDay, endOfDay, subDays, subMonths } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  ArrowLeft, CalendarIcon, Filter, ShoppingBag, Wallet, FileText,
  ArrowLeftRight, Package, Download, Search, X, ChevronDown
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type MutasiCategory = "semua" | "produk" | "deposit" | "tagihan" | "transfer";
type MutasiStatus = "semua" | "success" | "pending" | "failed";

const categories: { id: MutasiCategory; label: string; icon: any }[] = [
  { id: "semua", label: "Semua", icon: Package },
  { id: "produk", label: "Produk", icon: ShoppingBag },
  { id: "deposit", label: "Deposit", icon: Wallet },
  { id: "tagihan", label: "Tagihan", icon: FileText },
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
];

const statusOptions: { id: MutasiStatus; label: string }[] = [
  { id: "semua", label: "Semua Status" },
  { id: "success", label: "Berhasil" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Gagal" },
];

const quickFilters = [
  { label: "Hari ini", days: 0 },
  { label: "7 Hari", days: 7 },
  { label: "30 Hari", days: 30 },
  { label: "3 Bulan", months: 3 },
];

// Mock full mutasi data with real dates
const generateMutasiData = () => {
  const now = new Date();
  return [
    { category: "produk" as const, type: "Pulsa", desc: "Telkomsel 08123xxxx", amount: -25000, date: subDays(now, 0), status: "success" as const },
    { category: "deposit" as const, type: "Deposit", desc: "Bank BCA", amount: 500000, date: subDays(now, 1), status: "success" as const },
    { category: "produk" as const, type: "Token PLN", desc: "ID 32451xxxxxx", amount: -100000, date: subDays(now, 1), status: "success" as const },
    { category: "transfer" as const, type: "Transfer", desc: "BCA - 1234xxx", amount: -250000, date: subDays(now, 2), status: "success" as const },
    { category: "produk" as const, type: "Paket Data", desc: "XL 6GB/30 Hari", amount: -55000, date: subDays(now, 3), status: "success" as const },
    { category: "produk" as const, type: "Voucher Game", desc: "Mobile Legends 86 DM", amount: -22000, date: subDays(now, 4), status: "pending" as const },
    { category: "produk" as const, type: "E-Wallet", desc: "GoPay Top Up", amount: -100000, date: subDays(now, 5), status: "success" as const },
    { category: "deposit" as const, type: "Deposit", desc: "Bank Mandiri", amount: 1000000, date: subDays(now, 6), status: "success" as const },
    { category: "tagihan" as const, type: "PLN", desc: "Token Listrik", amount: -100000, date: subDays(now, 8), status: "success" as const },
    { category: "produk" as const, type: "Pulsa", desc: "Indosat 08567xxxx", amount: -50000, date: subDays(now, 9), status: "failed" as const },
    { category: "deposit" as const, type: "Deposit", desc: "QRIS", amount: 200000, date: subDays(now, 10), status: "success" as const },
    { category: "transfer" as const, type: "Transfer", desc: "Bank BRI", amount: -500000, date: subDays(now, 12), status: "failed" as const },
    { category: "tagihan" as const, type: "BPJS", desc: "Kesehatan 3 bulan", amount: -150000, date: subDays(now, 15), status: "pending" as const },
    { category: "deposit" as const, type: "Deposit", desc: "Bank BNI", amount: 750000, date: subDays(now, 18), status: "pending" as const },
    { category: "tagihan" as const, type: "PDAM", desc: "Makassar", amount: -85000, date: subDays(now, 22), status: "success" as const },
    { category: "transfer" as const, type: "Transfer", desc: "Mandiri - 8901xxx", amount: -1500000, date: subDays(now, 25), status: "success" as const },
    { category: "tagihan" as const, type: "Internet", desc: "IndiHome", amount: -350000, date: subDays(now, 32), status: "success" as const },
    { category: "produk" as const, type: "Pulsa", desc: "Telkomsel 08123xxxx", amount: -50000, date: subDays(now, 40), status: "success" as const },
    { category: "deposit" as const, type: "Deposit", desc: "Bank BCA", amount: 2000000, date: subDays(now, 50), status: "success" as const },
    { category: "transfer" as const, type: "Transfer", desc: "BNI - 5678xxx", amount: -300000, date: subDays(now, 60), status: "success" as const },
  ];
};

const allMutasi = generateMutasiData();

const statusLabel = { success: "Berhasil", pending: "Menunggu", failed: "Gagal" };
const statusDotColor = {
  success: "bg-[hsl(var(--neon-green))]",
  pending: "bg-[hsl(var(--neon-orange))]",
  failed: "bg-[hsl(var(--neon-red))]",
};

const formatRp = (n: number) => {
  const abs = Math.abs(n);
  return (n >= 0 ? "+" : "-") + "Rp " + abs.toLocaleString("id-ID");
};

interface MutasiScreenProps {
  onBack: () => void;
}

export default function MutasiScreen({ onBack }: MutasiScreenProps) {
  const [category, setCategory] = useState<MutasiCategory>("semua");
  const [status, setStatus] = useState<MutasiStatus>("semua");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [activeQuick, setActiveQuick] = useState<number | null>(null);

  const handleQuickFilter = (idx: number) => {
    const now = new Date();
    setActiveQuick(idx);
    const f = quickFilters[idx];
    if (f.days === 0) {
      setDateFrom(startOfDay(now));
      setDateTo(now);
    } else if (f.days) {
      setDateFrom(subDays(now, f.days));
      setDateTo(now);
    } else if (f.months) {
      setDateFrom(subMonths(now, f.months));
      setDateTo(now);
    }
  };

  const clearFilters = () => {
    setCategory("semua");
    setStatus("semua");
    setSearch("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setActiveQuick(null);
  };

  const filtered = useMemo(() => {
    return allMutasi.filter(item => {
      if (category !== "semua" && item.category !== category) return false;
      if (status !== "semua" && item.status !== status) return false;
      if (search && !item.type.toLowerCase().includes(search.toLowerCase()) && !item.desc.toLowerCase().includes(search.toLowerCase())) return false;
      if (dateFrom && item.date < startOfDay(dateFrom)) return false;
      if (dateTo && item.date > endOfDay(dateTo)) return false;
      return true;
    });
  }, [category, status, search, dateFrom, dateTo]);

  // Group by date
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(item => {
      const key = format(item.date, "dd MMMM yyyy", { locale: localeId });
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [filtered]);

  const totalMasuk = filtered.filter(i => i.amount > 0).reduce((s, i) => s + i.amount, 0);
  const totalKeluar = filtered.filter(i => i.amount < 0).reduce((s, i) => s + Math.abs(i.amount), 0);
  const hasActiveFilter = category !== "semua" || status !== "semua" || search || dateFrom || dateTo;

  return (
    <div className="px-4 pb-28 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Mutasi</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              showFilters || hasActiveFilter ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari transaksi..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="glass-card p-4 space-y-4 neon-border animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Quick date filters */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Periode Cepat</p>
            <div className="flex gap-2 flex-wrap">
              {quickFilters.map((f, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickFilter(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeQuick === i
                      ? "gradient-neon-bg text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Dari Tanggal</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm",
                    dateFrom ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {dateFrom ? format(dateFrom, "dd/MM/yy") : "Pilih"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(d) => { setDateFrom(d); setActiveQuick(null); }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Sampai Tanggal</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary border border-border text-sm",
                    dateTo ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {dateTo ? format(dateTo, "dd/MM/yy") : "Pilih"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(d) => { setDateTo(d); setActiveQuick(null); }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Status filter */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    status === s.id
                      ? "gradient-neon-bg text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilter && (
            <button onClick={clearFilters} className="text-xs text-destructive font-medium flex items-center gap-1">
              <X className="w-3 h-3" /> Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
              category === cat.id
                ? "gradient-neon-bg text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-3">
          <p className="text-xs text-muted-foreground">Total Masuk</p>
          <p className="text-sm font-bold status-success mt-0.5">+Rp {totalMasuk.toLocaleString("id-ID")}</p>
        </div>
        <div className="glass-card p-3">
          <p className="text-xs text-muted-foreground">Total Keluar</p>
          <p className="text-sm font-bold text-foreground mt-0.5">-Rp {totalKeluar.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{filtered.length} transaksi ditemukan</p>
        {dateFrom && dateTo && (
          <p className="text-xs text-muted-foreground">
            {format(dateFrom, "dd/MM")} - {format(dateTo, "dd/MM/yy")}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">Tidak ada transaksi</p>
          <p className="text-sm text-muted-foreground mt-1">Coba ubah filter atau periode</p>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([dateLabel, items]) => (
            <div key={dateLabel}>
              <p className="text-xs font-semibold text-muted-foreground mb-2">{dateLabel}</p>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotColor[item.status]}`} />
                      <div>
                        <p className="font-medium text-sm text-foreground">{item.type}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${item.amount > 0 ? "status-success" : "text-foreground"}`}>
                        {formatRp(item.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">{format(item.date, "HH:mm")}</p>
                      <span className={`text-[10px] font-medium status-${item.status}`}>
                        {statusLabel[item.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
