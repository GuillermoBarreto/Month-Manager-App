import { Transaction } from "../types/finance";

const STORAGE_KEY = "month-manager-data";

export type TransactionsByMonth = Record<string, Transaction[]>;

export function monthKey(month: number, year: number) {
  return `${year}-${month}`;
}

export function loadAllTransactions(): TransactionsByMonth {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

export function saveAllTransactions(data: TransactionsByMonth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
