import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    <fieldset>
      <legend>{label}</legend>
      {options.map(option => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            aria-labelledby={option.value} />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default InputRadioGroup;

