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

  const { income, incomeCount, expenses, expenseCount, topCategory } = useMemo(() => {
    let income = 0;
    let incomeCount = 0;
    let expenses = 0;
    let expenseCount = 0;
    const totalsByCategory: Record<string, number> = {};
    for (const t of transactions) {
      if (t.type === "income") {
        income += t.amount;
        incomeCount += 1;
      } else {
        expenses += t.amount;
        expenseCount += 1;
        totalsByCategory[t.category] = (totalsByCategory[t.category] ?? 0) + t.amount;
      }
    }
    const topCategory = Object.entries(totalsByCategory).sort(([, a], [, b]) => b - a)[0];
    return { income, incomeCount, expenses, expenseCount, topCategory };
  }, [transactions]);

  const balance = income - expenses;
  const hasEntries = transactions.length > 0;

  return (
    <section className="summary-grid" aria-label="Monthly summary">
      <div className="summary-card income-card"><span>Income</span><strong>{currency.format(income)}</strong><small>{incomeCount} {incomeCount === 1 ? "entry" : "entries"}</small></div>
      <div className="summary-card expense-card"><span>Expenses</span><strong>{currency.format(expenses)}</strong><small>{expenseCount} {expenseCount === 1 ? "entry" : "entries"}{topCategory ? ` · ${topCategory[0]} is your largest category` : ""}</small></div>
      <div className={`summary-card balance-card ${balance < 0 ? "negative" : ""}`}><span>Balance</span><strong>{currency.format(balance)}</strong><small>{balance < 0 ? "Spending exceeds income" : !hasEntries ? "Ready for your first entry" : balance === 0 ? "Breaking even" : "Available after expenses"}</small></div>
    </section>
  );
}
