import { Transaction } from "../types/finance";

const STORAGE_KEY = "month-manager-data";

export type TransactionsByMonth = Record<string, Transaction[]>;

export function monthKey(month: number, year: number) {
  if (!Number.isInteger(month) || month < 0 || month > 11) {
    throw new RangeError(
      `Invalid month ${String(month)}: expected an integer between 0 and 11.`,
    );
  }
  return `${year}-${month}`;
}

function isTransaction(value: unknown): value is Transaction {
  if (!value || typeof value !== "object") return false;
  const transaction = value as Transaction;
  return typeof transaction.id === "string"
    && (transaction.type === "income" || transaction.type === "expense")
    && typeof transaction.amount === "number"
    && Number.isFinite(transaction.amount)
    && transaction.amount > 0
    && typeof transaction.category === "string"
    && typeof transaction.date === "string"
    && (transaction.note === undefined || typeof transaction.note === "string");
}

export function loadAllTransactions(): TransactionsByMonth {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage.getItem can throw in sandboxed contexts (e.g. blocked
    // third-party cookies); treat as empty storage.
    return {};
  }
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
