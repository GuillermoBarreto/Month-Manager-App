import { Income } from "../types/finance";

interface Props {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export default function IncomeList({ incomes, onDelete }: Props) {
  if (incomes.length === 0) return <p className="text-gray-500">No income yet.</p>;

  return (
    <div className="space-y-2">
      {incomes.map(i => (
        <div key={i.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
          <div>
            <p className="font-medium">{i.source}</p>
            <p className="text-sm text-gray-500">{i.date}</p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold">${i.amount.toFixed(2)}</p>
            <button className="ml-4 text-red-600 font-bold" onClick={() => onDelete(i.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}