export type Transaction = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  values: Record<string, string>;
  nominal?: number;
  status: "success" | "pending" | "failed";
  timestamp: string;
};

const STORAGE_KEY = "psnpay_transactions";

export function getTransactions(): Transaction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getTransactionsByService(serviceId: string): Transaction[] {
  return getTransactions().filter((t) => t.serviceId === serviceId);
}

export function addTransaction(tx: Omit<Transaction, "id" | "timestamp" | "status">): Transaction {
  const newTx: Transaction = {
    ...tx,
    id: crypto.randomUUID(),
    status: "success",
    timestamp: new Date().toISOString(),
  };
  const all = getTransactions();
  all.unshift(newTx);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 200)));
  return newTx;
}

export function deleteTransaction(id: string): void {
  const all = getTransactions().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearTransactionsByService(serviceId: string): void {
  const all = getTransactions().filter((t) => t.serviceId !== serviceId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearAllTransactions(): void {
  localStorage.removeItem(STORAGE_KEY);
}
