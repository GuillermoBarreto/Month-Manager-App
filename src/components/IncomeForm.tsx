import { useState } from "react";
import { Income } from "../types/finance";

interface Props {
  onAdd: (income: Income) => void;
}

export default function IncomeForm({ onAdd }: Props) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!source || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      source,
      amount: Number(amount),
      date,
    });

    setSource("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h2 className="text-lg font-semibold">Add Income</h2>
      <input className="w-full border rounded-xl p-2" placeholder="Income source" value={source} onChange={e => setSource(e.target.value)} />
      <input className="w-full border rounded-xl p-2" type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input className="w-full border rounded-xl p-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button className="w-full bg-black text-white rounded-xl py-2">Add Income</button>
    </form>
  );
}
