import { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ items, onDelete }: Props) {
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const sortedItems = [...items].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="transaction-list expense-list">
      <div className="list-heading"><h2>Expenses</h2><span>{items.length}</span></div>
      {items.length === 0 ? <p className="empty-state">No expenses added yet.</p> : sortedItems.map((t) => (
        <div className="transaction-row" key={t.id}>
          <span className="transaction-dot" /><div className="transaction-details"><strong>{t.category}</strong><small>{new Date(`${t.date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}{t.note ? ` · ${t.note}` : ""}</small></div><span className="transaction-amount">-{currency.format(t.amount)}</span>
          <button className="delete-button" aria-label={`Delete ${t.category} expense`} onClick={() => onDelete(t.id)}>×</button>
        </div>
      ))}
    </section>
  );
}
