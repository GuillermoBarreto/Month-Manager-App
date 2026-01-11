interface Props {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export default function MonthSelector({ month, year, onChange }: Props) {
  return (
    <div>
      <select
        value={month}
        onChange={(e) => onChange(Number(e.target.value), year)}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={year}
        onChange={(e) => onChange(month, Number(e.target.value))}
      />
    </div>
  );
}
