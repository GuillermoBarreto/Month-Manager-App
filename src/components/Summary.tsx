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
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <section className="summary-grid" aria-label="Monthly summary">
      <div className="summary-card income-card"><span>Income</span><strong>{currency.format(income)}</strong></div>
      <div className="summary-card expense-card"><span>Expenses</span><strong>{currency.format(expenses)}</strong></div>
      <div className={`summary-card balance-card ${income - expenses < 0 ? "negative" : ""}`}><span>Balance</span><strong>{currency.format(income - expenses)}</strong></div>
    </section>
  );
}
