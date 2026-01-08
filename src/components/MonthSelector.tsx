interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <label className="block text-sm text-gray-500 mb-1">Selected month</label>
      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-xl p-2"
      />
    </div>
  );
}
