import { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ items, onDelete }: Props) {
  return (
    <section className="transaction-list expense-list">
      <div className="list-heading"><h2>Expenses</h2><span>{items.length}</span></div>
      {items.length === 0 ? <p className="empty-state">No expenses added yet.</p> : items.map((t) => (
        <div className="transaction-row" key={t.id}>
          <span className="transaction-dot" /><strong>{t.category}</strong><span className="transaction-amount">-${t.amount.toFixed(2)}</span>
          <button className="delete-button" aria-label={`Delete ${t.category} expense`} onClick={() => onDelete(t.id)}>×</button>
        </div>
      ))}
    </section>
  );
}
