interface RadioOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface Props {
  name: string;
  options: RadioOption[];
  selectedValue: string;
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
    <fieldset>
      <legend>{label}</legend>

      <div className="radio-group">
        {options.map(option => (
          <div
            className={`input-clickable-container ${selectedValue === option.value && 'selected'}`}
            style={{
              backgroundImage: option.imageUrl && `url(${option.imageUrl})`,
              backgroundSize: option.imageUrl && "cover",
              backgroundPosition: option.imageUrl && "center",
            }}
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

            <label className="image-subtitle" htmlFor={option.value}>
              {option.label}
            </label>

          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default InputRadioGroup;

