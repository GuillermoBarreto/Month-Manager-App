import { TransactionDraft } from "../types/finance";
import TransactionForm from "./TransactionForm";

interface Props {
  defaultDate: string;
  maxDate: string;
  onAdd: (draft: TransactionDraft) => void;
}

export default function IncomeForm({ defaultDate, maxDate, onAdd }: Props) {
  return <TransactionForm type="income" defaultDate={defaultDate} maxDate={maxDate} onAdd={onAdd} />;
}
