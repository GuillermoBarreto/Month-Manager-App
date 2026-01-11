import { useState } from "react";
import { Transaction } from "../types/finance";

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      id: crypto.randomUUID(),
      type: "expense",
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
    });

    setAmount("");
    setCategory("");
  }

  return (
    <form onSubmit={submit}>
      <h3>Add Expense</h3>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
