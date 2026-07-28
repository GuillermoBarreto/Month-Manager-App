interface Props {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export default function MonthSelector({ month, year, onChange }: Props) {
  return (
    <div className="month-selector" aria-label="Select budget month">
      <label>
        <span className="sr-only">Month</span>
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
      </label>

      <label>
        <span className="sr-only">Year</span>
      <input
        type="number"
        min="2000"
        max="2100"
        value={year}
        onChange={(e) => onChange(month, Number(e.target.value))}
      />
      </label>
    </div>
  );
}
