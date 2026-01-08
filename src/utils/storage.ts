import { Expense, Income } from "../types/finance";

const EXPENSE_STORAGE_KEY = "month-manager-expenses";
const INCOME_STORAGE_KEY = "month-manager-incomes";

// Expenses
export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(EXPENSE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
}

// Incomes
export function loadIncomes(): Income[] {
  try {
    const raw = localStorage.getItem(INCOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveIncomes(incomes: Income[]) {
  localStorage.setItem(INCOME_STORAGE_KEY, JSON.stringify(incomes));
}
