import { Expense } from "../types/finance";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) return <p className="text-gray-500">No expenses yet.</p>;

  return (
    <div className="space-y-2">
      {expenses.map(e => (
        <div key={e.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
          <div>
            <p className="font-medium">{e.name}</p>
            <p className="text-sm text-gray-500">{e.category} • {e.date}</p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold">${e.amount.toFixed(2)}</p>
            <button className="ml-4 text-red-600 font-bold" onClick={() => onDelete(e.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}
