interface Props {
  label: string;
  value: number;
  total: number;
}
function ProgressBar({ value, total, label }: Props) {
  const percentage = (value / total) * 100;

  return (
    <div
      className="progress-bar-container"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      <span className="progress-bar-label">
        {label}: {Math.round(percentage)}%
      </span>
    </div>
  );
}

export default ProgressBar;
