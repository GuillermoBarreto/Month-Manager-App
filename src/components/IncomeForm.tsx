import { useState } from "react";
import { Transaction } from "../types/finance";

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function IncomeForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !category || Number(amount) <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      type: "income",
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    });

    setAmount("");
    setCategory("");
  }

  return (
    <form className="transaction-form income-form" onSubmit={submit}>
      <div className="form-heading"><span className="form-icon">↗</span><h2>Add income</h2></div>
      <input
        placeholder="Amount"
        type="number"
        min="0.01"
        step="0.01"
        inputMode="decimal"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add income</button>
    </form>
  );
}
