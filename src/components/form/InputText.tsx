import React from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ariaDescription?: string;
}

function InputText({
  id,
  label,
  value,
  onChange,
  placeholder,
  ariaDescription,
}: Props) {
  const ariaDescribedBy = `${id}-describeBy`;

  return (
    <div>
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>

      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-labelledby={`${id}-label`}
        aria-describedby={ariaDescribedBy}
        className="form-input" />

      {ariaDescribedBy && (
        <p aria-hidden id={ariaDescribedBy} className="sr-only">
          {ariaDescription && 'Please enter your text.'}
        </p>
      )}
    </div>
  );
}

export default InputText;

