import { useMemo } from "react";
import { Transaction } from "../types/finance";

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const currency = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    [],
  );

  const { income, incomeCount, expenses, topCategory } = useMemo(() => {
    let income = 0;
    let incomeCount = 0;
    let expenses = 0;
    const totalsByCategory: Record<string, number> = {};
    for (const t of transactions) {
      if (t.type === "income") {
        income += t.amount;
        incomeCount += 1;
      } else {
        expenses += t.amount;
        totalsByCategory[t.category] = (totalsByCategory[t.category] ?? 0) + t.amount;
      }
    }
    const topCategory = Object.entries(totalsByCategory).sort(([, a], [, b]) => b - a)[0];
    return { income, incomeCount, expenses, topCategory };
  }, [transactions]);

  const balance = income - expenses;

  return (
    <section className="summary-grid" aria-label="Monthly summary">
      <div className="summary-card income-card"><span>Income</span><strong>{currency.format(income)}</strong><small>{incomeCount} entry{incomeCount === 1 ? "" : "ies"}</small></div>
      <div className="summary-card expense-card"><span>Expenses</span><strong>{currency.format(expenses)}</strong><small>{topCategory ? `${topCategory[0]} is your largest category` : "Add an expense to start tracking"}</small></div>
      <div className={`summary-card balance-card ${balance < 0 ? "negative" : ""}`}><span>Balance</span><strong>{currency.format(balance)}</strong><small>{balance < 0 ? "Spending exceeds income" : balance === 0 ? "Ready for your first entry" : "Available after expenses"}</small></div>
    </section>
  );
}
