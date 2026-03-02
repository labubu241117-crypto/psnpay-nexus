import { useState } from "react";
import { ArrowLeft, RefreshCw, PiggyBank, Plus, Check, X, Flag, DollarSign, Calendar, ChevronRight } from "lucide-react";

const simpananPrograms = [
  {
    id: "wajib",
    name: "Simpanan Wajib",
    target: 1200000,
    setoran: 100000,
    periode: "12 bulan",
    description: "Simpanan Wajib adalah simpanan rutin (misal bulanan) yang jumlahnya ditentukan koperasi, wajib dibayar selama menjadi anggota, dan berfungsi memperkuat modal serta partisipasi anggota.",
  },
];

type ActiveSimpanan = {
  id: string;
  name: string;
  target: number;
  setoran: number;
  deposited: number;
  status: "aktif" | "selesai";
};

interface SimpananScreenProps {
  onBack: () => void;
}

export default function SimpananScreen({ onBack }: SimpananScreenProps) {
  const [filter, setFilter] = useState<"semua" | "aktif" | "selesai">("semua");
  const [showPilih, setShowPilih] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [mySimpanan, setMySimpanan] = useState<ActiveSimpanan[]>([]);

  const totalSimpanan = mySimpanan.reduce((s, i) => s + i.deposited, 0);
  const totalTarget = mySimpanan.reduce((s, i) => s + i.target, 0);
  const progress = totalTarget > 0 ? (totalSimpanan / totalTarget) * 100 : 0;

  const filtered = mySimpanan.filter((s) => {
    if (filter === "aktif") return s.status === "aktif";
    if (filter === "selesai") return s.status === "selesai";
    return true;
  });

  const handleIkuti = (programId: string) => {
    const program = simpananPrograms.find((p) => p.id === programId);
    if (!program) return;
    setMySimpanan((prev) => [
      ...prev,
      { id: program.id + "-" + Date.now(), name: program.name, target: program.target, setoran: program.setoran, deposited: 0, status: "aktif" },
    ]);
    setShowDetail(null);
    setShowPilih(false);
  };

  const selectedProgram = simpananPrograms.find((p) => p.id === showDetail);

  return (
    <div className="px-4 pb-28 pt-6 space-y-5 relative min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground">Produk Simpanan</h2>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Total Simpanan Card */}
      <div className="rounded-2xl gradient-neon-bg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-foreground/80">Total Simpanan</p>
          <span className="text-xs px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground font-medium">
            {mySimpanan.filter((s) => s.status === "aktif").length} Program
          </span>
        </div>
        <p className="text-3xl font-bold text-primary-foreground">Rp{totalSimpanan.toLocaleString("id-ID")}</p>
        <div>
          <div className="flex items-center justify-between text-xs text-primary-foreground/70 mb-1">
            <span>Telah Disetor</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-primary-foreground/20">
            <div className="h-2 rounded-full bg-primary-foreground/60 transition-all duration-500" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-primary-foreground font-bold">Rp{totalSimpanan.toLocaleString("id-ID")}</span>
            <span className="text-primary-foreground/70">Rp{totalTarget.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["semua", "aktif", "selesai"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              filter === f
                ? "gradient-neon-bg text-primary-foreground neon-glow"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {filter === f && <Check className="w-3.5 h-3.5" />}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Daftar Simpanan */}
      <div>
        <h3 className="font-bold text-foreground mb-3">Daftar Simpanan</h3>

        {filtered.length === 0 ? (
          <div className="glass-card p-8 flex flex-col items-center space-y-4">
            <PiggyBank className="w-16 h-16 text-muted-foreground/40" />
            <div className="text-center">
              <p className="font-bold text-foreground">Belum ada simpanan</p>
              <p className="text-sm text-muted-foreground mt-1">Mulai ikuti program simpanan untuk menabung</p>
            </div>
            <button
              onClick={() => setShowPilih(true)}
              className="px-6 py-3 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Tambah Simpanan
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((s) => {
              const prog = (s.deposited / s.target) * 100;
              return (
                <div key={s.id} className="glass-card p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                      <PiggyBank className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">Setoran Rp{s.setoran.toLocaleString("id-ID")}/bulan</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      s.status === "aktif"
                        ? "bg-[hsl(var(--neon-green)/0.15)] status-success"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {s.status === "aktif" ? "Aktif" : "Selesai"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary">
                    <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${Math.min(prog, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Rp{s.deposited.toLocaleString("id-ID")}</span>
                    <span>Rp{s.target.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowPilih(true)}
        className="fixed bottom-24 right-4 max-w-md w-14 h-14 rounded-full gradient-neon-bg flex items-center justify-center neon-glow-strong hover:scale-110 active:scale-95 transition-all duration-200 z-40"
      >
        <Plus className="w-7 h-7 text-primary-foreground" />
      </button>

      {/* Bottom Sheet - Pilih Jenis Simpanan */}
      {showPilih && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => { setShowPilih(false); setShowDetail(null); }}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-card rounded-t-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Sheet Header */}
            <div className="gradient-neon-bg p-5">
              <div className="w-10 h-1 rounded-full bg-primary-foreground/30 mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <PiggyBank className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-primary-foreground text-lg">Pilih Jenis Simpanan</p>
                    <p className="text-xs text-primary-foreground/70">{simpananPrograms.length} jenis simpanan tersedia</p>
                  </div>
                </div>
                <button onClick={() => { setShowPilih(false); setShowDetail(null); }} className="text-primary-foreground/70 hover:text-primary-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Programs List or Detail */}
            {!showDetail ? (
              <div className="p-4 space-y-3">
                {simpananPrograms.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setShowDetail(program.id)}
                    className="w-full glass-card p-4 flex items-center gap-4 hover:neon-border transition-all"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <PiggyBank className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-foreground">{program.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Flag className="w-3 h-3" /> Rp{program.target.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Rp{program.setoran.toLocaleString("id-ID")}/bulan
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] text-[hsl(var(--neon-green))] font-medium mt-1 inline-block">
                        {program.periode}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}

                <button
                  onClick={() => { setShowPilih(false); setShowDetail(null); }}
                  className="w-full py-3.5 rounded-2xl border border-primary text-primary font-bold text-sm mt-2 hover:bg-primary/5 transition-all"
                >
                  TUTUP
                </button>
              </div>
            ) : (
              /* Detail View */
              <div className="p-5 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PiggyBank className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-foreground">{selectedProgram?.name}</p>
                    <p className="text-sm font-bold text-primary">Rp{selectedProgram?.target.toLocaleString("id-ID")}</p>
                  </div>
                  <button onClick={() => setShowDetail(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Info Cards */}
                <div className="glass-card p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target Simpanan</p>
                      <p className="font-bold text-foreground">Rp{selectedProgram?.target.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--neon-green)/0.1)] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[hsl(var(--neon-green))]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Setoran Bulanan</p>
                      <p className="font-bold text-foreground">Rp{selectedProgram?.setoran.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--neon-orange)/0.1)] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[hsl(var(--neon-orange))]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jangka Waktu</p>
                      <p className="font-bold text-foreground">{selectedProgram?.periode}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center">
                  <p className="font-bold text-foreground mb-2">Deskripsi Simpanan</p>
                  <div className="glass-card p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProgram?.description}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDetail(null)}
                    className="flex-1 py-3.5 rounded-2xl border border-border text-muted-foreground font-bold text-sm hover:bg-secondary transition-all"
                  >
                    BATAL
                  </button>
                  <button
                    onClick={() => handleIkuti(showDetail)}
                    className="flex-1 py-3.5 rounded-2xl gradient-neon-bg text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 neon-glow-strong hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Check className="w-5 h-5" /> IKUTI
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
