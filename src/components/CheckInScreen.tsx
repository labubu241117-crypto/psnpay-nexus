import { useState, useEffect, useRef } from "react";
import { ArrowLeft, RefreshCw, X, Power, Users, UserPlus, UsersRound, Wallet, DollarSign, Rocket, Play, Square } from "lucide-react";

interface CheckInScreenProps {
  onBack: () => void;
}

export default function CheckInScreen({ onBack }: CheckInScreenProps) {
  const [mining, setMining] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [referrals] = useState({ r1: 0, r2: 0, r3: 0 });
  const [polBalance] = useState(0);
  const [totalReward] = useState(0);

  useEffect(() => {
    if (mining) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [mining]);

  const formatTime = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const handleToggle = () => {
    if (mining) {
      setMining(false);
      setSeconds(0);
    } else {
      setMining(true);
    }
  };

  return (
    <div className="px-4 pb-28 pt-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground hover:neon-glow transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground tracking-wider uppercase">Carbon Mining</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary hover:neon-glow transition-all">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carbon Mining Label */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-primary tracking-widest uppercase">Carbon Mining</p>
          <p className="text-lg font-bold text-muted-foreground">-</p>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
          <Rocket className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Timer */}
      <div className="flex justify-center">
        <button
          onClick={handleToggle}
          className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 ${
            mining
              ? "bg-primary/20 neon-glow-strong animate-pulse-neon"
              : "bg-secondary"
          }`}
        >
          <Power className={`w-10 h-10 ${mining ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`text-2xl font-mono font-bold tracking-wider ${mining ? "neon-text" : "text-muted-foreground"}`}>
            {formatTime(seconds)}
          </span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="glass-card p-5 neon-border space-y-4">
        {/* Referrals Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "REFERRAL 1", value: referrals.r1, color: "text-primary" },
            { icon: UserPlus, label: "REFERRAL 2", value: referrals.r2, color: "text-[hsl(var(--neon-green))]" },
            { icon: UsersRound, label: "REFERRAL 3", value: referrals.r3, color: "text-[hsl(var(--neon-purple))]" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground tracking-wide">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Wallet & POL Row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Wallet, label: "WALLET", value: "-", color: "text-[hsl(var(--neon-orange))]" },
            { icon: DollarSign, label: "POL BALANCE", value: polBalance, color: "text-[hsl(var(--neon-orange))]" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground tracking-wide">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total Reward */}
      <div className="glass-card p-4 neon-border flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
          <Rocket className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground tracking-wide">TOTAL REWARD</p>
          <p className="text-xs text-muted-foreground">PEPECO</p>
        </div>
        <p className="text-2xl font-bold text-foreground">{totalReward}</p>
      </div>

      {/* Start Button */}
      <button
        onClick={handleToggle}
        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 tracking-widest uppercase transition-all duration-300 ${
          mining
            ? "bg-[hsl(var(--neon-red))] text-foreground hover:bg-[hsl(var(--neon-red)/0.8)]"
            : "gradient-neon-bg text-primary-foreground neon-glow-strong hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {mining ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        {mining ? "STOP CARBON MINING" : "START CARBON MINING"}
      </button>
    </div>
  );
}
