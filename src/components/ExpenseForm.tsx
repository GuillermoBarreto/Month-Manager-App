import { TransactionDraft } from "../types/finance";
import TransactionForm from "./TransactionForm";

interface Props {
  defaultDate: string;
  maxDate: string;
  onAdd: (draft: TransactionDraft) => void;
}

export default function ExpenseForm({ defaultDate, maxDate, onAdd }: Props) {
  return <TransactionForm type="expense" defaultDate={defaultDate} maxDate={maxDate} onAdd={onAdd} />;
}
