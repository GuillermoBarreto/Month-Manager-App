export type Category =
  | "Rent"
  | "Utilities"
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Other";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  date: string; // YYYY-MM-DD
}
