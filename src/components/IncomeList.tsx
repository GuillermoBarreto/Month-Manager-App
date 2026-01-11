import { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onDelete: (id: string) => void;
}

export default function IncomeList({ items, onDelete }: Props) {
  return (
    <div>
      <h3>Income</h3>
      {items.map((t) => (
        <div key={t.id}>
          {t.category}: ${t.amount}
          <button onClick={() => onDelete(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}
