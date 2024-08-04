import React from 'react';

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
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const newSelectedValues = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter(item => item !== value);
    onChange(newSelectedValues);
  }

  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map(option => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            name={name}
            checked={selectedValues.includes(option.value)}
            onChange={handleCheckboxChange}
            aria-labelledby={option.value} />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default InputCheckboxGroup;

