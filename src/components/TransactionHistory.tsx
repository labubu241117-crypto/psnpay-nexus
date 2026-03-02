import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, CheckCircle, Trash2 } from "lucide-react";
import type { Transaction } from "@/lib/transaction-history";
import { deleteTransaction, clearTransactionsByService } from "@/lib/transaction-history";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TransactionHistoryProps {
  transactions: Transaction[];
  onUpdate?: () => void;
}

export default function TransactionHistory({ transactions, onUpdate }: TransactionHistoryProps) {
  const [expanded, setExpanded] = useState(true);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (transactions.length === 0) return null;

  const serviceId = transactions[0]?.serviceId;

  const handleDeleteOne = (id: string) => {
    deleteTransaction(id);
    if (selectedTx?.id === id) setSelectedTx(null);
    onUpdate?.();
  };

  const handleClearService = () => {
    clearTransactionsByService(serviceId);
    setSelectedTx(null);
    onUpdate?.();
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between w-full px-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Riwayat Transaksi</p>
            <span className="text-xs text-muted-foreground">({transactions.length})</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {expanded && (
            <button
              onClick={() => setConfirmClearAll(true)}
              className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Hapus Semua
            </button>
          )}
        </div>

        {expanded && (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {transactions.slice(0, 10).map((tx) => (
              <div
                key={tx.id}
                className="w-full glass-card p-3 text-left transition-all hover:bg-muted/50"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
                >
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(tx.id);
                      }}
                      className="mt-2 w-full text-xs text-destructive hover:text-destructive/80 flex items-center justify-center gap-1 py-1.5 rounded-md border border-destructive/20 hover:bg-destructive/5 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Hapus Transaksi Ini
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm delete single */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <AlertDialogContent className="max-w-[90vw] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Transaksi?</AlertDialogTitle>
            <AlertDialogDescription>
              Transaksi ini akan dihapus permanen dari riwayat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (confirmDeleteId) handleDeleteOne(confirmDeleteId);
                setConfirmDeleteId(null);
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm clear all for service */}
      <AlertDialog open={confirmClearAll} onOpenChange={setConfirmClearAll}>
        <AlertDialogContent className="max-w-[90vw] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Semua Riwayat?</AlertDialogTitle>
            <AlertDialogDescription>
              Semua riwayat transaksi untuk layanan ini akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleClearService}
            >
              Hapus Semua
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
