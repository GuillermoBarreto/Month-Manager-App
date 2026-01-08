import { useState } from "react";
import { Expense, Category } from "../types/finance";

interface Props {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Other");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      category,
      date,
    });

    setName("");
    setAmount("");
    setCategory("Other");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h2 className="text-lg font-semibold">Add Expense</h2>
      <input className="w-full border rounded-xl p-2" placeholder="Expense name" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full border rounded-xl p-2" type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select className="w-full border rounded-xl p-2" value={category} onChange={e => setCategory(e.target.value as Category)}>
        {["Rent","Utilities","Food","Transportation","Entertainment","Other"].map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input className="w-full border rounded-xl p-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button className="w-full bg-black text-white rounded-xl py-2">Add Expense</button>
    </form>
  );
}