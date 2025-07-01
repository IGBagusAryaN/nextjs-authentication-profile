type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
};

export default function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}: Props) {
  return (
    <div className="flex items-center">
      <label className="text-xs text-gray-400 w-[50%]">{label}:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-[397px] text-end mt-1 px-3 py-2 rounded-md bg-input-primary border border-gray-700 text-sm"
      />
    </div>
  );
}
