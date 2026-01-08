import { Expense, Income, Category } from "../types/finance";
import { useMemo } from "react";

interface Props {
  expenses: Expense[];
  incomes: Income[];
}

export default function Summary({ expenses, incomes }: Props) {
  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const totalIncome = useMemo(() => incomes.reduce((sum, i) => sum + i.amount, 0), [incomes]);
  const balance = totalIncome - totalExpenses;

  const categoryTotals = useMemo(() => {
    const totals: Record<Category, number> = { Rent:0, Utilities:0, Food:0, Transportation:0, Entertainment:0, Other:0 };
    expenses.forEach(e => { totals[e.category] += e.amount; });
    return totals;
  }, [expenses]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-2">
      <h2 className="text-lg font-semibold">Monthly Summary</h2>
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p className={`font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>Balance: ${balance.toFixed(2)}</p>
      <div className="mt-2 space-y-1">
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <p key={cat} className="text-sm text-gray-600">{cat}: ${amt.toFixed(2)}</p>
        ))}
      </div>
    </div>
  );
}
