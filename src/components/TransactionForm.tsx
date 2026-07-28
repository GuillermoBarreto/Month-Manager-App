import { FormEvent, useState } from "react";
import { TransactionDraft, TransactionType } from "../types/finance";

interface Props {
  type: TransactionType;
  defaultDate: string;
  maxDate: string;
  onAdd: (draft: TransactionDraft) => void;
}

export default function TransactionForm({ type, defaultDate, maxDate, onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [note, setNote] = useState("");
  const isIncome = type === "income";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    const trimmedCategory = category.trim();
    if (!trimmedCategory || !Number.isFinite(value) || value <= 0 || !date) return;

    onAdd({ amount: value, category: trimmedCategory, date, note: note.trim() || undefined });
    setAmount("");
    setCategory("");
    setNote("");
  }

  return (
    <form className={`transaction-form ${type}-form`} onSubmit={submit}>
      <div className="form-heading">
        <span className="form-icon" aria-hidden="true">{isIncome ? "↗" : "↙"}</span>
        <div><h2>Add {type}</h2><p>{isIncome ? "Money coming in" : "Money going out"}</p></div>
      </div>
      <div className="field-grid">
        <label>Amount<input aria-label={`${type} amount`} placeholder="0.00" type="number" min="0.01" step="0.01" inputMode="decimal" required value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
        <label>Date<input aria-label={`${type} date`} type="date" min={defaultDate} max={maxDate} required value={date} onChange={(event) => setDate(event.target.value)} /></label>
      </div>
      <label>Category<input placeholder={isIncome ? "Salary, freelance…" : "Rent, groceries…"} required value={category} onChange={(event) => setCategory(event.target.value)} /></label>
      <label>Note <span className="optional">optional</span><input placeholder="Add a short description" value={note} onChange={(event) => setNote(event.target.value)} /></label>
      <button type="submit">Add {type}</button>
    </form>
  );
}
