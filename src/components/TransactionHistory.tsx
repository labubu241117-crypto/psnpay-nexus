import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import type { Transaction } from "@/lib/transaction-history";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [expanded, setExpanded] = useState(true);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  if (transactions.length === 0) return null;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-1"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Riwayat Transaksi</p>
          <span className="text-xs text-muted-foreground">({transactions.length})</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {transactions.slice(0, 10).map((tx) => (
            <button
              key={tx.id}
              onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
              className="w-full glass-card p-3 text-left transition-all hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--neon-green))] shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {tx.serviceTitle}
                  </span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  {tx.nominal && (
                    <p className="text-sm font-bold text-foreground">
                      Rp {tx.nominal.toLocaleString("id-ID")}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {selectedTx?.id === tx.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {Object.entries(tx.values).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-xs text-muted-foreground capitalize">{key}</span>
                      <span className="text-xs text-foreground truncate max-w-[60%] text-right">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-[hsl(var(--neon-green)/0.15)] text-[hsl(var(--neon-green))]">
                      Berhasil
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
