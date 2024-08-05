interface CheckboxOption {
  value: string;
  label: string;
  imageUrl?: string;
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
    <fieldset>
      <legend>{label}</legend>

      <div className="checkbox-group">
        {options.map(option => (
          <div
            id={option.value}
            className={`input-clickable-container ${selectedValues.includes(option.value) && 'checked'}`}
            onClick={() => handleCheckboxChange(option.value)}
            style={{
              backgroundImage: option.imageUrl && `url(${option.imageUrl})`,
              backgroundSize: option.imageUrl && "cover",
              backgroundPosition: option.imageUrl && "center",
            }}
            key={option.value}
          >
            <label
              className="image-subtitle"
              htmlFor={option.value}>
              {option.label}
            </label>
            <input
              type="checkbox"
              value={option.value}
              name={name}
              checked={selectedValues.includes(option.value)}
              onChange={() => { }}
              aria-labelledby={option.value} />
          </div>
        ))}

      </div>
    </fieldset>
  );
}

export default InputCheckboxGroup;

