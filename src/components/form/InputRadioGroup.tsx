interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: string) => void;
  label: string;
}

function InputRadioGroup({
  name,
  options,
  selectedValue,
  onChange,
  label,
}: Props) {
  return (
    <fieldset className="radio-group">
      <legend>{label}</legend>
      {options.map(option => (
        <div
          className={`input-clickable input-clickable-container ${selectedValue === option.value ? 'selected' : ''}`}

          onClick={() => onChange(option.value)}
          key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => { }}
            aria-labelledby={option.value} />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default InputRadioGroup;

