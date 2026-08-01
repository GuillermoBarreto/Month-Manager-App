export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export interface TransactionDraft {
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export interface BudgetPeriod {
  month: number;
  year: number;
}
