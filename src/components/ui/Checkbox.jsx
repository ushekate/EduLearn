export function Checkbox({ checked=false, onCheckedChange }) {
  return (
    <input
      type="checkbox"
      checked={Boolean(checked)}
      onChange={onCheckedChange}
      className="w-5 h-5"
    />
  );
}
