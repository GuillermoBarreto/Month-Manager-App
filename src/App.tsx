import { useEffect, useState } from "react";
import { Transaction } from "./types/finance";
import { loadTransactions, saveTransactions } from "./utils/storage";

import MonthSelector from "./components/MonthSelector";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import IncomeList from "./components/IncomeList";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

export default function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(loadTransactions(month, year));
  }, [month, year]);

  useEffect(() => {
    saveTransactions(month, year, transactions);
  }, [transactions, month, year]);

  function addTransaction(t: Transaction) {
    setTransactions(prev => [...prev, t]);
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <h1>Month Manager</h1>

      <MonthSelector
        month={month}
        year={year}
        onChange={(m, y) => {
          setMonth(m);
          setYear(y);
        }}
      />

      <Summary transactions={transactions} />

      <IncomeForm onAdd={addTransaction} />
      <ExpenseForm onAdd={addTransaction} />

      <IncomeList
        items={transactions.filter(t => t.type === "income")}
        onDelete={deleteTransaction}
      />
      <ExpenseList
        items={transactions.filter(t => t.type === "expense")}
        onDelete={deleteTransaction}
      />
    </div>
  );
}
