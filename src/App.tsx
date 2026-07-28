import { useState } from "react";
import { Transaction, TransactionDraft } from "./types/finance";
import { loadAllTransactions, monthKey, saveAllTransactions } from "./utils/storage";

import MonthSelector from "./components/MonthSelector";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import IncomeList from "./components/IncomeList";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

export default function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactionsByMonth, setTransactionsByMonth] = useState(loadAllTransactions);
  const key = monthKey(month, year);
  const transactions = transactionsByMonth[key] ?? [];
  const defaultDate = new Date(year, month, 1).toISOString().slice(0, 10);
  const maxDate = new Date(year, month + 1, 0).toISOString().slice(0, 10);

  function updateTransactions(updater: (current: Transaction[]) => Transaction[]) {
    setTransactionsByMonth(previous => {
      const next = { ...previous, [key]: updater(previous[key] ?? []) };
      saveAllTransactions(next);
      return next;
    });
  }

  function addTransaction(type: Transaction["type"], draft: TransactionDraft) {
    const transaction: Transaction = { id: crypto.randomUUID(), type, ...draft };
    updateTransactions(current => [...current, transaction]);
  }

  function deleteTransaction(id: string) {
    updateTransactions(current => current.filter(t => t.id !== id));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>
          <h1>Month Manager</h1>
          <p className="subtitle">Plan with confidence, one month at a time.</p>
        </div>
        <MonthSelector month={month} year={year} onChange={(m, y) => { setMonth(m); setYear(y); }} />
      </header>

      <Summary transactions={transactions} />

      <section className="content-grid" aria-label="Monthly transactions">
        <div className="forms-panel">
          <IncomeForm key={`income-${key}`} defaultDate={defaultDate} maxDate={maxDate} onAdd={(draft) => addTransaction("income", draft)} />
          <ExpenseForm key={`expense-${key}`} defaultDate={defaultDate} maxDate={maxDate} onAdd={(draft) => addTransaction("expense", draft)} />
        </div>
        <div className="lists-panel">
          <IncomeList items={transactions.filter(t => t.type === "income")} onDelete={deleteTransaction} />
          <ExpenseList items={transactions.filter(t => t.type === "expense")} onDelete={deleteTransaction} />
        </div>
      </section>
    </main>
  );
}
