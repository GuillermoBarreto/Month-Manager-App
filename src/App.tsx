import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import ExpenseList from "./components/ExpenseList";
import IncomeList from "./components/IncomeList";
import MonthSelector from "./components/MonthSelector";
import Summary from "./components/Summary";
import { loadExpenses, saveExpenses, loadIncomes, saveIncomes } from "./utils/storage";
import { Expense, Income } from "./types/finance";

export default function App() {
  const todayMonth = new Date().toISOString().slice(0, 7);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);

  useEffect(() => setExpenses(loadExpenses()), []);
  useEffect(() => setIncomes(loadIncomes()), []);
  useEffect(() => saveExpenses(expenses), [expenses]);
  useEffect(() => saveIncomes(incomes), [incomes]);

  const filteredExpenses = useMemo(() => expenses.filter(e => e.date.startsWith(selectedMonth)), [expenses, selectedMonth]);
  const filteredIncomes = useMemo(() => incomes.filter(i => i.date.startsWith(selectedMonth)), [incomes, selectedMonth]);

  function addExpense(expense: Expense) { setExpenses(prev => [expense, ...prev]); }
  function addIncome(income: Income) { setIncomes(prev => [income, ...prev]); }
  function deleteExpense(id: string) { setExpenses(prev => prev.filter(e => e.id !== id)); }
  function deleteIncome(id: string) { setIncomes(prev => prev.filter(i => i.id !== id)); }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Month Manager</h1>

        <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
        <Summary expenses={filteredExpenses} incomes={filteredIncomes} />

        <ExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />

        <IncomeForm onAdd={addIncome} />
        <IncomeList incomes={filteredIncomes} onDelete={deleteIncome} />
      </div>
    </div>
  );
}
