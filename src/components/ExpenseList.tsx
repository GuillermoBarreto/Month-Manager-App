import { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ items, onDelete }: Props) {
  return (
    <div>
      <h3>Expenses</h3>
      {items.map((t) => (
        <div key={t.id}>
          {t.category}: ${t.amount}
          <button onClick={() => onDelete(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}
