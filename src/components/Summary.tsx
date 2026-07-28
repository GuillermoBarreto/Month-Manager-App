import { Transaction } from "../types/finance";

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const topExpense = transactions
    .filter(t => t.type === "expense")
    .reduce<Record<string, number>>((totals, t) => ({ ...totals, [t.category]: (totals[t.category] ?? 0) + t.amount }), {});
  const topCategory = Object.entries(topExpense).sort(([, a], [, b]) => b - a)[0];
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <section className="summary-grid" aria-label="Monthly summary">
      <div className="summary-card income-card"><span>Income</span><strong>{currency.format(income)}</strong><small>{transactions.filter(t => t.type === "income").length} entry{transactions.filter(t => t.type === "income").length === 1 ? "" : "ies"}</small></div>
      <div className="summary-card expense-card"><span>Expenses</span><strong>{currency.format(expenses)}</strong><small>{topCategory ? `${topCategory[0]} is your largest category` : "Add an expense to start tracking"}</small></div>
      <div className={`summary-card balance-card ${balance < 0 ? "negative" : ""}`}><span>Balance</span><strong>{currency.format(balance)}</strong><small>{balance < 0 ? "Spending exceeds income" : balance === 0 ? "Ready for your first entry" : "Available after expenses"}</small></div>
    </section>
  );
}
