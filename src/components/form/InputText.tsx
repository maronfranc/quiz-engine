import React from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  placeholder?: string;
  ariaDescription?: string;
  limit?: number;
}

function InputText({
  id,
  label,
  value,
  onChange: parentOnChange,
  placeholder,
  ariaDescription,
  disabled,
  limit,
}: Props) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    parentOnChange(e.target.value);
  }

  const ariaDescribedBy = `${id}-describeBy`;

  return (
    <fieldset
    >
      <legend id={`${id}-label`}>
        {label}
      </legend>

      <div className="input-text-container">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-labelledby={`${id}-label`}
          disabled={disabled}
          maxLength={limit}
          aria-describedby={ariaDescribedBy} />
      </div>

      {ariaDescribedBy && (
        <p aria-hidden id={ariaDescribedBy} className="sr-only">
          {ariaDescription && 'Please enter your text.'}
        </p>
      )}
    </fieldset>
  );
}

export default InputText;

