import { Transaction } from "../types/finance";

const STORAGE_KEY = "month-manager-data";

export type TransactionsByMonth = Record<string, Transaction[]>;

export function monthKey(month: number, year: number) {
  return `${year}-${month}`;
}

function isTransaction(value: unknown): value is Transaction {
  if (!value || typeof value !== "object") return false;
  const transaction = value as Transaction;
  return typeof transaction.id === "string"
    && (transaction.type === "income" || transaction.type === "expense")
    && typeof transaction.amount === "number"
    && Number.isFinite(transaction.amount)
    && typeof transaction.category === "string"
    && typeof transaction.date === "string";
}

export function loadAllTransactions(): TransactionsByMonth {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return {};
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.filter(isTransaction) : [],
      ]),
    );
  } catch {
    return {};
  }
}

export function saveAllTransactions(data: TransactionsByMonth) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Unable to save Month Manager data.", error);
  }
}
