import { Transaction } from "../types/finance";

const STORAGE_KEY = "month-manager-data";

export function loadTransactions(
  month: number,
  year: number
): Transaction[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  const data = JSON.parse(raw);
  return data[`${year}-${month}`] || [];
}

export function saveTransactions(
  month: number,
  year: number,
  transactions: Transaction[]
) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};

  data[`${year}-${month}`] = transactions;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
