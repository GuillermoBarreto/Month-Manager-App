import { Transaction } from "../types/finance";

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <p>Balance: ${income - expenses}</p>
    </div>
  );
}
