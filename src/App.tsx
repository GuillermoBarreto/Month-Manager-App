import { useEffect, useMemo, useState } from "react";
function ExpenseList({ expenses, onDelete }: { expenses: Expense[]; onDelete: (id: string) => void }) {
if (expenses.length === 0) return <p className="text-gray-500">No expenses yet.</p>;
return <div className="space-y-2">{expenses.map((e) => <div key={e.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow"><div><p className="font-medium">{e.name}</p><p className="text-sm text-gray-500">{e.category} • {e.date}</p></div><p className="font-semibold">${e.amount.toFixed(2)}</p><button className="ml-4 text-red-600 font-bold" onClick={() => onDelete(e.id)}>🗑️</button></div>)}</div>;
}


function IncomeList({ incomes, onDelete }: { incomes: Income[]; onDelete: (id: string) => void }) {
if (incomes.length === 0) return <p className="text-gray-500">No income yet.</p>;
return <div className="space-y-2">{incomes.map((i) => <div key={i.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow"><div><p className="font-medium">{i.source}</p><p className="text-sm text-gray-500">{i.date}</p></div><p className="font-semibold">${i.amount.toFixed(2)}</p><button className="ml-4 text-red-600 font-bold" onClick={() => onDelete(i.id)}>🗑️</button></div>)}</div>;
}


function Summary({ expenses, incomes }: { expenses: Expense[]; incomes: Income[] }) {
const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
const totalIncome = useMemo(() => incomes.reduce((sum, i) => sum + i.amount, 0), [incomes]);
const balance = totalIncome - totalExpenses;


const categoryTotals = useMemo(() => {
const totals: Record<Category, number> = { Rent:0, Utilities:0, Food:0, Transportation:0, Entertainment:0, Other:0 };
expenses.forEach(e => { totals[e.category] += e.amount; });
return totals;
}, [expenses]);


return (
<div className="bg-white p-4 rounded-2xl shadow space-y-2">
<h2 className="text-lg font-semibold">Monthly Summary</h2>
<p>Total Income: ${totalIncome.toFixed(2)}</p>
<p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
<p className={`font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>Balance: ${balance.toFixed(2)}</p>
<div className="mt-2 space-y-1">
{Object.entries(categoryTotals).map(([cat, amt]) => <p key={cat} className="text-sm text-gray-600">{cat}: ${amt.toFixed(2)}</p>)}
</div>
</div>
);
}


// =====================
// App
// =====================


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