// components/GenderSelect.tsx
import Select from "react-select";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function GenderSelect({ value, onChange }: Props) {
  return (
    <Select
      options={genderOptions}
      value={genderOptions.find((opt) => opt.value === value)}
      onChange={(opt) => onChange(opt?.value || "")}
      placeholder="select gender"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "#1A252A",
          borderColor: state.isFocused ? "#3B82F6" : "#374151",
          padding: "1px 4px",
          color: "white",
          borderRadius: "6px",
          minHeight: "42px",
          cursor: "pointer",
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
          fontSize: "14px",
          lineHeight: "16px",
          marginRight: "-7px",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9CA3AF",
          fontSize: "14px",
          lineHeight: "16px",
          marginRight: "-7px",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "white",
          "&:hover": { color: "#3B82F6" },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#1A252A",
          color: "white",
          borderRadius: "6px",
          marginTop: 4,
          zIndex: 10,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#2563EB" : "#1A252A",
          color: "white",
          fontSize: "14px",
          lineHeight: "16px",
          padding: 10,
          cursor: "pointer",
        }),
      }}
    />
  );
}
