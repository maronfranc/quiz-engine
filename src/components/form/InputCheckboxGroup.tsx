interface CheckboxOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (newSelectedValues: string[]) => void;
  label: string;
}

function InputCheckboxGroup({
  name,
  options,
  selectedValues,
  onChange,
  label,
}: Props) {
  function handleCheckboxChange(value: string) {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  }

  return (
    <fieldset className="checkbox-group">
      <legend>{label}</legend>
      {options.map(option => (
        <div
          id={option.value}
          className={`input-clickable input-clickable-container ${selectedValues.includes(option.value) ? 'checked' : ''}`}
          onClick={() => handleCheckboxChange(option.value)}
          key={option.value}>
          <label htmlFor={option.value}>{option.label}</label>
          <input
            type="checkbox"
            value={option.value}
            name={name}
            checked={selectedValues.includes(option.value)}
            onChange={() => {}}
            aria-labelledby={option.value} />
        </div>
      ))}
    </fieldset>
  );
}

export default InputCheckboxGroup;

